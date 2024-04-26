export class FavoriteEntity {
  id: number;
  ab_datum: any;
  aus_datum: any;
  media_id: any;
  user_id: any;



 constructor(id: number, ab_datum: Date, aus_datum: Date, media_id: number, user_id: number ) {
   this.id = id,
   this.ab_datum = ab_datum,
   this.aus_datum = aus_datum,
   this.media_id = media_id,
   this.user_id = user_id
 }



}
