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
aptSchema.static("updateLikeStatus", function (aptId, userId, status) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (status === "likedBy") {
                yield exports.AptModel.findOneAndUpdate({ _id: aptId }, { $push: { likedBy: userId } });
            }
            else {
                yield exports.AptModel.findOneAndUpdate({ _id: aptId }, { $push: { disLikedBy: userId } });
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
                pricePerMonth: aptData.priceMax === 10000
                    ? { $gte: aptData.priceMin }
                    : { $gte: aptData.priceMin, $lte: aptData.priceMax },
                address: { $regex: `${aptData.address}`, $options: "i" },
                likedBy: { $ne: userId },
                disLikedBy: { $ne: userId },
                entryDate: { $lte: aptData.entryDate },
                checkOutDate: { $gte: aptData.checkOutDate },
                size: aptData.sizeMax === 300
                    ? { $gte: aptData.sizeMin }
                    : { $gte: aptData.sizeMin, $lte: aptData.sizeMax },
                rooms: aptData.roomsMax === 10
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
            return yield exports.AptModel.find(filtersObj, ["-disLikedBy", "-likedBy"]).limit(10);
        }
        catch (e) {
            console.error(e);
        }
    });
});
exports.AptModel = mongoose_1.default.model("AptModel", aptSchema);
