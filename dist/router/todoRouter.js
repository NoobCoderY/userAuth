"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controllers/UserController");
const router = express_1.default.Router();
router.post("/create", UserController_1.todoCreate);
router.get("/getalltodos", UserController_1.getAllTodo);
router.get("/gettodo/:id", UserController_1.getTodoById);
router.put("/updatetodo/:id", UserController_1.updateTodo);
router.delete("/deletetodo/:id", UserController_1.deleteTodo);
exports.default = router;
//# sourceMappingURL=todoRouter.js.map