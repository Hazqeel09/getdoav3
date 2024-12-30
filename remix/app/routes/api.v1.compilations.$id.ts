import { parseWithZod } from "@conform-to/zod";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { ERROR_RESPONSES, errorResponseType } from "~/constants/errors";
import { deleteCompilationRequestSchema, retrieveCompilationRequestSchema, updateCompilationRequestSchema } from "~/schemas/compilations";
import { authService } from "~/services/auth.server";
import { compilationService } from "~/services/compilation.server";
import { DeleteCompilationResponse, UpdateCompilationResponse } from "~/types/compilations";

export async function loader({params}: LoaderFunctionArgs) {
  if (!params?.id) {
    return ERROR_RESPONSES.INVALID_ARGUMENT;
  }

  const { data, success } = retrieveCompilationRequestSchema.safeParse({ id: parseInt(params.id) });
  if (!success) {
    return ERROR_RESPONSES.INVALID_ARGUMENT;
  }

  return await compilationService.get({ id: data.id });
}

export async function action({ request, params }: ActionFunctionArgs): Promise<UpdateCompilationResponse | DeleteCompilationResponse | errorResponseType> {
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
    const submission = parseWithZod(formData, { schema: updateCompilationRequestSchema });
    if (submission.status !== 'success') {
      return ERROR_RESPONSES.INVALID_ARGUMENT;
    }

    const compilation = await compilationService.get({ id: submission.value.id });
    if (!compilation) {
      return ERROR_RESPONSES.NOT_FOUND;
    }

    return await compilationService.update({ ...submission.value });
  }

  if (request.method === 'DELETE') {
    const formData = new FormData();
    formData.append('id', params.id)
    const submission = parseWithZod(formData, { schema: deleteCompilationRequestSchema });
    if (submission.status !== 'success') {
      return ERROR_RESPONSES.INVALID_ARGUMENT;
    }

    await compilationService.delete({ id: submission.value.id });

    return { id: submission.value.id };
  }

  return Response.json({ message: "Unimplemented" }, { status: 501 });
}
