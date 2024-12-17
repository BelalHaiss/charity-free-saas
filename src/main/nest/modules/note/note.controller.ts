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
  EditNotePayload,
  QueryNoteByDate,
} from "@shared/types/note/note.dto";
import { BranchID, Timezone } from "@main/nest/decorator/headers.decorator";

@Controller("note")
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  // @Post()
  // create(@Body() createNoteDto: CreateNotePayload) {
  //   return this.noteService.create(createNoteDto);
  // }

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

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateNoteDto: EditNotePayload) {
  //   return this.noteService.update(+id, updateNoteDto);
  // }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.noteService.remove(+id);
  }
}
