import User from "./user";
import { DayOfWeek } from "./day-of-week.enum";

export default class Event {
  id?: string;
  location: string;
  startTime: string;
  dayOfWeek: DayOfWeek;
  vacancy: number;
  available: boolean;
  createdBy?: User;
  updatedBy?: User;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(
    location: string,
    startTime: string,
    dayOfWeek: DayOfWeek,
    vacancy: number,
    available: boolean,
    id?: string,
    createdBy?: User,
    updatedBy?: User,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this.id = id;
    this.location = location;
    this.startTime = startTime;
    this.dayOfWeek = dayOfWeek;
    this.vacancy = vacancy;
    this.available = available;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
    this.createdAt = createdAt ? new Date(createdAt) : undefined;
    this.updatedAt = updatedAt ? new Date(updatedAt) : undefined;
  }
}
