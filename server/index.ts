import fs from "fs";
import express from "express";
// import cors from "cors";
import { Task } from "./classes/metamodel/Task";
import { Pert } from "./classes/metamodel/Pert";

const port = 3000;
const host = "localhost";

// Sample tasks
const tasks = [
  {
    id: "G1",
    name: "Task G1",
    duration: 3,
    resource: "G",
    predecessors: [],
  },
  {
    id: "G2",
    name: "Task G2",
    duration: 2,
    resource: "G",
    predecessors: ["G1"],
  },
  {
    id: "G3",
    name: "Task G3",
    duration: 4,
    resource: "G",
    predecessors: ["G1"],
  },
  {
    id: "G4",
    name: "Task G4",
    duration: 2,
    resource: "G",
    predecessors: ["G2"],
  },
  {
    id: "G5",
    name: "Task G5",
    duration: 3,
    resource: "G",
    predecessors: ["G3"],
  },
  {
    id: "G6",
    name: "Task G6",
    duration: 2,
    resource: "G",
    predecessors: ["G4", "G5"],
  },
  {
    id: "G7",
    name: "Task G7",
    duration: 3,
    resource: "G",
    predecessors: ["G6"],
  },
  {
    id: "G8",
    name: "Task G8",
    duration: 2,
    resource: "G",
    predecessors: ["G6"],
  },
  { id: "H1", name: "Task H1", duration: 3, resource: "H", predecessors: [] },
  {
    id: "H2",
    name: "Task H2",
    duration: 2,
    resource: "H",
    predecessors: ["H1"],
  },
  {
    id: "H3",
    name: "Task H3",
    duration: 4,
    resource: "H",
    predecessors: ["H1"],
  },
  {
    id: "H4",
    name: "Task H4",
    duration: 2,
    resource: "H",
    predecessors: ["H2"],
  },
  {
    id: "H5",
    name: "Task H5",
    duration: 3,
    resource: "H",
    predecessors: ["H3"],
  },
  {
    id: "H6",
    name: "Task H6",
    duration: 2,
    resource: "H",
    predecessors: ["H4", "H5"],
  },
  { id: "C1", name: "Task C1", duration: 3, resource: "C", predecessors: [] },
  {
    id: "C2",
    name: "Task C2",
    duration: 2,
    resource: "C",
    predecessors: ["C1"],
  },
  {
    id: "C3",
    name: "Task C3",
    duration: 4,
    resource: "C",
    predecessors: ["C1"],
  },
  {
    id: "C4",
    name: "Task C4",
    duration: 2,
    resource: "C",
    predecessors: ["C2"],
  },
  {
    id: "C5",
    name: "Task C5",
    duration: 3,
    resource: "C",
    predecessors: ["C3"],
  },
];

function createPert(tasks: any): Pert {
  const pertTasks: Task[] = [];

  tasks.forEach((task: any) => {
    const pertTask = new Task(task.id, task.name, task.duration, task.resource);
    pertTasks.push(pertTask);
  });

  tasks.forEach((task: any) => {
    const pertTask = pertTasks.find((t) => t.id === task.id);
    task.predecessors.forEach((predecessorId: any) => {
      const predecessor = pertTasks.find((t) => t.id === predecessorId);
      pertTask!.addPredecessor(predecessor!);
    });
  });

  return new Pert(pertTasks);
}

const app = express();
// app.use(cors());

app.get("/api/v1", (req, res) => {
  res.send("Hello, World!");
});

app.post("/api/v1/pert.dot", (req, res) => {
  const tasks = req.body.tasks;
  const pert = createPert(tasks);
  const dot = pert.generateDot();
  fs.writeFileSync("pert.dot", dot);
  res.send(dot);
});

app.listen(port, host, () => {
  console.log(`Server is running at http://${host}:${port}`);
});
