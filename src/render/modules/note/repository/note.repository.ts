import { Note } from "@prisma/client";
import { fetcher } from "@render/utils/api.util";
import type { QueryNoteByDate } from "@shared/types/note/note.dto";
import qs from "qs";

class NoteRepository {
  getDayNotes(query: QueryNoteByDate): Promise<Note[]> {
    const queryString = qs.stringify(query);

    return fetcher<Note[]>({ url: `note/?${queryString}` });
  }
}

export const noteRepository = new NoteRepository();
