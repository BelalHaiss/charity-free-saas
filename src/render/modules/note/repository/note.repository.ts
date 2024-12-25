import type { Note } from "@prisma/client";
import { fetcher } from "@render/utils/api.util";
import type {
  QueryNoteByDate,
  UpdateNotePayload,
} from "@shared/types/note/note.dto";
import qs from "qs";

class NoteRepository {
  getDayNotes(query: QueryNoteByDate): Promise<Note[]> {
    const queryString = qs.stringify(query);

    return fetcher<Note[]>({ url: `/note/day-notes?${queryString}` });
  }

  getUserNotes() {
    return fetcher<Note[]>({ url: "/note" });
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

  editNote(noteId: string, notePayload: UpdateNotePayload) {
    return fetcher({
      url: `/note${noteId}`,
      config: {
        method: "PATCH",
        data: notePayload,
      },
    });
  }

  deleteNote(noteId) {
    return fetcher({
      url: `/note/${noteId}`,
      config: {
        method: "DELETE",
      },
    });
  }
}

export const noteRepository = new NoteRepository();
