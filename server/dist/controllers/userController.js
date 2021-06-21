"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = require("../db/models/UserModel");
const AptModel_1 = require("../db/models/AptModel");
const responses_1 = require("../utils/responses");
const getUser = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const user = yield UserModel_1.UserModel.findOne(
        { _id: req.decoded.id },
        ["-refreshToken", "-likedApts", "-password", "-__v"]
      );
      res
        .status(200)
        .send(
          Object.assign(
            Object.assign({}, responses_1.resTemplate.success.general),
            { data: user }
          )
        );
    } catch (e) {
      console.error(e);
      res.status(500).send(responses_1.resTemplate.serverError);
    }
  });
const getLikedApts = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const data = yield UserModel_1.UserModel.findOne(
        { _id: req.decoded.id },
        ["likedApts"],
        { new: true }
      );
      if (data) {
        const allApts = yield AptModel_1.AptModel.find(
          {
            _id: { $in: data.likedApts },
          },
          ["-__v", "-likedBy", "-disLikedBy"]
        );
        res
          .status(200)
          .send(
            Object.assign(
              Object.assign({}, responses_1.resTemplate.success.general),
              { data: allApts }
            )
          );
      }
    } catch (e) {
      console.error(e);
      res.status(500).send(responses_1.resTemplate.serverError);
    }
  });
const userController = { getUser, getLikedApts };
exports.default = userController;
