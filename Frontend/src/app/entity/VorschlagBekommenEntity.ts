export class VorschlagBekommen {
  id: any;
  vorschlag: any;
  typ: any;
  user: any;
  constructor(
    id: any,
    vorschlag: string,
    typ: string,
    user: any
  ) {
    this.id = id;
    this.vorschlag = vorschlag;
    this.typ = typ;
    this.user = user;
  }
}
