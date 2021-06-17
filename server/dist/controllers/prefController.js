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
const UserPrefModel_1 = require("../db/models/UserPrefModel");
const responses_1 = require("../utils/responses");
const addUserPreferences = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body) {
        res.status(400).send(responses_1.resTemplate.clientError.badRequest);
        return;
    }
    try {
        yield UserPrefModel_1.UserPrefModel.create({ userId: req.decoded.id, preferences: Object.assign({}, req.body) });
        res.status(200).send(responses_1.resTemplate.success.created);
    }
    catch (e) {
        console.error(e);
        res.status(500).send(responses_1.resTemplate.serverError);
    }
});
const updateUserPreferences = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body) {
        res.status(400).send(responses_1.resTemplate.clientError.badRequest);
        return;
    }
    try {
        yield UserPrefModel_1.UserPrefModel.updateOne({ userId: req.decoded.id }, { userId: req.decoded.id, preferences: Object.assign({}, req.body) });
        res.status(200).send(responses_1.resTemplate.success.general);
    }
    catch (e) {
        console.error(e);
        res.status(500).send(responses_1.resTemplate.serverError);
    }
});
const prefController = { addUserPreferences, updateUserPreferences };
exports.default = prefController;
