"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apartment = void 0;
exports.apartment = require("express").Router();
const aptController_1 = __importDefault(require("../controllers/aptController"));
const auth_1 = require("../middleware/auth");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
exports.apartment.post("/create", auth_1.validToken, aptController_1.default.addNewApt);
exports.apartment.put("/like-status/:aptId", auth_1.validToken, aptController_1.default.setLikeStatus);
exports.apartment.post("/filtered-apts", auth_1.validToken, aptController_1.default.getAptsByFilters);
exports.apartment.get("/owner-apts", auth_1.validToken, aptController_1.default.getAptsByOwner);
exports.apartment.get("/user-liked-apts", auth_1.validToken, aptController_1.default.getAptsByLikes);
exports.apartment.post("/owner-apts-images", auth_1.validToken, upload.array("apt-images"), aptController_1.default.uploadAptImages);
exports.apartment.get("/apt-images/:key", aptController_1.default.getAptImg);
