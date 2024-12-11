import { Injectable } from "@nestjs/common";
import type {
  CreateNote,
  QueryNoteByDate,
  UpdateNotePayload,
} from "@shared/types/note/note.dto";
import type { CastQueryFieldsToStrings } from "@shared/types/util.types";
import { PrismaService } from "@main/nest/shared/services/prisma.service";
import { UtilsService } from "../utils/utils.service";

@Injectable()
export class NoteService {
  constructor(
    private prismaService: PrismaService,
    private utilService: UtilsService,
  ) {}

  create(createNoteDto: CreateNote) {
    return this.prismaService.note.create({ data: createNoteDto });
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

  update(id: number, updateNoteDto: UpdateNotePayload) {
    return `This action updates a #${id} note`;
  }

  remove(id: number) {
    return `This action removes a #${id} note`;
  }
}
