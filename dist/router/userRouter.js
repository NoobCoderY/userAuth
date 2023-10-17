"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controllers/UserController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post("/signup", UserController_1.UserCreate);
router.post("/login", UserController_1.Login);
router.post("/refresh", UserController_1.Refresh);
router.get("/getallusers", auth_1.Authenticate, UserController_1.GetAllUsers);
exports.default = router;
//# sourceMappingURL=userRouter.js.map