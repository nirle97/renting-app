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
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const UserModel_1 = require("../db/models/UserModel");
const responses_1 = require("../utils/responses");
const signUp = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body) {
      res.status(400).send(responses_1.resTemplate.clientError.badRequest);
      return;
    }
    const credentials = req.body;
    credentials.password = hashSync(credentials.password, genSaltSync(10));
    try {
      yield UserModel_1.UserModel.create(credentials);
      res.status(201).send(responses_1.resTemplate.success.created);
    } catch (e) {
      console.error(e);
      res.status(500).send(responses_1.resTemplate.serverError);
    }
  });
const signIn = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body) {
      res.status(400).send(responses_1.resTemplate.clientError.badRequest);
      return;
    }
    const credentials = req.body;
    try {
      const result = yield UserModel_1.UserModel.findOne({
        email: credentials.email,
      });
      if (result) {
        const isPasswordCorrect = compareSync(
          credentials.password,
          result.password
        );
        if (!isPasswordCorrect)
          res
            .status(401)
            .send(responses_1.resTemplate.clientError.unAuthorized);
        req.decoded = { id: result._id };
        next();
      }
    } catch (e) {
      console.error(e);
      res.status(500).send(responses_1.resTemplate.serverError);
    }
  });
const loginController = { signUp, signIn };
exports.default = loginController;
