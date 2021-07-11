"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validToken = void 0;
const { verify } = require("jsonwebtoken");
const responses_1 = require("../utils/responses");
const validToken = (req, res, next) => {
  let token = req.get("authorization");
  if (token) {
    token = token.split(" ")[1];
    verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(403).send(responses_1.resTemplate.clientError.forbidden);
        return;
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res
      .status(401)
      .send(responses_1.resTemplate.clientError.unAuthorized);
  }
};
exports.validToken = validToken;
