import { Injectable } from "@nestjs/common";
import { DateTime } from "luxon";

@Injectable()
export class DateService {
  startOfTheDay(date: string | Date, timeZone: string): Date {
    return DateTime.fromJSDate(new Date(date), { zone: timeZone })
      .startOf("day")
      .toJSDate();
  }

  endOfTheDay(date: string | Date, timeZone: string): Date {
    return DateTime.fromJSDate(new Date(date), { zone: timeZone })
      .endOf("day")
      .toJSDate();
  }
}
