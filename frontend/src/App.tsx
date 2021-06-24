import React, { FC, ChangeEvent, useState } from 'react';
import './App.css';
import { ITask } from './Interfaces'
import TodoTask from './Components/TodoTask'

const App: FC = () => {

  const [employee, setEmployee] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mobile, setMobile] = useState<number>(0);
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "employee") {
      setEmployee(event.target.value)
    } else if (event.target.name === "email") {
      setEmail(event.target.value)
    } else if (event.target.name === "mobile") {
      setMobile(Number(event.target.value))
    } else if (event.target.name === "task") {
      setTask(event.target.value)
    } else if (event.target.name === "deadline") {
      setDeadline(Number(event.target.value))
    }
  }
  const addTask = (): void => {
    const newTask = { employee: employee, email: email, mobile: mobile, taskName: task, deadline: deadline, }
    setTodoList([...todoList, newTask])
    setEmployee("")
    setEmail("")
    setMobile(0)
    setTask("")
    setDeadline(0)
  }

  const completeTask = (taskNameToDelete: string): void => {
    setTodoList(todoList.filter((task) => {
      return task.taskName !== taskNameToDelete
    }))

  }

  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Name of the Employee"
            name="employee"
            value={employee}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Email of the Employee"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Mobile No."
            name="mobile"
            value={mobile}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Task..."
            name="task"
            value={task}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Deadline (in Days)..."
            name="deadline"
            value={deadline}
            onChange={handleChange}
          />
        </div>
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="todoList">
        {todoList.map((task: ITask, key: number) => {
          return <TodoTask key={key} task={task} completeTask={completeTask} />
        })}
      </div>
    </div>
  );
}

export default App;
