import { PrismaService } from '@main/nest/shared/services/prisma.service';
import { Injectable } from '@nestjs/common';
@Injectable()
export class BeneficiaryService {
  constructor(private prismaService: PrismaService) {}
  create(createBeneficiaryDto: {}) {
    return 'This action adds a new beneficiary';
  }

  findAll() {
    return `This action returns all beneficiary`;
  }

  findOne(id: number) {
    return `This action returns a #${id} beneficiary`;
  }

  update(id: number, updateBeneficiaryDto: {}) {
    return `This action updates a #${id} beneficiary`;
  }

  remove(id: number) {
    return `This action removes a #${id} beneficiary`;
  }
}
