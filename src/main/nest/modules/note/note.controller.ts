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
import { CreateNoteDto } from "./dto/create-note.dto";
import { UpdateNoteDto } from "./dto/update-note.dto";
import type { CastQueryFieldsToStrings } from "@shared/types/util.types";
import type { QueryNoteByDate } from "@shared/types/note/note.dto";
import { BranchID, Timezone } from "@main/nest/decorator/headers.decorator";

@Controller("note")
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.noteService.create(createNoteDto);
  }

  @Get()
  getDayNotes(
    @Query() query: CastQueryFieldsToStrings<QueryNoteByDate>,
    @Timezone() timeZone: string,
    @BranchID() branchId: number,
  ) {
    return this.noteService.getDayNotes(query, timeZone, branchId);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.noteService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.noteService.update(+id, updateNoteDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.noteService.remove(+id);
  }
}
