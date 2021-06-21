export const apartment = require("express").Router();
import aptController from "../controllers/aptController";
import { validToken } from "../middleware/auth";
apartment.post("/create", validToken, aptController.addNewApt);
apartment.put("/like-status/:aptId", validToken, aptController.setLikeStatus);
apartment.get("/filtered-apts", validToken, aptController.getAptsByFilters);
apartment.get("/owner-apts", validToken, aptController.getAptsByOwner);
