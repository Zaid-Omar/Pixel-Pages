import {UserRole} from "./UserRole";


export class User  {
   id: number;
   vorname: string;
   nachname: string;
   benutzername: string;
   email: string;
   passwort: string;
   roles: any
  constructor(
    id: number,
    vorname: string,
    nachname: string,
    benutzername: string,
    email: string,
    passwort: string,
    roles: any
  ) {
    this.id = id;
    this.vorname = vorname;
    this.nachname = nachname;
    this.benutzername = benutzername;
    this.email = email;
    this.passwort = passwort;
    this.roles = roles;
  }

}
