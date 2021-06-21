"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.apartment = void 0;
exports.apartment = require("express").Router();
const aptController_1 = __importDefault(
  require("../controllers/aptController")
);
const auth_1 = require("../middleware/auth");
exports.apartment.post(
  "/create",
  auth_1.validToken,
  aptController_1.default.addNewApt
);
exports.apartment.put(
  "/like-status/:aptId",
  auth_1.validToken,
  aptController_1.default.setLikeStatus
);
exports.apartment.get(
  "/filtered-apts",
  auth_1.validToken,
  aptController_1.default.getAptsByFilters
);
exports.apartment.get(
  "/owner-apts",
  auth_1.validToken,
  aptController_1.default.getAptsByOwner
);
