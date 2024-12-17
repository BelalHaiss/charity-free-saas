import { Note } from "@prisma/client";

export type CreateNotePayload = Pick<Note, "desc" | "title">;
export type EditNotePayload = Pick<Note, "desc" | "title">;
