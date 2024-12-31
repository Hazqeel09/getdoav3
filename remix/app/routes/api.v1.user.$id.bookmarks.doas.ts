import { LoaderFunctionArgs } from "@remix-run/node";
import { ERROR_RESPONSES, errorResponseType } from "~/constants/errors";
import { bookmarkService } from "~/services/bookmark.server";
import { listDoasParamsSchema } from "~/schemas/doas";
import { ListDoasResponse } from "~/types/doas";

export async function loader({
  request,
  params,
}: LoaderFunctionArgs): Promise<ListDoasResponse | errorResponseType> {
  const search = new URL(request.url).searchParams;
  const sp = Object.fromEntries(search);
  if (!params.id) {
    return ERROR_RESPONSES.INVALID_ARGUMENT();
  }
  const user_id = params.id;
  const limit = sp?.limit ? parseInt(sp.limit) : 10;
  const page = sp?.page ? parseInt(sp.page) : 10;

  const { success } = listDoasParamsSchema.safeParse({ limit, page, user_id });
  if (!success) {
    return ERROR_RESPONSES.INVALID_ARGUMENT();
  }

  return await bookmarkService.listDoas({ limit, page, user_id });
}
