import type { Note } from "@prisma/client";
import { fetcher } from "@render/utils/api.util";
import type {
  CreateNotePayload,
  PrivateNote,
  PublicNote,
  UpdateNotePayload,
} from "@shared/types/note/note.dto";
import { ISO_8601_DateString } from "@shared/types/util.types";
import qs from "qs";

class NoteRepository {
  getPublicNotes(): Promise<PublicNote[]> {
    return fetcher<PublicNote[]>({ url: `/note/public` });
  }

  getUserNotes() {
    return fetcher<PrivateNote[]>({ url: `/note/private` });
  }
  createNote(notePayload: CreateNotePayload) {
    return fetcher({
      url: "/note",
      config: {
        method: "POST",
        data: notePayload,
      },
    });
  }

  editNote(noteId: number, notePayload: UpdateNotePayload) {
    return fetcher({
      url: `/note${noteId}`,
      config: {
        method: "PATCH",
        data: notePayload,
      },
    });
  }

  deleteNote(noteId: number) {
    return fetcher({
      url: `/note/${noteId}`,
      config: {
        method: "DELETE",
      },
    });
  }
}

export const noteRepository = new NoteRepository();
