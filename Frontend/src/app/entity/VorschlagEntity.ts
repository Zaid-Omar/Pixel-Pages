export class Vorschlag {
  id:any;
  vorschlag: any;
  typ: any;
  user: number;



  constructor(
    id: any,
    vorschlag: string,
    typ: string,
    user: number
  ) {
    this.id = id;
    this.vorschlag = vorschlag;
    this.typ = typ;
    this.user = user;
  }
}
