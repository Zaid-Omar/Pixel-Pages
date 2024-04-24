export class Media {
  id: number;
  titel: string;
  autor: string;
  typ: string;
  status: boolean;
  bild: string;


  constructor(id: number, titel: string, autor: string, typ: string, status: boolean, bild: string) {
    this.id = id;
    this.titel = titel;
    this.autor = autor;
    this.typ = typ;
    this.status = status;
    this.bild = bild;
  }
}
