import React, { useEffect, useState } from 'react'
import TodoIcon from '../assets/todo_icon.png'
import TodoItem from './TodoItem'
import axios from 'axios'
import jsPDF from 'jspdf'

const Todo = () => {
  const [task, setTask] = useState('')
  const [todoList, setTodoList] = useState([])

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/tasks/get-tasks`
    )
    setTodoList(response.data)
  }

  const addTask = async (e) => {
    e.preventDefault()

    if (task.trim() === '') {
      alert('input field should not be empty')
      setTask('')
    } else {
      await axios.post(`${process.env.REACT_APP_API_URL}/tasks/add-task`, {
        text: task,
      })
      setTask('')
      fetchTodos()
    }
  }

  const downloadPDF = async () => {
    try {
      // Fetch the latest tasks from the server
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/tasks/get-tasks`
      )
      const tasks = response.data

      // Generate the PDF with the fetched tasks
      const doc = new jsPDF()
      doc.text('To-Do List', 10, 10)
      tasks.forEach((todo, index) => {
        doc.text(
          `${index + 1}. ${todo.text} - ${
            todo.completed ? 'Completed' : 'Incomplete'
          }`,
          10,
          20 + index * 10
        )
      })

      // Save the PDF to the server
      const pdfBlob = doc.output('blob')
      const formData = new FormData()
      formData.append('file', pdfBlob, 'todo-list.pdf')

      const uploadResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      const fileID = uploadResponse.data.fileID
      console.log('PDF saved on server with ID:', fileID)

      // After successful upload, download the file
      const downloadResponse = await axios({
        url: `${process.env.REACT_APP_API_URL}/file/${fileID}`,
        method: 'GET',
        responseType: 'blob', // Important
      })

      const url = window.URL.createObjectURL(new Blob([downloadResponse.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'todo-list.pdf')
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
    } catch (error) {
      console.error('Error downloading PDF:', error)
    }
  }

  return (
    <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl">
      <div className="flex items-center mt-7 gap-2">
        <img src={TodoIcon} alt="todo-icon" className="w-8" />
        <h1 className="text-3xl font-semibold">Todo List</h1>
      </div>
      <div className="flex items-center my-7 bg-gray-200 rounded-full">
        <input
          type="text"
          placeholder="Add your task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
        />
        <button
          onClick={addTask}
          type="submit"
          className="border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer"
        >
          ADD
        </button>
      </div>
      <button
        onClick={downloadPDF}
        className="mb-4 bg-blue-500 text-white p-2 rounded"
      >
        Download PDF
      </button>
      <div>
        {todoList.map((todo) => (
          <TodoItem
            text={todo.text}
            taskStatus={todo.completed}
            taskId={todo._id}
            fetchTodos={fetchTodos}
            key={todo._id}
          />
        ))}
      </div>
    </div>
  )
}

export default Todo
