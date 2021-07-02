import mongoose, { Model } from "mongoose";
import { IOwnerApt, IClientApt } from "../../interfaces/interface";

interface IAptModel extends Model<IOwnerApt> {
  updateLikeStatus(
    aptId: string,
    userId: string,
    status: string
  ): Promise<void>;
  findByUserFilters(aptData: IClientApt, userId: string): Promise<IOwnerApt[]>;
}

const aptSchema = new mongoose.Schema<IOwnerApt, IAptModel>({
  ownerId: {
    type: String,
    require: true,
  },
  title: {
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
  likedByUser: {
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
    type: Number,
    require: true,
  },
  checkOutDate: {
    type: Number,
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
    aptId: string,
    userId: string,
    status: string
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
    userId: string
  ): Promise<IOwnerApt[] | undefined> {
    try {
      let filtersObj: { [key: string]: {} } = {
        pricePerMonth:
          aptData.priceMax === 10000
            ? { $gte: aptData.priceMin }
            : { $gte: aptData.priceMin, $lte: aptData.priceMax },
        // address: { $in: [aptData.address] },
        likedBy: { $ne: userId },
        disLikedBy: { $ne: userId },
        // rentalType: aptData.rentalType,
        entryDate: { $lte: aptData.entryDate },
        checkOutDate: { $gte: aptData.checkOutDate },
        size:
          aptData.sizeMax === 300
            ? { $gte: aptData.sizeMin }
            : { $gte: aptData.sizeMin, $lte: aptData.sizeMax },
        rooms:
          aptData.roomsMax === 10
            ? { $gte: aptData.roomsMin }
            : { $gte: aptData.roomsMin, $lte: aptData.roomsMax },
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
      return await AptModel.find(filtersObj, ["-disLikedBy", "-likedBy"]).limit(
        10
      );
    } catch (e) {
      console.error(e);
    }
  }
);
export const AptModel = mongoose.model<IOwnerApt, IAptModel>(
  "AptModel",
  aptSchema
);
