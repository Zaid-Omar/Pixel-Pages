import { Media } from "./MediaEntity";
import { User } from "./User";

export class FavoriteEntity {
  id: any;
  ab_datum: any;
  aus_datum: any;
  media_id: Media;
  user_id:  User;



 constructor(id: number, ab_datum: Date, aus_datum: Date, media_id: Media, user_id: User ) {
   this.id = id,
   this.ab_datum = ab_datum,
   this.aus_datum = aus_datum,
   this.media_id = media_id,
   this.user_id = user_id
 }
}
