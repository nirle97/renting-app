"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validToken = void 0;
const { verify } = require("jsonwebtoken");
const validToken = (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
        token = token.split(" ")[1];
        verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err)
                return res.status(403).send("Invalid Access Token");
            req.decoded = decoded;
            next();
        });
    }
    else {
        return res.status(401).send("Access Token Required");
    }
};
exports.validToken = validToken;
