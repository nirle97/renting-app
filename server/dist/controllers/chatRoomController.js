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
const ChatRoomModel_1 = require("../db/models/ChatRoomModel");
const MessageModel_1 = require("../db/models/MessageModel");
const responses_1 = require("../utils/responses");
const AptModel_1 = require("../db/models/AptModel");
const UserModel_1 = require("../db/models/UserModel");
const openChatRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body) {
        res.status(400).send(responses_1.resTemplate.clientError.badRequest);
        return;
    }
    try {
        const aptData = req.body;
        const ownerId = aptData.participants.ownerInfo.id;
        const userId = aptData.participants.userInfo.id;
        const ownerAptsAddress = yield AptModel_1.AptModel.find({ ownerId }, [
            "address",
            "likedBy",
            "-_id",
        ]);
        const relevantAddresses = ownerAptsAddress.map((apt) => {
            const likedUserId = apt.likedBy.map((aptUserId) => {
                if (aptUserId === userId) {
                    return aptUserId;
                }
                else {
                    return false;
                }
            });
            if (likedUserId)
                return apt.address;
        });
        const newRoom = yield ChatRoomModel_1.ChatRoomModel.create({
            addresses: relevantAddresses,
            aptId: aptData.aptId,
            participants: aptData.participants,
        });
        yield UserModel_1.UserModel.updateOne({ _id: req.decoded.id }, { $push: { openChats: aptData.participants.userInfo.id } });
        yield UserModel_1.UserModel.updateOne({ _id: aptData.participants.userInfo.id }, { $push: { openChats: req.decoded.id } });
        res.status(200).send(Object.assign(Object.assign({}, responses_1.resTemplate.success.created), { data: newRoom._id }));
    }
    catch (e) {
        console.error(e);
        res.status(500).send(responses_1.resTemplate.serverError);
    }
});
const deleteChatRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params) {
        res.status(400).send(responses_1.resTemplate.clientError.badRequest);
        return;
    }
    try {
        const roomId = req.params.roomId;
        const room = yield ChatRoomModel_1.ChatRoomModel.findOne({ _id: roomId });
        const aptId = room === null || room === void 0 ? void 0 : room.aptId;
        const userId = room === null || room === void 0 ? void 0 : room.participants.userInfo.id;
        const ownerId = room === null || room === void 0 ? void 0 : room.participants.ownerInfo.id;
        yield AptModel_1.AptModel.updateOne({ _id: aptId }, {
            $pullAll: { likedBy: [userId], likedByUser: [userId] },
            $push: { disLikedBy: userId },
        });
        yield ChatRoomModel_1.ChatRoomModel.deleteOne({
            _id: roomId,
        });
        yield MessageModel_1.MessageModel.deleteMany({
            chatRoomId: roomId,
        });
        yield UserModel_1.UserModel.updateOne({ _id: userId }, { $pullAll: { openChats: [ownerId] } });
        res.status(204).send(responses_1.resTemplate.success.noContent);
    }
    catch (e) {
        console.error(e);
        res.status(500).send(responses_1.resTemplate.serverError);
    }
});
const getChatRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chatRooms = yield ChatRoomModel_1.ChatRoomModel.find({
            $or: [
                { "participants.userInfo.id": req.decoded.id },
                { "participants.ownerInfo.id": req.decoded.id },
            ],
        });
        res.status(200).send(Object.assign(Object.assign({}, responses_1.resTemplate.success.general), { data: chatRooms }));
    }
    catch (e) {
        console.error(e);
        res.status(500).send(responses_1.resTemplate.serverError);
    }
});
const chatRoomController = {
    openChatRoom,
    deleteChatRoom,
    getChatRoom,
};
exports.default = chatRoomController;
