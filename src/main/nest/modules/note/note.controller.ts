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
import type { CastQueryFieldsToStrings } from "@shared/types/util.types";
import type {
  CreateNotePayload,
  UpdateNotePayload,
  QueryNoteByDate,
} from "@shared/types/note/note.dto";
import {
  BranchID,
  Timezone,
  User,
} from "@main/nest/decorator/headers.decorator";
import type { JWT_PAYLOAD } from "@main/nest/types/auth.types";

@Controller("note")
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  create(@Body() createNoteDto: CreateNotePayload, @User() user: JWT_PAYLOAD) {
    return this.noteService.create(createNoteDto, user);
  }

  @Get()
  getUserNotes(@User() user: JWT_PAYLOAD) {
    return this.noteService.getUserNotes(user.sub);
  }

  @Get("day-notes")
  getDayNotes(
    @Query() query: CastQueryFieldsToStrings<QueryNoteByDate>,
    @Timezone() timeZone: string,
    @BranchID() branchId: number,
  ) {
    return this.noteService.getDayNotes(query, timeZone, branchId);
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
