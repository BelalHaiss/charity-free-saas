import { Injectable } from "@nestjs/common";
import { CreateBenefitDto } from "./dto/create-benefit.dto";
import { UpdateBenefitDto } from "./dto/update-benefit.dto";
import { CreateNewItem } from "@shared/types/item/item.dto";
import { PrismaService } from "@main/nest/shared/services/prisma.service";

@Injectable()
export class BenefitService {
  constructor(private prismaService: PrismaService) {}
  create(newItem: CreateNewItem) {
    return this.prismaService.benefit.create({
      data: {
        type: "ITEM",
        Item: {
          create: newItem,
        },
      },
    });
  }

  findAll() {
    return `This action returns all benefit`;
  }

  findOne(id: number) {
    return `This action returns a #${id} benefit`;
  }

  update(id: number, updateBenefitDto: UpdateBenefitDto) {
    return `This action updates a #${id} benefit`;
  }

  remove(id: number) {
    return `This action removes a #${id} benefit`;
  }
}
