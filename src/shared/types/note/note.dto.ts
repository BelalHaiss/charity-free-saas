import { Note } from "@prisma/client";
import { DateQueryString } from "../util.types";

export type QueryNoteByDate = {
  date: DateQueryString;
};

export type CreateNotePayload = Pick<Note, "content">;
export type UpdateNotePayload = Pick<Note, "content">;
