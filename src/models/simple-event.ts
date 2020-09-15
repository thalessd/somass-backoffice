import SimpleVacancy from "./simple-vacancy";

export default class SimpleEvent {
  id: string;
  location: string;
  date: Date;
  totalVacancies: number;
  occupiedVacancies: number;
  simpleVacancy: SimpleVacancy[];

  constructor(
    id: string,
    location: string,
    date: Date,
    totalVacancies: number,
    occupiedVacancies: number,
    simpleVacancy: SimpleVacancy[]
  ) {
    this.id = id;
    this.location = location;
    this.date = new Date(date);
    this.totalVacancies = totalVacancies;
    this.occupiedVacancies = occupiedVacancies;
    this.simpleVacancy = simpleVacancy;
  }
}
