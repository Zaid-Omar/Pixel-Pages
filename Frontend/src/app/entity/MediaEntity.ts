export class Media {
  id: any;
  titel: string;
  autor: string;
  typ: string;
  status: boolean;
  bild: string;
  isbn: string;


  constructor(id: number, titel: string, autor: string, typ: string, status: boolean, bild: string, isbn: string) {
    this.id = id;
    this.titel = titel;
    this.autor = autor;
    this.typ = typ;
    this.status = status;
    this.bild = bild;
    this.isbn = isbn;
  }
}
