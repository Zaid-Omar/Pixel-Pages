import { Media } from "./MediaEntity";
import { User } from "./UserEntity";

export class BuchungsAnzeige {
  forEach(arg0: (item: any) => void) {
    throw new Error('Method not implemented.');
  }
  id: any;
  ab_datum: any;
  aus_datum: any;
  media: any;
  user:  any;
  gebuehren: any;



  constructor(id: any, ab_datum: Date, aus_datum: Date, media: any, user: any, gebuehren:any ) {
    this.id = id,
      this.ab_datum = ab_datum,
      this.aus_datum = aus_datum,
      this.media = media,
      this.user = user,
      this.gebuehren = gebuehren
  }
}
