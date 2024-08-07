import { Injectable } from "@nestjs/common";
import { CreateUnitDto } from "./dto/create-unit.dto";
import { UpdateUnitDto } from "./dto/update-unit.dto";
import { PrismaService } from "@main/nest/shared/services/prisma.service";

@Injectable()
export class UnitService {
  constructor(private prismaService: PrismaService) {}
  create(createUnitDto: CreateUnitDto) {
    return "This action adds a new unit";
  }

  findAll() {
    return this.prismaService.unit.findMany();
  }

  findAllMoneyUnits() {
    return this.prismaService.moneyUnit.findMany({});
  }

  update(id: number, updateUnitDto: UpdateUnitDto) {
    return `This action updates a #${id} unit`;
  }

  remove(id: number) {
    return `This action removes a #${id} unit`;
  }
}
