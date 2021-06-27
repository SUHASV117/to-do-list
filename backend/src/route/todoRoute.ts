import express, { Router } from 'express'
import { getTodos, addTodo,updateTodo, deleteTodo } from '../controllers/todoController'

const router: Router = express.Router()

router.route('/todos').get(getTodos)

router.route('/add-todo').post(addTodo)

router.route('/edit-todo/:id').put(updateTodo)

router.route('/delete-todo/:id').delete(deleteTodo)

export default router