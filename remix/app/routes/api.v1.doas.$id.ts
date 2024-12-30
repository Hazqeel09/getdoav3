import { parseWithZod } from "@conform-to/zod";
import { ActionFunctionArgs } from "@remix-run/node";
import { ERROR_RESPONSES, errorResponseType } from "~/constants/errors";
import { deleteDoaParamsSchema, updateDoaRequestSchema } from "~/schemas/doas";
import { authService } from "~/services/auth.server";
import { doaService } from "~/services/doa.server";
import { DeleteDoaResponse, UpdateDoaResponse } from "~/types/doas";

export async function loader() {
  return Response.json({ message: "Unimplemented" }, { status: 501 });
}

export async function action({ request, params }: ActionFunctionArgs): Promise<UpdateDoaResponse | DeleteDoaResponse | errorResponseType> {
  if (request.method !== 'PATCH' && request.method !== 'DELETE') {
    return Response.json({ message: "Unimplemented" }, { status: 501 });
  }

  const user = await authService.getUser(request);
  if (!user) {
    return ERROR_RESPONSES.UNAUTHORIZED;
  }

  if (!params?.id) {
    return ERROR_RESPONSES.INVALID_ARGUMENT;
  }

  if (request.method === 'PATCH') {
    const formData = await request.formData();
    formData.append('id', params.id)
    const submission = parseWithZod(formData, { schema: updateDoaRequestSchema });
    if (submission.status !== 'success') {
      return ERROR_RESPONSES.INVALID_ARGUMENT;
    }

    const doa = await doaService.get({ id: submission.value.id });
    if (!doa) {
      return ERROR_RESPONSES.NOT_FOUND;
    }

    return await doaService.update({ ...submission.value });
  }

  if (request.method === 'DELETE') {
    const formData = new FormData();
    formData.append('id', params.id)
    const submission = parseWithZod(formData, { schema: deleteDoaParamsSchema });
    if (submission.status !== 'success') {
      return ERROR_RESPONSES.INVALID_ARGUMENT;
    }

    await doaService.delete({ id: submission.value.id });

    return { id: submission.value.id };
  }

  return Response.json({ message: "Unimplemented" }, { status: 501 });
}
