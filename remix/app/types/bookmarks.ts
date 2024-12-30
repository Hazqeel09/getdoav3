import { z } from "zod";
import { addBookmarkRequestSchema, removeBookmarkRequestSchema } from "~/schemas/bookmarks";
import { DoaResponse } from "./doas";
import { CompilationResponse } from "./compilations";
import { listDoasParamsSchema } from "~/schemas/doas";
import { listCompilationsParamsSchema } from "~/schemas/compilations";

export type ListBookmarkedDoasParams = z.infer<typeof listDoasParamsSchema> & { user_id: string };
export type ListBookmarkedCompilationsParams = z.infer<typeof listCompilationsParamsSchema> & { user_id: string };
export type AddBookmarkRequest = z.infer<typeof addBookmarkRequestSchema>;
export type AddBookmarkResponse = DoaResponse | CompilationResponse;
export type RemoveBookmarkRequest = z.infer<typeof removeBookmarkRequestSchema>;
export type RemoveBookmarkResponse = { id: number };
