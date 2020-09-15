export default class SimpleClient {
  id: string;
  nameOfMain: string;
  escortNames: string[];

  constructor(id: string, nameOfMain: string, escortNames: string[]) {
    this.id = id;
    this.nameOfMain = nameOfMain;
    this.escortNames = escortNames;
  }
}
