import type { Note } from "@prisma/client";
import { fetcher } from "@render/utils/api.util";
import type { QueryNoteByDate } from "@shared/types/note/note.dto";
import qs from "qs";

class NoteRepository {
  getDayNotes(query: QueryNoteByDate): Promise<Note[]> {
    const queryString = qs.stringify(query);

    return fetcher<Note[]>({ url: `/note/?${queryString}` });
  }
  createNote(notePayload: Note) {
    return fetcher({
      url: "/note",
      config: {
        method: "POST",
        data: notePayload,
      },
    });
  }

  editNote(noteId: string, notePayload: Partial<Note>) {
    return fetcher({
      url: "/note",
      config: {
        method: "PATCH",
        data: notePayload,
      },
    });
  }
}

export const noteRepository = new NoteRepository();
