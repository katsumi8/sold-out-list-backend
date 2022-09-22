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
const express_1 = __importDefault(require("express"));
const Todo_1 = __importDefault(require("../../models/Todo"));
const router = express_1.default.Router();
router
    .route("/")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield Todo_1.default.find().sort({ createdAt: -1 });
        res.status(200).json(todos);
    }
    catch (err) {
        res.status(500).send(err);
    }
}))
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { text } = req.body;
    try {
        const createTask = yield Todo_1.default.create({ text });
        res.status(200).json(createTask);
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
router.route("/:todoId").delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { todoId } = req.params;
    try {
        const deleteTask = yield Todo_1.default.findOneAndDelete({ _id: todoId });
        if (!deleteTask) {
            return res.status(404).json(`_id:${todoId} does not exist`);
        }
        res.status(200).json(deleteTask);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
exports.default = router;
