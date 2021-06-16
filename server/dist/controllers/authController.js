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
const { sign, verify } = require("jsonwebtoken");
const UserModel_1 = require("../db/models/UserModel");
const responses_1 = require("../utils/responses");
require("dotenv").config();
const vlidateToken = (req, res) => {
    res.status(200).send(responses_1.resTemplate.success.general);
};
const generateNewToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let refreshToken = yield UserModel_1.UserModel.findOne({ email: req.body.email }, "refreshToken");
        verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(403).send(responses_1.resTemplate.clientError.forbidden);
                return;
            }
            ;
            const accessToken = sign(decoded, process.env.JWT_SECRET, {
                expiresIn: "10m",
            });
            res.status(200).send(Object.assign(Object.assign({}, responses_1.resTemplate.success.general), { data: accessToken }));
        });
    }
    catch (e) {
        console.log(e);
        res.status(401).send(responses_1.resTemplate.clientError.unAuthorized);
    }
});
const terminateToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.decoded;
        yield UserModel_1.UserModel.findOneAndUpdate({ email: user.email }, { refreshToken: null });
        res.status(200).send(responses_1.resTemplate.success.general);
    }
    catch (e) {
        res.status(401).send(responses_1.resTemplate.clientError.unAuthorized);
    }
});
const createToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = sign(req.decoded.toJSON(), process.env.JWT_SECRET, {
            expiresIn: "10m",
        });
        const refreshToken = sign(req.decoded.toJSON(), process.env.JWT_SECRET, {
            expiresIn: "6h",
        });
        yield UserModel_1.UserModel.findOneAndUpdate({ email: req.decoded.email }, { refreshToken: refreshToken }, { new: true });
        res.status(200).send(Object.assign(Object.assign({}, responses_1.resTemplate.success.general), { data: accessToken }));
    }
    catch (e) {
        console.error(e);
        res.status(500).send(responses_1.resTemplate.serverError);
    }
});
const authController = { vlidateToken, generateNewToken, terminateToken, createToken };
exports.default = authController;
