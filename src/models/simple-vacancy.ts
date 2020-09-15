import SimpleClient from "./simple-client";

export default class SimpleVacancy {
  id: string;
  dateWasSet: string;
  simpleClient: SimpleClient;
  createdAt?: Date;

  constructor(
    id: string,
    dateWasSet: string,
    simpleClient: SimpleClient,
    createdAt?: Date
  ) {
    this.id = id;
    this.dateWasSet = dateWasSet;
    this.simpleClient = simpleClient;
    this.createdAt = createdAt ? new Date(createdAt) : undefined;
  }
}
