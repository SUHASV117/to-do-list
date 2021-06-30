import { Router } from "express";
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/index";
import bodyParser from "body-parser";

const router: Router = Router();
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
router.get("/todos", getTodos);
router.post("/add-todo", jsonParser, addTodo);
router.put("/edit-todo/:id", jsonParser, updateTodo);
router.delete("/delete-todo/:id", jsonParser, deleteTodo);

export default router;
