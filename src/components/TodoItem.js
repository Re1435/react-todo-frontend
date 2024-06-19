import React from 'react'
import TickIcon from '../assets/tick.png'
import NotTickIcon from '../assets/not_tick.png'
import DeleteIcon from '../assets/delete.png'
import axios from 'axios'

const TodoItem = ({ text, taskStatus, taskId, fetchTodos }) => {
  const handleComplete = async (taskId, status) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/tasks/update-taskStatus/${taskId}`,
        {
          completed: status,
        }
      )
      fetchTodos()
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleDelete = async (taskId) => {
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/tasks/delete-task/${taskId}`
    )
    fetchTodos()
  }

  return (
    <div className="flex items-center my-3 gap-2">
      <div className="flex flex-1 items-center cursor-pointer">
        <img
          src={taskStatus ? TickIcon : NotTickIcon}
          alt="tick-icon"
          className="w-7"
        />
        <p
          className={`text-slate-700 ml-4 text-[17px] ${
            taskStatus ? 'line-through' : ''
          }`}
          onClick={() => handleComplete(taskId, !taskStatus)}
        >
          {text}
        </p>
      </div>
      <img
        src={DeleteIcon}
        alt="delete-icon"
        className="w-3.5 cursor-pointer"
        onClick={() => handleDelete(taskId)}
      />
    </div>
  )
}

export default TodoItem
