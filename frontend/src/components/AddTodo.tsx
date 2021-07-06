import React, { useState } from 'react'

type Props = { 
  saveTodo: (e: React.FormEvent, formData: ITodo | any) => void 
}

const AddTodo: React.FC<Props> = ({ saveTodo }) => {
  const [formData, setFormData] = useState<ITodo | {}>()

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    })
  }

  return (
    <form className='Form' onSubmit={(e) => saveTodo(e, formData)}>
      <div>
        <div>
          <label htmlFor='name'>Name</label>
          <input onChange={handleForm} type='text' id='name' />
        </div>
        <div>
          <label htmlFor='task'>Task</label>
          <input onChange={handleForm} type='text' id='task' />
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input onChange={handleForm} type='text' id='email' />
        </div>
        <div>
          <label htmlFor='mobile'>Mobile</label>
          <input onChange={handleForm} type='text' id='mobile' />
        </div>
      </div>
      <button disabled={formData === undefined ? true: false}>Add Todo</button>
    </form>
  )
}

export default AddTodo