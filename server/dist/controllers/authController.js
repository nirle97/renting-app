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
exports.createToken = exports.terminateToken = exports.generateNewToken = exports.vlidateToken = void 0;
const { sign, verify } = require("jsonwebtoken");
const User_1 = require("../db/models/User");
const vlidateToken = (req, res) => {
    res.status(200).send({
        success: true,
        status: 200,
        message: "valid token"
    });
};
exports.vlidateToken = vlidateToken;
const generateNewToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let refreshToken = yield User_1.UserModel.findOne({ email: req.body.email }, "refreshToken");
        verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
            if (err)
                return res.status(403).send("Invalid RefreshToken Token");
            const accessToken = sign(decoded, process.env.JWT_SECRET, {
                expiresIn: "10m",
            });
            return res.status(200).send({
                success: true,
                statue: 200,
                data: accessToken
            });
        });
    }
    catch (e) {
        console.log(e);
        return res.status(401).send({
            success: false,
            status: 401,
            message: "Unable to Refresh Access Token"
        });
    }
});
exports.generateNewToken = generateNewToken;
const terminateToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.decoded;
        const a = req.body;
        yield User_1.UserModel.findOneAndUpdate({ email: user.email }, { refreshToken: null });
        res.status(200).send({
            success: true,
            statue: 200,
        });
    }
    catch (e) {
        res.status(401).send({
            success: false,
            status: 401,
            message: "Unable to terminate Refresh Token"
        });
    }
});
exports.terminateToken = terminateToken;
const createToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = sign(req.decoded, process.env.JWT_SECRET, {
            expiresIn: "10m",
        });
        const refreshToken = sign(req.decoded, process.env.JWT_SECRET, {
            expiresIn: "6h",
        });
        yield User_1.UserModel.findOneAndUpdate({ email: req.decoded.email }, { refreshToken: req.decoded.refreshToken });
        res.status(200).send({
            success: true,
            status: 200,
            data: accessToken
        });
    }
    catch (e) {
        console.error(e);
        res.status(500).send({
            success: false,
            status: 500,
            message: "Unable to create new token"
        });
    }
});
exports.createToken = createToken;
