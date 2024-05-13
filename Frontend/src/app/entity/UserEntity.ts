export class User  {
   id: any;
   vorname: any;
   nachname: any;
   benutzername: any;
   email: any;
   passwort: any;
   roles: any

  constructor(
    id: any,
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
