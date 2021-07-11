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
        let refreshToken = yield UserModel_1.UserModel.findOne({ _id: req.body.id }, [
            "refreshToken",
        ]);
        verify(refreshToken === null || refreshToken === void 0 ? void 0 : refreshToken.refreshToken, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error(err);
                res.status(403).send(responses_1.resTemplate.clientError.forbidden);
                return;
            }
            delete decoded.exp;
            decoded === null || decoded === void 0 ? true : delete decoded.iat;
            const accessToken = sign(decoded, process.env.JWT_SECRET, {
                expiresIn: "10h",
            });
            res.status(200).send(Object.assign(Object.assign({}, responses_1.resTemplate.success.general), { data: accessToken }));
        });
    }
    catch (e) {
        console.error(e);
        res.status(401).send(responses_1.resTemplate.clientError.unAuthorized);
    }
});
const terminateToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.decoded;
        yield UserModel_1.UserModel.findOneAndUpdate({ _id: user.id }, { refreshToken: null });
        res.status(200).send(responses_1.resTemplate.success.general);
    }
    catch (e) {
        res.status(401).send(responses_1.resTemplate.clientError.unAuthorized);
    }
});
const createToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = sign(req.decoded, process.env.JWT_SECRET, {
            expiresIn: "10h",
        });
        const refreshToken = sign(req.decoded, process.env.JWT_SECRET, {
            expiresIn: "24h",
        });
        yield UserModel_1.UserModel.findOneAndUpdate({ email: req.decoded.email }, { refreshToken: refreshToken });
        res.status(200).send(Object.assign(Object.assign({}, responses_1.resTemplate.success.general), { data: {
                accessToken,
                id: req.decoded.id,
                email: req.decoded.email,
                fullName: req.decoded.fullName,
                imgUrl: req.decoded.imgUrl,
                age: req.decoded.age,
                isOwner: req.decoded.isOwner,
                phoneNumber: req.decoded.phoneNumber,
            } }));
    }
    catch (e) {
        console.error(e);
        res.status(500).send(responses_1.resTemplate.serverError);
    }
});
const authController = {
    vlidateToken,
    generateNewToken,
    terminateToken,
    createToken,
};
exports.default = authController;
