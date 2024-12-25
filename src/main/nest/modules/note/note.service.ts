import { Injectable } from "@nestjs/common";
import type {
  CreateNotePayload,
  UpdateNotePayload,
  QueryNoteByDate,
} from "@shared/types/note/note.dto";
import type { CastQueryFieldsToStrings } from "@shared/types/util.types";
import { PrismaService } from "@main/nest/shared/services/prisma.service";
import { UtilsService } from "../utils/utils.service";
import { JWT_PAYLOAD } from "@main/nest/types/auth.types";

@Injectable()
export class NoteService {
  constructor(
    private prismaService: PrismaService,
    private utilService: UtilsService,
  ) {}

  create(createNoteDto: CreateNotePayload, user: JWT_PAYLOAD) {
    return this.prismaService.note.create({
      data: { ...createNoteDto, user_id: user.sub },
    });
  }

  getUserNotes(userId: number) {
    return this.prismaService.note.findMany({ where: { user_id: userId } });
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
      orderBy: { created_at: "desc" },
    });
  }

  update(id: number, updateNoteDto: UpdateNotePayload) {
    return this.prismaService.note.update({
      where: { id },
      data: updateNoteDto,
    });
  }

  remove(id: number) {
    return this.prismaService.note.delete({ where: { id } });
  }
}
