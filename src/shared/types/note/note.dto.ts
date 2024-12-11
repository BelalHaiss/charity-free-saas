import { Prisma } from "@prisma/client";
import { DateQueryString } from "../util.types";

export type QueryNoteByDate = {
  date: DateQueryString;
};

export type CreateNote = Prisma.NoteUncheckedCreateInput;
export type UpdateNotePayload = Pick<
  CreateNote,
  "title" | "branch_id" | "created_at"
>;
