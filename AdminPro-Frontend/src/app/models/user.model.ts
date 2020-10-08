export class User {
  constructor(
    private name: string,
    private lastName: string,
    private email: string,
    private password?: string,
    private gogole?: boolean,
    private role?: string,
    private img?: string,
    private uid?: string
  ) {}
}
