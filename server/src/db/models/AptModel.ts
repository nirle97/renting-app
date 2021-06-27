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
  address: {
    type: String,
    require: true,
  },
  cords: {
    type: Object,
    require: true,
  },
  pricePerMonth: {
    type: Number,
    require: true,
  },
  imagesUrl: {
    type: Array,
    require: true,
  },
  likedBy: {
    type: Array,
    default: [],
    sparse: true,
  },
  disLikedBy: {
    type: Array,
    default: [],
    sparse: true,
  },
  rentalType: {
    type: String,
    require: true,
  },
  entryDate: {
    type: Date,
    require: true,
  },
  checkOutDate: {
    type: Date,
    require: true,
  },
  size: {
    type: Number,
    require: true,
  },
  floor: {
    type: Number,
    require: true,
  },
  rooms: {
    type: Number,
    require: true,
  },
  elevator: {
    type: Boolean,
    require: true,
  },
  parking: {
    type: Boolean,
    require: true,
  },
  porch: {
    type: Boolean,
    require: true,
  },
  garden: {
    type: Boolean,
    require: true,
  },
  furnished: {
    type: Boolean,
    require: true,
  },
  handicapAccessible: {
    type: Boolean,
    require: true,
  },
  petsAllowed: {
    type: Boolean,
    require: true,
  },
  smokeAllowed: {
    type: Boolean,
    require: true,
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
          { $push: { likedBy: userId } }
        );
      } else {
        await AptModel.findOneAndUpdate(
          { _id: aptId },
          { $push: { disLikedBy: userId } }
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
        address: { $in: [aptData.address] },
        likedBy: { $ne: userId },
        disLikedBy: { $ne: userId },
        rentalType: aptData.rentalType,
        size: { $gte: aptData.sizeMin, $lte: aptData.sizeMax },
        rooms: { $gte: aptData.roomsMin, $lte: aptData.roomsMax },
        parking: aptData.parking,
        porch: aptData.porch,
        garden: aptData.garden,
        furnished: aptData.furnished,
        elevator: aptData.elevator,
        handicapAccessible: aptData.handicapAccessible,
        petsAllowed: aptData.petsAllowed,
        smokeAllowed: aptData.smokeAllowed,
      };
      Object.entries(aptData).forEach(([key, value]) => {
        if (value === null || value === "") {
          delete filtersObj[key];
        }
      });
      return await AptModel.find(filtersObj, ["-disLikedBy", "-likedBy"]);
    } catch (e) {
      console.error(e);
    }
  }
);
export const AptModel = mongoose.model<IOwnerApt, IAptModel>(
  "AptModel",
  aptSchema
);
