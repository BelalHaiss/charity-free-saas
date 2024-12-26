import { PublicNote } from "@shared/types/note/note.dto";

export type NoteItemType = Omit<PublicNote, "username"> & { username?: string };
