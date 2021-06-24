import mongoose, { Model } from "mongoose";
import { IClientPref, IClientApt } from "../../interfaces/interface";
interface IUserPrefModel extends Model<IClientPref> {
  createIfNotExistsByUserId(doc: IClientApt, docId: String): Promise<void>;
}

const userPrefSchema = new mongoose.Schema<IClientPref, IUserPrefModel>({
  userId: {
    type: String,
    require: true,
    unique: true,
  },
  preferences: {
    type: Object,
  },
});

userPrefSchema.static(
  "createIfNotExistsByUserId",
  async function (doc: IClientApt, docId: String): Promise<void> {
    const count = await UserPrefModel.countDocuments({ userId: docId });
    if (count === 0) {
      await UserPrefModel.create({ userId: docId, preferences: doc });
    } else {
      await UserPrefModel.updateOne({ userId: docId }, { preferences: doc });
    }
  }
);

export const UserPrefModel = mongoose.model<IClientPref, IUserPrefModel>(
  "UserPrefModel",
  userPrefSchema
);
