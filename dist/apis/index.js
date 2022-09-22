"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todos_1 = __importDefault(require("./router/todos"));
const router = express_1.default.Router();
// サーバーの動作確認
router.get('/health', (req, res) => {
    res.send('I am OK!');
});
// ルーティングの設定
router.use('/todos', todos_1.default);
exports.default = router;
