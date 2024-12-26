import { Injectable } from "@nestjs/common";
import type {
  CreateNotePayload,
  PublicNote,
  UpdateNotePayload,
} from "@shared/types/note/note.dto";
import { PrismaService } from "@main/nest/shared/services/prisma.service";
import { UtilsService } from "../utils/utils.service";
import { UserInRequestHeader } from "@main/nest/types/auth.types";
import { removeFields } from "@shared/services/object.util";

@Injectable()
export class NoteService {
  constructor(
    private prismaService: PrismaService,
    private utilService: UtilsService,
  ) {}

  create(createNoteDto: CreateNotePayload, user: UserInRequestHeader) {
    return this.prismaService.note.create({
      data: {
        ...createNoteDto,
        user_id: user.id,
      },
    });
  }

  getUserNotes(userId: number) {
    return this.prismaService.note.findMany({ where: { user_id: userId } });
  }

  async getPublicNotes(userBranches: number[]): Promise<PublicNote[]> {
    const notes = await this.prismaService.note.findMany({
      where: {
        branch_id: {
          in: userBranches,
        },
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
      orderBy: { created_at: "desc" },
    });

    const publicNotes: PublicNote[] = notes.map((note) => ({
      ...removeFields(note, ["user"]),
      username: note.user.username,
    }));
    return publicNotes;
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
