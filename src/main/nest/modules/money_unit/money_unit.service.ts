import { Injectable } from "@nestjs/common";
import { CreateMoneyUnitDto } from "./dto/create-money_unit.dto";
import { UpdateMoneyUnitDto } from "./dto/update-money_unit.dto";
import { PrismaService } from "@main/nest/shared/services/prisma.service";

@Injectable()
export class MoneyUnitService {
  constructor(private prismaService: PrismaService) {}
  create(createMoneyUnitDto: CreateMoneyUnitDto) {
    return "This action adds a new moneyUnit";
  }

  findAll() {
    return this.prismaService.moneyUnit.findMany({});
  }

  findOne(id: number) {
    return `This action returns a #${id} moneyUnit`;
  }

  update(id: number, updateMoneyUnitDto: UpdateMoneyUnitDto) {
    return `This action updates a #${id} moneyUnit`;
  }

  remove(id: number) {
    return `This action removes a #${id} moneyUnit`;
  }
}
