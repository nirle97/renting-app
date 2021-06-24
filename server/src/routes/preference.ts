import prefController from "../controllers/prefController";
import { validToken } from "../middleware/auth";
export const preference = require("express").Router();
preference.post(
  "/user-preferences",
  validToken,
  prefController.addUserPreferences
);
preference.put(
  "/user-preferences",
  validToken,
  prefController.updateUserPreferences
);
preference.get(
  "/user-preferences",
  validToken,
  prefController.getUserPreferences
);
