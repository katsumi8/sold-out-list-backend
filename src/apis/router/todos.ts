import Express from "express";
import Todo from "../../models/Todo";

const router = Express.Router();

router
  .route("/")
  .get(async (req, res) => {
    try {
      const todos = await Todo.find().sort({ createdAt: -1 });
      res.status(200).json(todos);
    } catch (err) {
      res.status(500).send(err);
    }
  })
  .post(async (req, res) => {
    const { text } = req.body;
    try {
      const createTask = await Todo.create({ text });
      res.status(200).json(createTask);
    } catch (err) {
      res.status(500).send(err);
    }
  });

router.route("/:todoId").delete(async (req, res) => {
  const { todoId } = req.params;
  try {
    const deleteTask = await Todo.findOneAndDelete({ _id: todoId });
    if (!deleteTask) {
      return res.status(404).json(`_id:${todoId} does not exist`);
    }
    res.status(200).json(deleteTask);
  } catch (err) {
    res.status(500).json(err);
  }
});



export default router;
