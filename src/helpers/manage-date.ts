import { addMinutes, subMinutes, format, toDate, formatISO } from "date-fns";
import { DayOfWeek } from "../models/day-of-week.enum";
import { DAYS_OF_WEEK } from "../constants/default";

export default class ManageDate {
  static stringDateTime(date: Date): string {
    return format(new Date(date), "dd/MM/yyyy HH:mm:ss");
  }

  static stringDate(date: Date): string {
    return format(new Date(date), "dd/MM/yyyy");
  }

  static localToGlobal(date: Date): Date {
    return toDate(addMinutes(date, date.getTimezoneOffset()));
  }

  static globalToLocal(date: Date): Date {
    return toDate(subMinutes(date, date.getTimezoneOffset()));
  }

  static toISODate(date: Date): Date {
    return new Date(formatISO(date));
  }

  static dayOfWeekToString(dayOfWeek: DayOfWeek) {
    return DAYS_OF_WEEK[dayOfWeek];
  }
}
