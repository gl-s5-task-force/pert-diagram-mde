import { useRef, useState } from "react";
import axios from "axios";

const api = "http://localhost:3000/api/v1/pert.svg";

function Table() {
  const [tasks, setTasks] = useState([
    // {
    //   ressource: "D",
    //   id: "1",
    //   name: "D1",
    //   duration: 1,
    //   predecessors: [],
    // },
    // {
    //   ressource: "D",
    //   id: "1",
    //   name: "D1",
    //   duration: 1,
    //   predecessors: [],
    // },
  ]);
  const [newTask, setNewTask] = useState({
    ressource: "",
    id: "",
    name: "",
    duration: 0,
    predecessors: [],
  });
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [pert, setPert] = useState(null);

  const inputRef = useRef(null);

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
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  // // Edit a task by index
  // const editTask = (index, field, value) => {
  //   const updatedTasks = [...tasks];
  //   updatedTasks[index][field] = value;
  //   setTasks(updatedTasks);
  // };

  const handleUploadChange = (e) => {
    const file = e.target.files[0];
    //it's a csv file containing the tasks, i want to extract the tasks from the file and put them in the table, meaning: set the tasks state to be the tasks extracted from the file
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      // eliminate first row (header)

      const tasks = text
        .split("\n")
        .slice(1)
        .map((line) => {
          const [ressource, id, name, duration, predecessors] = line.split(",");
          console.log(ressource, id, name, duration, predecessors);
          return {
            ressource,
            id,
            name,
            duration: parseInt(duration),
            predecessors: predecessors && predecessors.split(";").join(", "),
          };
        });
      console.log(tasks);
      setTasks(tasks);
    };
    reader.readAsText(file);
  };

  const submitTasks = async () => {
    try {
      const response = await axios.post(api, tasks);
      setPert(response.data);
    } catch (error) {
      console.error("Error submitting tasks:", error);
    }
  };

  const handleRef = () => {
    inputRef.current.click();
  };

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead className="thead">
          <tr className="tr-head">
            <th className="hc">Ressource</th>
            <th className="hc">ID</th>
            <th className="hc">Name</th>
            <th className="hc">Duration (hours)</th>
            <th className="hc">Predecessors (IDs)</th>
            <th className="hc">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index} className="">
              <td className="">{task.ressource}</td>
              <td className="border px-4 py-2">{task.id}</td>
              <td className="border px-4 py-2">{task.name}</td>
              <td className="border px-4 py-2">{task.duration}</td>
              <td className="border px-4 py-2">{task.predecessors}</td>
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
      <div className="button-wrapper">
        <button
          onClick={() => setShowNewTaskForm(true)}
          className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600"
        >
          New Task
        </button>
        <button
          onClick={handleRef}
          className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600"
        >
          upload CSV file
        </button>

        <input
          className="upload"
          type="file"
          ref={inputRef}
          // placeholder="Upload CSV file"
          onChange={handleUploadChange}
        />

        <button
          onClick={submitTasks}
          className="bg-green-500 text-white px-4 py-2 hover:bg-green-600"
        >
          Submit Tasks
        </button>
      </div>
      {pert && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-700">
            PERT Diagram
          </h2>
          <div dangerouslySetInnerHTML={{ __html: pert }} />
        </div>
      )}
    </div>
  );
}

export default Table;
