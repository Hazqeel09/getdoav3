import { createCompilationRequestSchema, listCompilationsParamsSchema } from '~/schemas/compilations';
import { parseWithZod } from "@conform-to/zod";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { ERROR_RESPONSES, errorResponseType } from "~/constants/errors";
import { authService } from "~/services/auth.server";
import { compilationService } from "~/services/compilation.server";
import { CreateCompilationResponse, ListCompilationsResponse } from "~/types/compilations";

export async function loader({ request }: LoaderFunctionArgs): Promise<ListCompilationsResponse | errorResponseType> {
  const params = new URL(request.url).searchParams;
  const sp = Object.fromEntries(params);
  const limit = sp?.limit ? parseInt(sp.limit) : 10;
  const page = sp?.page ? parseInt(sp.page) : 10;

  const { success } = listCompilationsParamsSchema.safeParse({limit, page});
  if (!success) {
    return ERROR_RESPONSES.INVALID_ARGUMENT;
  }

  return await compilationService.list({ limit, page });
}

export async function action({ request }: ActionFunctionArgs): Promise<CreateCompilationResponse | errorResponseType> {
  const user = await authService.getUser(request);
  if (!user) {
    return ERROR_RESPONSES.UNAUTHORIZED;
  }

  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: createCompilationRequestSchema });
  if (submission.status !== 'success') {
    return ERROR_RESPONSES.INVALID_ARGUMENT;
  }

  return await compilationService.create({ ...submission.value, user_id: user.id });
}
