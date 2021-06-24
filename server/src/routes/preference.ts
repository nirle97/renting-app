import prefController from "../controllers/prefController";
import { validToken } from "../middleware/auth";
export const preference = require("express").Router();
preference.put(
  "/user-preferences",
  validToken,
  prefController.setUserPreferences
);
preference.get(
  "/user-preferences",
  validToken,
  prefController.getUserPreferences
);
