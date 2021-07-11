"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv").config();
const PORT = 5000;
mongoose_1.default
    .connect(`mongodb://${process.env.LOCAL_DB_NAME}:27017/rent`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
    .then(() => {
    console.log(`server connected to ${process.env.LOCAL_DB_NAME} database`);
    app_1.app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));
})
    .catch((error) => {
    console.error("error connecting to MongoDB: ", error.message);
});
module.exports = app_1.app;
