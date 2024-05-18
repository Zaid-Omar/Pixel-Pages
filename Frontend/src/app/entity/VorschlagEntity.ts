export class Vorschlag {
  vorschlag: any;
  typ: any;
  user: any;
  constructor(
    vorschlag: string,
    typ: string,
    user: any
  ) {
    this.vorschlag = vorschlag;
    this.typ = typ;
    this.user = user;
  }
}
