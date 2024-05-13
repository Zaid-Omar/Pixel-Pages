import {UserRole} from "./UserRole";
import {User} from "./UserEntity";
import { NumberValueAccessor } from "@angular/forms";

export class ReqRes {
  id: number
  statusCode: number;
  error: string;
  message: string;
  token: string;
  refreshToken: string;
  expirationTime: string;
  vorname: string;
  nachname: string;
  benutzername: string;
  email: string;
  passwort: string;
  roles: UserRole.USER;
  user: string;

  constructor(
    id: number,
    statusCode: number,
    error: string,
    message: string,
    token: string,
    refreshToken: string,
    expirationTime: string,
    vorname: string,
    nachname: string,
    benutzername: string,
    email: string,
    passwort: string,
    roles: UserRole.USER,
    user: string
  ) {
    this.id = id
    this.statusCode = statusCode;
    this.error = error;
    this.message = message;
    this.token = token;
    this.refreshToken = refreshToken;
    this.expirationTime = expirationTime;
    this.vorname = vorname;
    this.nachname = nachname;
    this.benutzername = benutzername;
    this.email = email;
    this.passwort = passwort;
    this.roles = roles;
    this.user = user;
  }
}
