import { Note } from "@prisma/client";

export type CreateNotePayload = Pick<Note, "content"> & { branch_id?: number };
export type UpdateNotePayload = Pick<Note, "content"> & { branch_id?: number };

export type PublicNote = Note & { username: string };

export type PrivateNote = Note;
