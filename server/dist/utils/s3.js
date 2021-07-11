"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileStream = exports.uploadFile = void 0;
const s3_1 = __importDefault(require("aws-sdk/clients/s3"));
const fs_1 = __importDefault(require("fs"));
require("dotenv").config();
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;
const s3 = new s3_1.default({
    region,
    accessKeyId,
    secretAccessKey,
});
function uploadFile(path, filename) {
    const fileStream = fs_1.default.createReadStream(path);
    const uploadParams = {
        Bucket: bucketName ? bucketName : "",
        Body: fileStream,
        Key: filename,
    };
    return s3.upload(uploadParams).promise();
}
exports.uploadFile = uploadFile;
function getFileStream(fileKey) {
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName ? bucketName : "",
    };
    return s3.getObject(downloadParams).createReadStream();
}
exports.getFileStream = getFileStream;
