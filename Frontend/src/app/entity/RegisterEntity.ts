export class RegisterEntity {
  private email: any;
  private passwort: any;
  private vorname: any;
  private nachname: any;
  private benutzername: any;

  constructor(email: string, passwort: string, vorname: string, nachname: string, benutzername: string) {
    this.email = email;
    this.passwort = passwort;
    this.vorname = vorname;
    this.nachname = nachname;
    this.benutzername = benutzername;
  }

}
