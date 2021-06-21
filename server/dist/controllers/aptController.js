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
const AptModel_1 = require("../db/models/AptModel");
const UserModel_1 = require("../db/models/UserModel");
const responses_1 = require("../utils/responses");
const addNewApt = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body) {
      res.status(400).send(responses_1.resTemplate.clientError.badRequest);
      return;
    }
    try {
      const newAptObj = Object.assign(Object.assign({}, req.body), {
        ownerId: req.decoded.id,
      });
      yield AptModel_1.AptModel.create(newAptObj);
      res.status(201).send(responses_1.resTemplate.success.created);
    } catch (e) {
      console.error(e);
      res.status(500).send(responses_1.resTemplate.serverError);
    }
    const aptDetails = req.body;
  });
const setLikeStatus = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.status || !req.params.aptId) {
      res.status(400).send(responses_1.resTemplate.clientError.badRequest);
      return;
    }
    try {
      yield AptModel_1.AptModel.updateLikeStatus(
        req.params.aptId,
        req.decoded.id,
        req.query.status.toString()
      );
      yield UserModel_1.UserModel.findOneAndUpdate(
        { _id: req.decoded.id },
        { $push: { likedApts: req.params.aptId } },
        { new: true }
      );
      res.status(200).send(responses_1.resTemplate.success.general);
    } catch (e) {
      console.error(e);
      res.status(500).send(responses_1.resTemplate.serverError);
    }
  });
const getAptsByFilters = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body) {
      res.status(400).send(responses_1.resTemplate.clientError.badRequest);
      return;
    }
    try {
      const data = req.body;
      const aptsArray = yield AptModel_1.AptModel.findByUserFilters(
        data,
        req.decoded.id
      );
      res
        .status(200)
        .send(
          Object.assign(
            Object.assign({}, responses_1.resTemplate.success.general),
            { data: aptsArray }
          )
        );
    } catch (e) {
      console.error(e);
      res.status(500).send(responses_1.resTemplate.serverError);
    }
  });
const getAptsByOwner = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const aptsArray = yield AptModel_1.AptModel.find({
        ownerId: req.decoded.id,
      });
      res
        .status(200)
        .send(
          Object.assign(
            Object.assign({}, responses_1.resTemplate.success.general),
            { data: aptsArray }
          )
        );
    } catch (e) {
      console.error(e);
      res.status(500).send(responses_1.resTemplate.serverError);
    }
  });
const aptController = {
  addNewApt,
  setLikeStatus,
  getAptsByFilters,
  getAptsByOwner,
};
exports.default = aptController;
