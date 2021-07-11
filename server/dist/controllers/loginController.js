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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const UserModel_1 = require("../db/models/UserModel");
const responses_1 = require("../utils/responses");
const s3_1 = require("../utils/s3");
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const unlinkFile = util_1.default.promisify(fs_1.default.unlink);
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body) {
        res.status(400).send(responses_1.resTemplate.clientError.badRequest);
        return;
    }
    const credentials = req.body;
    credentials.password = hashSync(credentials.password, genSaltSync(10));
    try {
        yield UserModel_1.UserModel.create(credentials);
        res.status(201).send(responses_1.resTemplate.success.created);
    }
    catch (e) {
        console.error(e);
        res.status(500).send(responses_1.resTemplate.serverError);
    }
});
const signIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
            const isPasswordCorrect = compareSync(credentials.password, result.password);
            if (!isPasswordCorrect) {
                res.status(401).send(responses_1.resTemplate.clientError.unAuthorized);
            }
            req.decoded = {
                id: result._id,
                fullName: result.fullName,
                email: result.email,
                phoneNumber: result.phoneNumber,
                age: result.age,
                isOwner: result.isOwner,
                imgUrl: result.imgUrl,
            };
            next();
        }
        else {
            res.status(401).send(responses_1.resTemplate.clientError.unAuthorized);
        }
    }
    catch (e) {
        console.error(e);
        res.status(500).send(responses_1.resTemplate.serverError);
    }
});
const uploadProfileImg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        res.status(400).send(responses_1.resTemplate.clientError.badRequest);
        return;
    }
    try {
        const result = yield s3_1.uploadFile(req.file.path, req.file.filename);
        yield unlinkFile(req.file.path);
        res.status(201).send(Object.assign(Object.assign({}, responses_1.resTemplate.success.created), { data: `/user/profile-image/${result.Key}` }));
    }
    catch (e) {
        console.error(e);
        res.status(500).send(responses_1.resTemplate.serverError);
    }
});
const loginController = { signUp, signIn, uploadProfileImg };
exports.default = loginController;
