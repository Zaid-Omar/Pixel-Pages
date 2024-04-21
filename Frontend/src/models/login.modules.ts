export class UserDto {
  id: number;
  vorname: string;
  nachname: string;
  role: string;
  email: string;
  username: string;
  password: string;

   constructor (id: number, vorname: string, nachname: string,role: string, email: string, username: string, password: string, profilePic: string){
     this.id = id;
     this.vorname = vorname;
     this.nachname = nachname;
     this.role = role;
     this.email = email;
     this.username = username;
     this.password = password;
   }
 }
