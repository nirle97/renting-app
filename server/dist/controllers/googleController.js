"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const responses_1 = require("../utils/responses");
const UserModel_1 = require("../db/models/UserModel");
const { OAuth2Client } = require("google-auth-library");
const { sign, verify } = require("jsonwebtoken");
require("dotenv").config();
const client = new OAuth2Client(process.env.CLIENT_ID);
const setToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body || Object.keys(req.body).length === 0) {
        res.status(400).send(responses_1.resTemplate.clientError.badRequest);
        return;
    }
    try {
        const tokenId = req.body.tokenId;
        const ticket = yield client.verifyIdToken({
            idToken: tokenId,
            audience: process.env.CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const credentials = {
            fullName: payload.name,
            email: payload.email,
            imgUrl: payload.picture,
        };
        const count = yield UserModel_1.UserModel.countDocuments({ email: credentials.email });
        let user;
        if (count === 0) {
            user = yield UserModel_1.UserModel.create(credentials);
            req.decoded = Object.assign(Object.assign({}, credentials), { id: user === null || user === void 0 ? void 0 : user._id });
            next();
        }
        else {
            user = yield UserModel_1.UserModel.findOne({ email: credentials.email });
            if (user) {
                req.decoded = user.toJSON();
                next();
            }
        }
    }
    catch (e) {
        console.error(e);
        if (e.message.includes("duplicate key error")) {
            res.status(409).send(responses_1.resTemplate.alreadyExists);
        }
        else {
            res.status(500).send(responses_1.resTemplate.serverError);
        }
    }
});
const googleController = {
    setToken,
};
exports.default = googleController;
