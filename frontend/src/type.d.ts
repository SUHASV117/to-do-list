interface ITodo {
    _id: string;
    name: string;
    task: string;
    email:string;
    mobile: number;
    status: boolean;
    createdAt?: string;
    updatedAt?: string;
  }
  
  interface TodoProps {
    todo: ITodo;
  }
  
  type ApiDataType = {
    message: string;
    status: string;
    todos: ITodo[];
    todo?: ITodo;
  };
  