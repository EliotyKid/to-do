"use client"
import { useState, useEffect } from "react";

interface Todo {
    id: number
    text: string
    completed : boolean
}

const TodoList = () => {
    const [todos, setTodos] = useState<Todo[]>(() => {
        const savedTodos = localStorage.getItem('todos')
        return savedTodos ? JSON.parse(savedTodos) : []
    })
    const [task, setTask] = useState('')

    const addTodo = () => {
        if (task.trim() === '') return
        const newTodo: Todo = {
            id: Date.now(),
            text: task,
            completed: false
        }
        setTodos([...todos, newTodo])
        setTask('')
    }

    const removeTodo = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id))
    }

    const toggleCompletion = (id: number) => {
        setTodos(
            todos.map((todo) => todo.id == id ? {...todo, completed: !todo.completed} : todo)
        )
    }

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    return(
        <div className="max-w-lg mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Todo list</h2>
            <input 
                type="text" 
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="border p-2 w-full mb-4 "
                placeholder="Add a new task"
            />
            <button
                onClick={addTodo}
                className="bg-blue-500 text-white py-2 px-4 rounded"
            >
                Add task
            </button>

            <ul className="mt-4">
                {todos.map((todo) => (
                    <li
                        key = {todo.id}
                        className={`flex justify-between items-center p-2 ${todo.completed ? 'bg-green-100 line-through' : 'bg-white'} border-b`}
                    >
                        <span
                            className="cursor-pointer"
                            onClick={() => toggleCompletion(todo.id)}
                        >
                            {todo.text}
                        </span>

                        <button
                            className="bg-red-500 text-white py-1 px-2 rounded"
                            onClick={() => removeTodo(todo.id)}
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>

        </div>
    )
}

export default TodoList