export class Media {
  id: any;
  titel: string;
  autor: string;
  typ: string;
  status: boolean;
  bild: string;
  isbn: string;
  showConfirmation: boolean;  // Hinzufügen der showConfirmation Eigenschaft

  constructor(
    id: any,
    titel: string,
    autor: string,
    typ: string,
    status: boolean,
    bild: string,
    isbn: string,
    showConfirmation: boolean = false  // Standardwert als false
  ) {
    this.id = id;
    this.titel = titel;
    this.autor = autor;
    this.typ = typ;
    this.status = status;
    this.bild = bild;
    this.isbn = isbn;
    this.showConfirmation = showConfirmation;
  }
}
