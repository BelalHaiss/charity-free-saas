import { Injectable } from "@nestjs/common";
import { CreateNoteDto } from "./dto/create-note.dto";
import { UpdateNoteDto } from "./dto/update-note.dto";
import type { QueryNoteByDate } from "@shared/types/note/note.dto";
import type { CastQueryFieldsToStrings } from "@shared/types/util.types";
import { PrismaService } from "@main/nest/shared/services/prisma.service";
import { endOfTheDay, startOfTheDay } from "@main/nest/shared/utils/date.util";

@Injectable()
export class NoteService {
  constructor(private prismaService: PrismaService) {}
  create(createNoteDto: CreateNoteDto) {
    return "This action adds a new note";
  }

  getDayNotes(query: CastQueryFieldsToStrings<QueryNoteByDate>) {
    return this.prismaService.note.findMany({
      where: {
        branch_id: +query.branchId,
        created_at: {
          lte: endOfTheDay(query.date),
          gte: startOfTheDay(query.date),
        },
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
