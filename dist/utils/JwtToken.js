"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = exports.generateRefreshToken = exports.sendToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sendToken = (user, statusCode, res) => {
    const Accesstoken = (0, exports.generateAccessToken)(user);
    const refreshToken = (0, exports.generateRefreshToken)(user);
    res.status(statusCode).json({
        success: true,
        Accesstoken: Accesstoken,
        refreshToken: refreshToken
    });
};
exports.sendToken = sendToken;
const generateRefreshToken = (user) => {
    return jsonwebtoken_1.default.sign({
        id: user.id,
        name: user.name,
    }, process.env.JWT_KEY, { expiresIn: '30m' });
};
exports.generateRefreshToken = generateRefreshToken;
const generateAccessToken = (user) => {
    return jsonwebtoken_1.default.sign({
        id: user.id,
        name: user.name,
    }, process.env.JWT_KEY, { expiresIn: '7d' });
};
exports.generateAccessToken = generateAccessToken;
//# sourceMappingURL=JwtToken.js.map