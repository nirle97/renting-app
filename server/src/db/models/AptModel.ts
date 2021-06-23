import mongoose, { Model } from "mongoose";
import { IOwnerApt, IClientApt } from "../../interfaces/interface";

interface IAptModel extends Model<IOwnerApt> {
  updateLikeStatus(
    aptId: String,
    userId: String,
    status: String
  ): Promise<void>;
  findByUserFilters(aptData: IClientApt, userId: String): Promise<IOwnerApt[]>;
}

const aptSchema = new mongoose.Schema<IOwnerApt, IAptModel>({
  ownerId: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  area: {
    type: String,
    require: true
  },
  street: {
    type: String,
    require: true
  },
  ZipCode: {
    type: Number,
    require: true
  },
  pricePerMonth: {
    type: Number,
    require: true,
  },
  images: {
    type: Array,
    require: true
  },
  likedBy: {
    type: Array,
    unique: true,
  },
  disLikedBy: {
    type: Array,
    unique: true,
  },
  rentalType: {
    type: String,
    require: true
  },
  entryDate: {
    type: Date,
    require: true
  },
  checkOutDate: {
    type: Date,
    require: true
  },
  size: {
    type: Number,
    require: true
  },
  floor: {
    type: Number,
    require: true
  },
  rooms: {
    type: Number,
    require: true
  },
  elevator: {
    type: Boolean,
    require: true
  },
  parking: {
    type: Number,
    require: true
  },
  porch: {
    type: Number,
    require: true
  },
  furnished: {
    type: Number,
    require: true
  },
  handicapAccessible: {
    type: Boolean,
    require: true
  },
  petsAllowed: {
    type: Boolean,
    require: true
  },
  smokeAllowed: {
    type: Boolean,
    require: true
  },
  
});

aptSchema.static(
  "updateLikeStatus",
  async function (
    aptId: String,
    userId: String,
    status: String
  ): Promise<void> {
    try {
      if (status === "likedBy") {
        await AptModel.findOneAndUpdate(
          { _id: aptId },
          { $push: { likedBy: userId } },
          { new: true }
        );
      } else {
        await AptModel.findOneAndUpdate(
          { _id: aptId },
          { $push: { disLikedBy: userId } },
          { new: true }
        );
      }
    } catch (e) {
      console.error(e);
    }
  }
);

aptSchema.static(
  "findByUserFilters",
  async function (
    aptData: IClientApt,
    userId: String
  ): Promise<IOwnerApt[] | undefined> {
    try {
      let filtersObj: { [key: string]: {} } = {
        pricePerMonth: { $gt: aptData.priceMin, $lt: aptData.priceMax },
        city: aptData.city,
        likedBy: { $ne: userId },
        disLikedBy: { $ne: userId },
      };

      Object.entries(aptData).forEach(([key, value]) => {
        if (value === null) {
          delete filtersObj[key];
        }
      });
      return await AptModel.find(filtersObj, ["-disLikedBy", "-likedBy", ]);
    } catch (e) {
      console.error(e);
    }
  }
);
export const AptModel = mongoose.model<IOwnerApt, IAptModel>(
  "AptModel",
  aptSchema
);
