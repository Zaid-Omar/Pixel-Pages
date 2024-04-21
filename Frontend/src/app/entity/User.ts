import {UserRole} from "./UserRole";


export class User  {
  private id: number;
  private vorname: string;
  private nachname: string;
  private benutzername: string;
  private email: string;
  private passwort: string;
  private roles: UserRole[];

  constructor(
    id: number,
    vorname: string,
    nachname: string,
    benutzername: string,
    email: string,
    passwort: string,
    roles: UserRole[]
  ) {
    this.id = id;
    this.vorname = vorname;
    this.nachname = nachname;
    this.benutzername = benutzername;
    this.email = email;
    this.passwort = passwort;
    this.roles = roles;
  }

  // Implementierung der UserDetails-Methoden hier (falls erforderlich)
}
