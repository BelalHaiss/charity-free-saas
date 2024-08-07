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
import type { CastQueryFieldsToStrings } from "@shared/types/util.types";
import type {
  NewTransaction,
  TransactionQueryByType,
} from "@shared/types/transaction/transaction.dto";

@Controller("transaction")
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}
  @Post()
  create(@Body() newTransaction: NewTransaction) {
    return this.transactionService.create(newTransaction);
  }

  @Get("expenses/name/:branch_id")
  getExpensesName(@Param("branch_id") branch_id: string) {
    return this.transactionService.getExpensesName(+branch_id);
  }

  @Get()
  findTransactionByType(
    @Query() query: CastQueryFieldsToStrings<TransactionQueryByType>,
  ) {
    return this.transactionService.findByType(query);
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
