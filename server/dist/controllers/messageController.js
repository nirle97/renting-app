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
const MessageModel_1 = require("../db/models/MessageModel");
const responses_1 = require("../utils/responses");
const s3_1 = require("../utils/s3");
const util_1 = __importDefault(require("util"));
const fs_1 = __importDefault(require("fs"));
const s3_2 = require("../utils/s3");
const unlinkFile = util_1.default.promisify(fs_1.default.unlink);
const setNewMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body) {
        res.status(400).send(responses_1.resTemplate.clientError.badRequest);
        return;
    }
    try {
        yield MessageModel_1.MessageModel.create(req.body);
        res.status(200).send(responses_1.resTemplate.success.created);
    }
    catch (e) {
        console.error(e);
        res.status(500).send(responses_1.resTemplate.serverError);
    }
});
const getMessagesByRoomId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body || !req.params) {
        res.status(400).send(responses_1.resTemplate.clientError.badRequest);
        return;
    }
    try {
        const messages = yield MessageModel_1.MessageModel.find({ chatRoomId: req.params.roomId });
        res.status(200).send(Object.assign(Object.assign({}, responses_1.resTemplate.success.general), { data: messages }));
    }
    catch (e) {
        console.error(e);
        res.status(500).send(responses_1.resTemplate.serverError);
    }
});
const setNewFileMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body || !req.file) {
        res.status(400).send(responses_1.resTemplate.clientError.badRequest);
        return;
    }
    try {
        const body = req.body;
        yield s3_1.uploadFile(req.file.path, req.file.filename);
        yield unlinkFile(req.file.path);
        res.status(201).send(Object.assign(Object.assign({}, responses_1.resTemplate.success.created), { data: { path: `/message/get-file/${req.file.filename}` } }));
    }
    catch (e) {
        console.error(e);
        res.status(500).send(responses_1.resTemplate.serverError);
    }
});
const getFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const key = req.params.key;
    const readStream = s3_2.getFileStream(key);
    readStream.pipe(res);
});
const messageController = {
    setNewMessage,
    getMessagesByRoomId,
    setNewFileMessage,
    getFile,
};
exports.default = messageController;
