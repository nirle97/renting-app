"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default
  .connect("mongodb://localhost:27017/rent", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("server connected to MongoDB");
    app_1.app.listen(8080, () => console.log("app is listening on port 8080"));
  })
  .catch((error) => {
    console.error("error connecting to MongoDB: ", error.message);
  });
module.exports = app_1.app;
