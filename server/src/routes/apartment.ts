export const apartment = require("express").Router();
import aptController from "../controllers/aptController";
import { validToken } from "../middleware/auth";
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
apartment.post("/create", validToken, aptController.addNewApt);
apartment.put("/like-status/:aptId", validToken, aptController.setLikeStatus);
apartment.post("/filtered-apts", validToken, aptController.getAptsByFilters);
apartment.get("/owner-apts", validToken, aptController.getAptsByOwner);
apartment.get("/liked-apts", validToken, aptController.getAptsByLikes);
// apartment.post(
//   "/owner-apts-images",
//   validToken,
//   upload.array("apt-images"),
//   aptController.uploadAptImages
// );
// apartment.get("/apt-images/:key", aptController.getAptImg);
