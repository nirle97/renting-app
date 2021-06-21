"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const login_1 = require("./routes/login");
const auth_1 = require("./routes/auth");
const apartment_1 = require("./routes/apartment");
const reference_1 = require("./routes/reference");
const user_1 = require("./routes/user");
exports.app = express_1.default();
exports.app.use(express_1.default.json());
exports.app.use(cors_1.default());
exports.app.use("/login", login_1.login);
exports.app.use("/auth", auth_1.auth);
exports.app.use("/apartment", apartment_1.apartment);
exports.app.use("/reference", reference_1.reference);
exports.app.use("/user", user_1.user);
