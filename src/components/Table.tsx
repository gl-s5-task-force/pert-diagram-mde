import React, { useState } from "react";
import axios from "axios";

interface Task {
  ressource: string;
  id: string;
  name: string;
  duration: number;
  predecessors: string[];
}

const Table: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<Task>({
    ressource: "",
    id: "",
    name: "",
    duration: 0,
    predecessors: [],
  });
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);

  // Add a new task
  const addTask = () => {
    if (newTask.ressource && newTask.id && newTask.name) {
      setTasks([...tasks, newTask]);
      setNewTask({
        ressource: "",
        id: "",
        name: "",
        duration: 0,
        predecessors: [],
      });
      setShowNewTaskForm(false); // Hide the form after adding a task
    }
  };

  // Delete a task by index
  const deleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  // Edit a task by index
  const editTask = (
    index: number,
    field: keyof Task,
    value: string | number
  ) => {
    const updatedTasks = [...tasks];
    updatedTasks[index][field] = value;
    setTasks(updatedTasks);
  };

  // Submit the tasks to the backend and log them to the console
  const submitTasks = async () => {
    try {
      console.log("Tasks to submit:", tasks); // Logs the tasks before sending them
      const response = await axios.post("http://localhost:3000/api/v1/", tasks);
      console.log("Response from server:", response.data);
    } catch (error) {
      console.error("Error submitting tasks:", error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-700">Task Management</h1>

      <table className="min-w-full table-auto border-collapse border border-gray-300 mb-4">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="border px-4 py-2 text-lg">Ressource</th>
            <th className="border px-4 py-2 text-lg">ID</th>
            <th className="border px-4 py-2 text-lg">Name</th>
            <th className="border px-4 py-2 text-lg">Duration (hours)</th>
            <th className="border px-4 py-2 text-lg">Predecessors (IDs)</th>
            <th className="border px-4 py-2 text-lg">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={task.ressource}
                  onChange={(e) => editTask(index, "ressource", e.target.value)}
                  className="w-full px-2 py-1"
                  disabled
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={task.id}
                  onChange={(e) => editTask(index, "id", e.target.value)}
                  className="w-full px-2 py-1"
                  disabled
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={task.name}
                  onChange={(e) => editTask(index, "name", e.target.value)}
                  className="w-full px-2 py-1"
                  disabled
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  value={task.duration}
                  onChange={(e) =>
                    editTask(index, "duration", parseInt(e.target.value))
                  }
                  className="w-full px-2 py-1"
                  disabled
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={task.predecessors.join(", ")}
                  onChange={(e) =>
                    editTask(index, "predecessors", e.target.value.split(", "))
                  }
                  className="w-full px-2 py-1"
                  disabled
                />
              </td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => deleteTask(index)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {/* Conditionally render the new task form */}
          {showNewTaskForm && (
            <tr className="bg-gray-50">
              <td className="border px-4 py-2 w-1/6">
                <input
                  type="text"
                  placeholder="Ressource"
                  value={newTask.ressource}
                  onChange={(e) =>
                    setNewTask({ ...newTask, ressource: e.target.value })
                  }
                  className="w-full px-2 py-1"
                />
              </td>
              <td className="border px-4 py-2 w-1/6">
                <input
                  type="text"
                  placeholder="ID"
                  value={newTask.id}
                  onChange={(e) =>
                    setNewTask({ ...newTask, id: e.target.value })
                  }
                  className="w-full px-2 py-1"
                />
              </td>
              <td className="border px-4 py-2 w-2/6">
                <input
                  type="text"
                  placeholder="Name"
                  value={newTask.name}
                  onChange={(e) =>
                    setNewTask({ ...newTask, name: e.target.value })
                  }
                  className="w-full px-2 py-1"
                />
              </td>
              <td className="border px-4 py-2 w-1/6">
                <input
                  type="number"
                  placeholder="Duration"
                  value={newTask.duration}
                  onChange={(e) =>
                    setNewTask({
                      ...newTask,
                      duration: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-2 py-1"
                />
              </td>
              <td className="border px-4 py-2 w-2/6">
                <input
                  type="text"
                  placeholder="Predecessors (IDs)"
                  value={newTask.predecessors.join(", ")}
                  onChange={(e) =>
                    setNewTask({
                      ...newTask,
                      predecessors: e.target.value.split(", "),
                    })
                  }
                  className="w-full px-2 py-1"
                />
              </td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={addTask}
                  className="bg-green-500 text-white px-4 py-2 hover:bg-green-600"
                >
                  Add
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => setShowNewTaskForm(true)}
          className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600"
        >
          New Task
        </button>

        <button
          onClick={submitTasks}
          className="bg-green-500 text-white px-4 py-2 hover:bg-green-600"
        >
          Submit Tasks
        </button>
      </div>
    </div>
  );
};

export default Table;
