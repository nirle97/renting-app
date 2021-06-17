import mongoose, { Model } from "mongoose"
import { IClientPref } from "../../interfaces/interface";

const userPrefSchema = new mongoose.Schema<IClientPref>({
  userId: {
    type: String,
    require: true,
    unique: true
  }, 
  preferences: {
    type: Object,
  },
  
});


export const UserPrefModel = mongoose.model<IClientPref>("UserPrefModel", userPrefSchema);
