import {UserRole} from "./UserRole";
import {User} from "./User";

export class ReqRes {
  private statusCode: number;
  private error: string;
  private message: string;
  token: string;
  private refreshToken: string;
  private expirationTime: string;
  private vorname: string;
  private nachname: string;
  private benutzername: string;
  private email: string;
  private passwort: string;
  private roles: UserRole.USER;
  private user: string;

  constructor(
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
