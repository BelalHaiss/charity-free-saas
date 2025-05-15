import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";
import type {
  CastDateFieldsToIsoDate,
  CastQueryFieldsToStrings,
  Locale,
} from "@shared/types/util.types";
import type {
  NewTransaction,
  TransactionDTO,
  TransactionQueryByType,
} from "@shared/types/transaction/transaction.dto";
import { Language, Timezone } from "@main/nest/decorator/headers.decorator";
import { ZodValidationService } from "../utils/zod-validation.service";
import { newExpenseServerSchema } from "@render/modules/transaction/util/transaction.schema";

@Controller("transaction")
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private zodValidationService: ZodValidationService,
  ) {}
  @Post()
  create(
    @Body() newTransaction: CastDateFieldsToIsoDate<NewTransaction>,
    @Language() locale: Locale,
  ) {
    const parsedValue = this.zodValidationService.validate(
      newTransaction,
      newExpenseServerSchema,
      locale,
    );
    return this.transactionService.create(parsedValue);
  }

  @Get("expenses/name/:branch_id")
  getExpensesName(@Param("branch_id") branch_id: string) {
    return this.transactionService.getExpensesName(+branch_id);
  }

  @Get()
  findTransactionByType(
    @Query() query: CastQueryFieldsToStrings<TransactionQueryByType>,
    @Timezone() timeZone: string,
  ): Promise<TransactionDTO[]> {
    return this.transactionService.findByType(query, timeZone);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.transactionService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionService.update(+id, updateTransactionDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.transactionService.remove(+id);
  }
}
