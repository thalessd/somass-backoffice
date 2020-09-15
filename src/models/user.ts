export default class User {
  id?: string;
  name: string;
  email: string;
  password?: string;
  roles: string[];
  createdAt?: Date;
  updatedAt?: Date;

  constructor(
    name: string,
    email: string,
    roles: string[],
    password?: string,
    createdAt?: string,
    updatedAt?: string,
    id?: string
  ) {
    this.name = name;
    this.email = email;
    this.roles = roles;
    this.id = id;
    this.password = password;
    this.createdAt = createdAt ? new Date(createdAt) : undefined;
    this.updatedAt = updatedAt ? new Date(updatedAt) : undefined;
  }
}
