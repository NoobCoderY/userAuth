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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllUsers = exports.Refresh = exports.Login = exports.UserCreate = void 0;
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const userModel_1 = __importDefault(require("../model/userModel"));
const JwtToken_1 = require("../utils/JwtToken");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//**********************************Create User*********************************/
const UserCreate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, password } = req.body;
        if (!name || !password) {
            if (!name) {
                return next(new errorHandler_1.default("please send name", 400));
            }
            else {
                return next(new errorHandler_1.default("please send password", 400));
            }
        }
        const userExistCheck = yield userModel_1.default.findOne({ name });
        if (userExistCheck) {
            return next(new errorHandler_1.default("user already exist", 400));
        }
        const user = yield userModel_1.default.create({
            name,
            password,
        });
        res.status(201).json({
            success: true,
            user,
        });
    }
    catch (error) {
        return next(new errorHandler_1.default(error, 400));
    }
});
exports.UserCreate = UserCreate;
// **********************************Login*********************************/
const Login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, password } = req.body;
        if (!name || !password) {
            if (!name) {
                return next(new errorHandler_1.default("please send name", 400));
            }
            else {
                return next(new errorHandler_1.default("please send password", 400));
            }
        }
        const user = yield userModel_1.default.findOne({ name });
        if (!user) {
            return next(new errorHandler_1.default("Invalid email or password", 403));
        }
        const isPasswordMatched = yield user.comparePassword(password);
        if (!isPasswordMatched) {
            return next(new errorHandler_1.default("Invalid email or password", 403));
        }
        //for send jwt token
        (0, JwtToken_1.sendToken)(user, 200, res);
    }
    catch (error) {
        return next(new errorHandler_1.default(error, 401));
    }
});
exports.Login = Login;
// **********************************Access refresh token*********************************/
const Refresh = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { accessToken } = req.body;
    if (!accessToken || typeof accessToken !== "string") {
        return next(new errorHandler_1.default("invalid data", 401));
    }
    jsonwebtoken_1.default.verify(accessToken, process.env.JWT_KEY, (err, user) => {
        if (err) {
            return next(new errorHandler_1.default(err, 403));
        }
        console.log(user);
        const refreshToken = (0, JwtToken_1.generateRefreshToken)(user);
        const accessToken = (0, JwtToken_1.generateAccessToken)(user);
        res.status(200).json({ refreshToken, accessToken });
    });
});
exports.Refresh = Refresh;
// **********************************Get All Users*********************************/
const GetAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.default.find({}, { password: 0 });
        res.status(200).json({
            message: "success",
            users,
        });
    }
    catch (error) {
        return next(new errorHandler_1.default(error, 401));
    }
});
exports.GetAllUsers = GetAllUsers;
//# sourceMappingURL=UserController.js.map