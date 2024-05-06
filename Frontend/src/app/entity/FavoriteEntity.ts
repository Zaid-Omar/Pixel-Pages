import { Media } from "./MediaEntity";
import { User } from "./User";

export class FavoriteEntity {
  id: any;
  ab_datum: any;
  aus_datum: any;
  media: any;
  user:  any;



 constructor(id: number, ab_datum: Date, aus_datum: Date, media: any, user: any ) {
   this.id = id,
   this.ab_datum = ab_datum,
   this.aus_datum = aus_datum,
   this.media = media,
   this.user = user
 }
}
