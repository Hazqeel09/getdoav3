import { createDoaRequestSchema, listDoasParamsSchema } from '~/schemas/doas';
import { parseWithZod } from "@conform-to/zod";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { ERROR_RESPONSES, errorResponseType } from "~/constants/errors";
import { authService } from "~/services/auth.server";
import { doaService } from "~/services/doa.server";
import { CreateDoaResponse, ListDoasResponse } from "~/types/doas";

export async function loader({ request }: LoaderFunctionArgs): Promise<ListDoasResponse | errorResponseType> {
  const params = new URL(request.url).searchParams;
  const sp = Object.fromEntries(params);
  const limit = sp?.limit ? parseInt(sp.limit) : 10;
  const page = sp?.page ? parseInt(sp.page) : 10;

  const { data, success } = listDoasParamsSchema.safeParse({...sp, limit, page});
  if (!success) {
    return ERROR_RESPONSES.INVALID_ARGUMENT;
  }

  return await doaService.list({ limit, page, categories: data.categories, sources: data.sources });
}

export async function action({ request }: ActionFunctionArgs): Promise<CreateDoaResponse | errorResponseType> {
  const user = await authService.getUser(request);
  if (!user) {
    return ERROR_RESPONSES.UNAUTHORIZED;
  }

  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: createDoaRequestSchema });
  if (submission.status !== 'success') {
    return ERROR_RESPONSES.INVALID_ARGUMENT;
  }

  return await doaService.create({ ...submission.value, user_id: user.id });
}
