import express, { Application, Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import todoRoutes from "./routes";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";


dotenv.config();
const app: Express = express();
const PORT: number = 4000;

app.use(cors());
app.use(todoRoutes);

//const uri: string = "mongo"
const uri: string = "mongodb://mongo:27017"
// const uri: string = "mongodb+srv://v2473516799s:v2473516799s@suhasv.5mybd.mongodb.net/Typescript?retryWrites=true&w=majority"

const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.set("useFindAndModify", false);

mongoose
  .connect(uri, options)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(error));
