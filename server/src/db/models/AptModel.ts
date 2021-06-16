import mongoose from "mongoose"
import {IApt} from "../../interfaces/interface"

const aptSchema = new mongoose.Schema<IApt>({
  ownerId: {
    type: String,
    require: true
  },
  likedBy: {
    type: Array,
  },
  city: {
    type: String,
    require: true
  },
  pricePerMonth: {
    type: Number,
    require: true
  }
});
export const AptModel = mongoose.model<IApt>("AptModel", aptSchema);

