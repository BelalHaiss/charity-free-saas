import { Injectable } from "@nestjs/common";
import { CreateNoteDto } from "./dto/create-note.dto";
import { UpdateNoteDto } from "./dto/update-note.dto";
import type { QueryNoteByDate } from "@shared/types/note/note.dto";
import type { CastQueryFieldsToStrings } from "@shared/types/util.types";
import { PrismaService } from "@main/nest/shared/services/prisma.service";
import { UtilsService } from "../utils/utils.service";

@Injectable()
export class NoteService {
  constructor(
    private prismaService: PrismaService,
    private utilService: UtilsService,
  ) {}

  create(createNoteDto: CreateNoteDto) {
    return "This action adds a new note";
  }

  getDayNotes(
    query: CastQueryFieldsToStrings<QueryNoteByDate>,
    timeZone: string,
    branchId: number,
  ) {
    return this.prismaService.note.findMany({
      where: {
        branch_id: branchId,
        created_at: this.utilService.getFullDayDateFilter(query.date, timeZone),
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} note`;
  }

  update(id: number, updateNoteDto: UpdateNoteDto) {
    return `This action updates a #${id} note`;
  }

  remove(id: number) {
    return `This action removes a #${id} note`;
  }
}
