import mongoose, { Model } from "mongoose"
import { IOwnerApt, IClientApt } from "../../interfaces/interface"

interface IAptModel extends Model<IOwnerApt> {
  updateLikeStatus(aptId: String, userId: String, status: String): Promise<void>,
  findByUserFilters(aptData: IClientApt, userId: String): Promise<IOwnerApt[]>
}

const aptSchema = new mongoose.Schema<IOwnerApt, IAptModel>({
  ownerId: {
    type: String,
    require: true
  }, 
  likedBy: {
    type: Array,
  },
  disLikedBy: {
    type: Array
  },
  city: {
    type: String,
    require: true
  },
  pricePerMonth: {
    type: Number,
    require: true
  },
});

aptSchema.static("updateLikeStatus", 
  async function(aptId: String, userId: String, status: String): Promise<void> {
  try {
    if (status === "likedBy") {
      await AptModel.findOneAndUpdate({ _id: aptId }, {$push: {"likedBy": userId}}, {new: true});
    } else {
      await AptModel.findOneAndUpdate({ _id: aptId }, {$push: {"disLikedBy": userId}}, {new: true});
    }
  } catch(e) {
    console.error(e)
  }
})

aptSchema.static("findByUserFilters", 
async function(aptData: IClientApt, userId: String): Promise<IOwnerApt[] | undefined>  {
  try {
    let filtersObj: {[key:string]: {}} = {
      pricePerMonth: { $gt: aptData.priceMin, $lt: aptData.priceMax },
      city: aptData.city,
      likedBy: { $ne: userId},
      dislikedBy: { $ne: userId},
    }

    Object.entries(aptData).forEach(([key, value]) => {
      if (value === null) {
        delete filtersObj[key]
      }
    })
    return await AptModel.find(filtersObj)
     
  } catch(e) {
    console.error(e)
  }
})
export const AptModel = mongoose.model<IOwnerApt, IAptModel>("AptModel", aptSchema);
