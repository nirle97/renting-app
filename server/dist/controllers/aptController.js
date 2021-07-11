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
const AptModel_1 = require("../db/models/AptModel");
const UserModel_1 = require("../db/models/UserModel");
const responses_1 = require("../utils/responses");
const s3_1 = require("../utils/s3");
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
const multer = require("multer");
const unlinkFile = util_1.default.promisify(fs_1.default.unlink);
const addNewApt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body) {
        res.status(400).send(responses_1.resTemplate.clientError.badRequest);
        return;
    }
    try {
        const newAptObj = Object.assign(Object.assign({}, req.body), { ownerId: req.decoded.id, entryDate: dateToMilliSc(req.body.entryDate), checkOutDate: dateToMilliSc(req.body.checkOutDate) });
        const newApt = yield AptModel_1.AptModel.create(newAptObj);
        res
            .status(201)
            .send(Object.assign(Object.assign({}, responses_1.resTemplate.success.created), { data: { id: newApt._id } }));
    }
    catch (e) {
        console.error(e);
        res.status(500).send(responses_1.resTemplate.serverError);
    }
});
const setLikeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.status || !req.params.aptId) {
        res.status(400).send(responses_1.resTemplate.clientError.badRequest);
        return;
    }
    try {
        yield AptModel_1.AptModel.updateLikeStatus(req.params.aptId, req.decoded.id, req.query.status.toString());
        yield UserModel_1.UserModel.findOneAndUpdate({ _id: req.decoded.id }, { $push: { likedApts: req.params.aptId } }, { new: true });
        res.status(200).send(responses_1.resTemplate.success.general);
    }
    catch (e) {
        console.error(e);
        res.status(500).send(responses_1.resTemplate.serverError);
    }
});
const getAptsByFilters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body) {
        res.status(400).send(responses_1.resTemplate.clientError.badRequest);
        return;
    }
    try {
        const data = Object.assign(Object.assign({}, req.body), { entryDate: dateToMilliSc(req.body.entryDate), checkOutDate: dateToMilliSc(req.body.checkOutDate) });
        const aptsArray = yield AptModel_1.AptModel.findByUserFilters(data, req.decoded.id);
        res.status(200).send(Object.assign(Object.assign({}, responses_1.resTemplate.success.general), { data: aptsArray }));
    }
    catch (e) {
        console.error(e);
        res.status(500).send(responses_1.resTemplate.serverError);
    }
});
const getAptsByOwner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const aptsArray = yield AptModel_1.AptModel.find({ ownerId: req.decoded.id });
        for (let i = 0; i < aptsArray.length; i++) {
            aptsArray[i].likedByUser = yield UserModel_1.UserModel.find({
                _id: { $in: aptsArray[i].likedBy },
            }, ["-password", "-isOwner", "-likedApts", "-refreshToken"]);
        }
        res.status(200).send(Object.assign(Object.assign({}, responses_1.resTemplate.success.general), { data: aptsArray }));
    }
    catch (e) {
        console.error(e);
        res.status(500).send(responses_1.resTemplate.serverError);
    }
});
const getAptsByLikes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserModel_1.UserModel.findById({ _id: req.decoded.id }, [
            "likedApts",
        ]);
        if (user) {
            const aptsArray = yield AptModel_1.AptModel.find({ _id: { $in: user.likedApts } });
            res.status(200).send(Object.assign(Object.assign({}, responses_1.resTemplate.success.general), { data: aptsArray }));
        }
        else {
            res.status(200).send(responses_1.resTemplate.success.noContent);
        }
    }
    catch (e) {
        console.error(e);
        res.status(500).send(responses_1.resTemplate.serverError);
    }
});
const uploadAptImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.files || !req.files.length) {
        res.status(400).send(responses_1.resTemplate.clientError.badRequest);
        return;
    }
    try {
        const aptId = req.body.description;
        const aptImgsUrls = [];
        const files = req.files;
        for (let i = 0; i < req.files.length; i++) {
            const file = files[i];
            const result = yield s3_1.uploadFile(file.path, file.filename);
            aptImgsUrls.push(`/apartment/apt-images/${result.Key}`);
            yield AptModel_1.AptModel.updateOne({ _id: aptId }, { imagesUrl: aptImgsUrls });
            yield unlinkFile(file.path);
        }
        res.status(201).send(Object.assign(Object.assign({}, responses_1.resTemplate.success.created), { data: aptImgsUrls }));
    }
    catch (e) {
        console.error(e);
        res.status(500).send(responses_1.resTemplate.serverError);
    }
});
const getAptImg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const key = req.params.key;
    const readStream = s3_1.getFileStream(key);
    readStream.pipe(res);
});
function dateToMilliSc(date) {
    return new Date(date).getTime();
}
const aptController = {
    addNewApt,
    setLikeStatus,
    getAptsByFilters,
    getAptsByOwner,
    uploadAptImages,
    getAptImg,
    getAptsByLikes,
};
exports.default = aptController;
