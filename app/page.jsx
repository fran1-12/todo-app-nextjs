/**
 * v0 by Vercel.
 * @see https://v0.dev/t/nc2sEx41Vpf
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState, useEffect } from "react"

export default function Component() {
  const [tasks, setTasks] = useState([])

  const [sortedTasks, setSortedTasks] = useState(tasks)

  useEffect(() => {
    const sortedTasks = tasks.sort((a, b) => {
      const aScore = calculateTaskScore(a)
      const bScore = calculateTaskScore(b)
      return bScore - aScore
    })
    setSortedTasks(sortedTasks)
  }, [tasks])

  const calculateTaskScore = (task) => {
    let score = 0
    if (task.priority === "alta") {
      score += 5
    } else if (task.priority === "media") {
      score += 3
    } else {
      score += 1
    }
    if (task.context.timeAvailable >= task.description.length * 2) {
      score += 3
    }
    if (task.context.mood === "productivo") {
      score += 2
    } else if (task.context.mood === "energético") {
      score += 1
    }
    if (task.context.previousCompletedTasks.length > 0) {
      score += 1
    }
    return score
  }

  const addTask = (task) => {
    setTasks([...tasks, task])
  }

  const markTaskAsCompleted = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: true }
      }
      return task
    })
    setTasks(updatedTasks)
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-blue-500 text-white p-4">
        <h1 className="text-2xl font-bold">ToDo App</h1>
      </header>
      <main className="flex-1 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Tareas</h2>
          <ul className="space-y-4">
            {sortedTasks.map((task) => (
              <li key={task.id} className={`bg-white p-4 rounded-lg shadow-md ${task.completed ? "opacity-50" : ""}`}>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-bold">{task.title}</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      task.priority === "alta"
                        ? "bg-red-500 text-white"
                        : task.priority === "media"
                        ? "bg-yellow-500 text-white"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{task.description}</p>
                <div className="flex justify-between items-center">
                  <p className="text-gray-500">Vence el {task.dueDate}</p>
                  {!task.completed && (
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                      onClick={() => markTaskAsCompleted(task.id)}
                    >
                      Marcar como completada
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Nueva Tarea</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const newTask = {
                id: tasks.length + 1,
                title: e.target.title.value,
                description: e.target.description.value,
                priority: e.target.priority.value,
                completed: false,
                dueDate: e.target.dueDate.value,
                context: {
                  timeAvailable: parseInt(e.target.timeAvailable.value),
                  mood: e.target.mood.value,
                  previousCompletedTasks: [],
                },
              }
              addTask(newTask)
              e.target.reset()
            }}
            className="bg-white p-4 rounded-lg shadow-md"
          >
            <div className="mb-4">
              <label htmlFor="title" className="block font-bold mb-2">
                Título
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="border border-gray-300 p-2 rounded-lg w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block font-bold mb-2">
                Descripción
              </label>
              <textarea
                id="description"
                name="description"
                className="border border-gray-300 p-2 rounded-lg w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="priority" className="block font-bold mb-2">
                Prioridad
              </label>
              <select id="priority" name="priority" className="border border-gray-300 p-2 rounded-lg w-full" required>
                <option value="alta">Alta</option>
                <option value="media">Media</option>
                <option value="baja">Baja</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="dueDate" className="block font-bold mb-2">
                Fecha de vencimiento
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                className="border border-gray-300 p-2 rounded-lg w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="timeAvailable" className="block font-bold mb-2">
                Tiempo disponible (minutos)
              </label>
              <input
                type="number"
                id="timeAvailable"
                name="timeAvailable"
                className="border border-gray-300 p-2 rounded-lg w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="mood" className="block font-bold mb-2">
                Estado de ánimo
              </label>
              <select id="mood" name="mood" className="border border-gray-300 p-2 rounded-lg w-full" required>
                <option value="productivo">Productivo</option>
                <option value="energético">Energético</option>
                <option value="relajado">Relajado</option>
              </select>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Agregar Tarea
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
