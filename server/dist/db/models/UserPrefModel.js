"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPrefModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userPrefSchema = new mongoose_1.default.Schema({
  userId: {
    type: String,
    require: true,
    unique: true,
  },
  preferences: {
    type: Object,
  },
});
exports.UserPrefModel = mongoose_1.default.model(
  "UserPrefModel",
  userPrefSchema
);
