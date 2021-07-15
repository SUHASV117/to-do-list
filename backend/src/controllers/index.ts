import { Response, Request } from "express";
import { ITodo } from "../types/todo";
import Todo from "../models/todo";
import { Twilio } from "twilio";
import "dotenv/config";

const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("get")
    const todos: ITodo[] = await Todo.find();
    res.status(200).json({ todos });
  } catch (error) {
    console.log(error);
  }
};

const addTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("add")
    const body = req.body as Pick<ITodo, "name" | "task" | "email" | "mobile" | "status">;
    const todo: ITodo = new Todo({
      name: body.name,
      task: body.task,
      email: body.email,
      mobile:body.mobile,
      status: body.status,
    });
    const newTodo: ITodo = await todo.save();
    const allTodos: ITodo[] = await Todo.find();
     
 
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioNumber = process.env.TWILIO_PHONE_NUMBER;
    const myNumber = req.body.mobile;
    
    if (accountSid && authToken && myNumber && twilioNumber) {
      const client = new Twilio(accountSid, authToken);
    
      client.messages
        .create({
          from: twilioNumber,
          to: myNumber,
          body: `You have been alloted the task ${req.body.task}`
        })
        .then((message) => console.log(message.sid));
    } else {
      console.error(
        "You are missing one of the variables you need to send a message"
      );
    }
   
    
    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: {
            user: 'vsuhasv@gmail.com',
            pass: 'v2473516799s2'
        }
    });
    const mailOptions = {
      from: 'vsuhasv@gmail.com', // sender address
      to: req.body.email, // list of receivers
      subject: 'Task information', // Subject line
      html: `The task allocated to you is ${req.body.task}`
    };
    transporter.sendMail(mailOptions, function (err:any, info:any) {
       if(err)
         console.log(err)
       else
         console.log(info);
    });


    res
      .status(201)
      .json({ message: "Todo added", todo: newTodo, todos: allTodos });
  } catch (error) {
    throw error;
  }
};


const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("update")
    const {
      params: { id },
      body,
    } = req;
    const updateTodo: ITodo | null = await Todo.findByIdAndUpdate(
      { _id: id },
      body
    );
    const allTodos: ITodo[] = await Todo.find();
    res.status(200).json({
      message: "Todo updated",
      todo: updateTodo,
      todos: allTodos,
    });
  } catch (error) {
    throw error;
  }
};

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("delete")
    const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(
      req.params.id
    );
    const allTodos: ITodo[] = await Todo.find();
    res.status(200).json({
      message: "Todo deleted",
      todo: deletedTodo,
      todos: allTodos,
    });
  } catch (error) {
    throw error;
  }
};

export { getTodos, addTodo, updateTodo, deleteTodo };
