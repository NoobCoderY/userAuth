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
exports.deleteTodo = exports.updateTodo = exports.getTodoById = exports.getAllTodo = exports.todoCreate = void 0;
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const todoModel_1 = __importDefault(require("../model/todoModel"));
//**********************************Create Todo*********************************/
const todoCreate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, status, dueDate } = req.body;
        if (!title || !description || !dueDate) {
            return next(new errorHandler_1.default("please enter all details", 401));
        }
        const todo = yield todoModel_1.default.create({
            title: title,
            description: description,
            dueDate: dueDate,
            status: status,
        });
        res.status(200).json({
            message: "todo successfully created",
            todo,
        });
    }
    catch (error) {
        return next(new errorHandler_1.default(error, 401));
    }
});
exports.todoCreate = todoCreate;
//**********************************Get All Todo*********************************/
const getAllTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield todoModel_1.default.find({});
        res.status(200).json({
            message: "success",
            todos,
        });
    }
    catch (error) {
        return next(new errorHandler_1.default(error, 401));
    }
});
exports.getAllTodo = getAllTodo;
//**********************************Get Todo By Id*********************************/
const getTodoById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const todo = yield todoModel_1.default.findOne({ _id: id });
        if (!todo) {
            return next(new errorHandler_1.default("todo not found", 200));
        }
        res.status(200).json({
            message: "success",
            todo,
        });
    }
    catch (error) {
        return next(new errorHandler_1.default(error, 401));
    }
});
exports.getTodoById = getTodoById;
//**********************************update Todo By *********************************/
const updateTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { title, description, status, dueDate } = req.body;
        const todo = yield todoModel_1.default.findOneAndUpdate({ _id: id }, {
            title: title,
            description: description,
            dueDate: dueDate,
            status: status,
        }, {
            new: true,
        });
        res.status(200).json({
            message: "success",
            todo,
        });
    }
    catch (error) {
        return next(new errorHandler_1.default(error, 401));
    }
});
exports.updateTodo = updateTodo;
//**********************************Delete By Id*********************************/
const deleteTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const todo = yield todoModel_1.default.findOneAndDelete({ _id: id });
        res.status(200).json({
            message: "successfully deleted",
            todo,
        });
    }
    catch (error) {
        return next(new errorHandler_1.default(error, 401));
    }
});
exports.deleteTodo = deleteTodo;
//# sourceMappingURL=todoController.js.map