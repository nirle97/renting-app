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
exports.signIn = exports.signUp = void 0;
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const UserModel = require("../db/models/User");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body)
        return res.status(400).send({
            success: false,
            status: 400,
            message: "The server could not understand the request due to empty body"
        });
    const credentials = req.body;
    credentials.password = hashSync(credentials.password, genSaltSync(10));
    try {
        yield UserModel.create(credentials);
        res.status(201).send({
            success: true,
            status: 201,
            message: "The request has succeeded, a new user has been created"
        });
    }
    catch (e) {
        console.error(e);
        res.status(500).send({
            success: false,
            status: 500,
            message: e.message
        });
    }
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body)
        return res.status(400).send({
            success: false,
            status: 400,
            message: "The server could not understand the request due to empty body"
        });
    const credentials = req.body;
    try {
        const result = yield UserModel.findOne({ email: credentials.email }, "email password");
        const isPasswordCorrect = compareSync(result.password, credentials.password);
        if (!isPasswordCorrect)
            return res.status(401).send({
                success: false,
                status: 401,
                message: "User or password incorrect"
            });
        res.status(200).send({
            success: true,
            status: 200,
            message: "The request has succeeded, user is authorized"
        });
    }
    catch (e) {
        console.error(e);
        res.status(500).send({
            success: false,
            status: 500,
            message: e.message
        });
    }
});
exports.signIn = signIn;
