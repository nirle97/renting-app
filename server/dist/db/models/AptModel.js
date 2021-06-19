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
exports.AptModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const aptSchema = new mongoose_1.default.Schema({
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
aptSchema.static("updateLikeStatus", function (aptId, userId, status) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (status === "likedBy") {
                yield exports.AptModel.findOneAndUpdate({ _id: aptId }, { $push: { "likedBy": userId } }, { new: true });
            }
            else {
                yield exports.AptModel.findOneAndUpdate({ _id: aptId }, { $push: { "disLikedBy": userId } }, { new: true });
            }
        }
        catch (e) {
            console.error(e);
        }
    });
});
aptSchema.static("findByUserFilters", function (aptData, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let filtersObj = {
                pricePerMonth: { $gt: aptData.priceMin, $lt: aptData.priceMax },
                city: aptData.city,
                likedBy: { $ne: userId },
                dislikedBy: { $ne: userId },
            };
            Object.entries(aptData).forEach(([key, value]) => {
                if (value === null) {
                    delete filtersObj[key];
                }
            });
            return yield exports.AptModel.find(filtersObj);
        }
        catch (e) {
            console.error(e);
        }
    });
});
exports.AptModel = mongoose_1.default.model("AptModel", aptSchema);
