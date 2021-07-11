"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
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
userPrefSchema.static("createIfNotExistsByUserId", function (doc, docId) {
    return __awaiter(this, void 0, void 0, function* () {
        const count = yield exports.UserPrefModel.countDocuments({ userId: docId });
        if (count === 0) {
            yield exports.UserPrefModel.create({ userId: docId, preferences: doc });
        }
        else {
            yield exports.UserPrefModel.updateOne({ userId: docId }, { preferences: doc });
        }
    });
});
exports.UserPrefModel = mongoose_1.default.model("UserPrefModel", userPrefSchema);
