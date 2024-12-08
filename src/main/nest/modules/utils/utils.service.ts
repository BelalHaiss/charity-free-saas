import { Injectable } from "@nestjs/common";
import { DateService } from "./date.service";

@Injectable()
export class UtilsService {
  constructor(private readonly dateService: DateService) {}
  getFullDayDateFilter(date: string, timeZone: string) {
    return {
      lte: this.dateService.endOfTheDay(date, timeZone),
      gte: this.dateService.startOfTheDay(date, timeZone),
    };
  }

  getEnvironment(): string {
    return process.env.NODE_ENV || "development";
  }
}
