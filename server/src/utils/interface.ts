export interface IUser extends Document  {
    name: String;
    email: String;
    password?: String;
    phoneNumber: String;
    age: Number;
    likedApts: {}[];
    refreshToken: String;
  }