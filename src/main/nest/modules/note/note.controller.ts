import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { NoteService } from "./note.service";
import type {
  CreateNotePayload,
  UpdateNotePayload,
} from "@shared/types/note/note.dto";
import { Timezone, User } from "@main/nest/decorator/headers.decorator";
import type { UserInRequestHeader } from "@main/nest/types/auth.types";

@Controller("note")
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  create(
    @Body() createNoteDto: CreateNotePayload,
    @User() user: UserInRequestHeader,
  ) {
    return this.noteService.create(createNoteDto, user);
  }

  @Get("private")
  getUserNotes(@User() user: UserInRequestHeader) {
    return this.noteService.getUserNotes(user.id);
  }

  @Get("public")
  getDayNotes(@User() user: UserInRequestHeader) {
    return this.noteService.getPublicNotes(user.branches);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateNoteDto: UpdateNotePayload) {
    return this.noteService.update(+id, updateNoteDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.noteService.remove(+id);
  }
}
