import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import { BeneficiaryService } from './beneficiary.service';
@Controller('beneficiary')
export class BeneficiaryController {
  constructor(private readonly beneficiaryService: BeneficiaryService) {}

  @Post()
  create(@Body() createBeneficiaryDto: {}) {
    return this.beneficiaryService.create(createBeneficiaryDto);
  }

  @Get()
  findAll() {
    return this.beneficiaryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.beneficiaryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBeneficiaryDto: {}) {
    return this.beneficiaryService.update(+id, updateBeneficiaryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.beneficiaryService.remove(+id);
  }
}
