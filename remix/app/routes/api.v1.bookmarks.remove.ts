import { parseWithZod } from "@conform-to/zod";
import { ActionFunctionArgs } from "@remix-run/node";
import { ERROR_RESPONSES, errorResponseType } from "~/constants/errors";
import { removeBookmarkRequestSchema } from "~/schemas/bookmarks";
import { authService } from "~/services/auth.server";
import { bookmarkService } from "~/services/bookmark.server";
import { DeleteDoaResponse, UpdateDoaResponse } from "~/types/doas";

export async function loader() {
  return Response.json({ message: "Unimplemented" }, { status: 501 });
}

export async function action({
  request,
}: ActionFunctionArgs): Promise<
  UpdateDoaResponse | DeleteDoaResponse | errorResponseType
> {
  if (request.method !== "POST") {
    return Response.json({ message: "Unimplemented" }, { status: 501 });
  }

  const user = await authService.getUser(request);
  if (!user) {
    return ERROR_RESPONSES.UNAUTHORIZED();
  }

  const formData = await request.formData();
  formData.append("user_id", user.id);
  const submission = parseWithZod(formData, {
    schema: removeBookmarkRequestSchema,
  });
  if (submission.status !== "success") {
    return ERROR_RESPONSES.INVALID_ARGUMENT();
  }

  return await bookmarkService.remove({
    id: submission.value.id,
    user_id: user.id,
  });
}
