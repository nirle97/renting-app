import prefController from "../controllers/prefController";
import { validToken } from "../middleware/auth";
export const reference = require("express").Router();
reference.post(
  "/user-preferences",
  validToken,
  prefController.addUserPreferences
);
reference.put(
  "/user-preferences",
  validToken,
  prefController.updateUserPreferences
);
