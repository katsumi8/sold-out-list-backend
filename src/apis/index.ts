import Express from 'express';
import todoRouter from './router/todos';

const router = Express.Router();

// サーバーの動作確認
router.get('/health', (req, res) => {
  res.send('I am OK!');
});

// ルーティングの設定
router.use('/todos', todoRouter);

export default router;