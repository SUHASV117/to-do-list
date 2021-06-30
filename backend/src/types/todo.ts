import { Document } from "mongoose";

export interface ITodo extends Document {
    name: string,
    task: string,
    email:string,
    mobile: number,
    status: boolean
}