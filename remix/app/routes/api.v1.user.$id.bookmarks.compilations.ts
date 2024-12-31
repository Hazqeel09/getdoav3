import { LoaderFunctionArgs } from "@remix-run/node";
import { ERROR_RESPONSES, errorResponseType } from "~/constants/errors";
import { ListCompilationsResponse } from "~/types/compilations";
import { bookmarkService } from "~/services/bookmark.server";
import { listCompilationsParamsSchema } from "~/schemas/compilations";

export async function loader({
  request,
  params,
}: LoaderFunctionArgs): Promise<ListCompilationsResponse | errorResponseType> {
  if (!params.id) {
    return ERROR_RESPONSES.INVALID_ARGUMENT();
  }
  const user_id = params.id;

  const search = new URL(request.url).searchParams;
  const sp = Object.fromEntries(search);
  const limit = sp?.limit ? parseInt(sp.limit) : 10;
  const page = sp?.page ? parseInt(sp.page) : 10;

  const { success } = listCompilationsParamsSchema.safeParse({
    limit,
    page,
    user_id,
  });
  if (!success) {
    return ERROR_RESPONSES.INVALID_ARGUMENT();
  }

  return await bookmarkService.listCompilations({ limit, page, user_id });
}
