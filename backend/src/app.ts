import { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors'
import mongoose from 'mongoose';
import express,{Express} from 'express'
import todoRoute from './route/todoRoute'

const app:Express = express();
const PORT: number = 4000

app.use(cors())
app.use(todoRoute)

const uri: string = `mongodb+srv://v2473516799s:v2473516799s@suhasv.5mybd.mongodb.net/Typescript?retryWrites=true&w=majority`
const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.set("useFindAndModify", false)

mongoose
  .connect(uri, options)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on ${PORT} and Mongodb connected`)
    )
  )
  .catch(error => {
    throw error
  })


/*  
app.get('/',(req:Request,res:Response, next:NextFunction) => {
    res.send('Hello');
});

*/
