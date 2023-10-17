"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
//**********************************check authorization*********************************/
const Authenticate = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        if (!token) {
            return next(new errorHandler_1.default("Please Login to access this resource", 401));
        }
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_KEY, (err, user) => {
        if (err) {
            return next(new errorHandler_1.default(err, 401));
        }
        req.user = user;
        next();
    });
};
exports.Authenticate = Authenticate;
//# sourceMappingURL=auth.js.map