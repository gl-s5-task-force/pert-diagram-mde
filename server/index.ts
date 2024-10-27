import express from "express";
import { toStream } from "@ts-graphviz/adapter";
import { Task } from "./classes/metamodel/Task";
import { Pert } from "./classes/metamodel/Pert";
import { tasks } from "./data/tasks";

const port = 3000;
const host = "localhost";

function createPert(data: any): Pert {
  // Initialize tasks
  const pertTasks: Task[] = [];

  // Create tasks
  data.forEach((task: any) => {
    const pertTask = new Task(task.id, task.name, task.duration, task.resource);
    pertTasks.push(pertTask);
  });

  // Add predecessors
  data.forEach((task: any) => {
    const pertTask = pertTasks.find((t) => t.id === task.id);
    task.predecessors.forEach((predecessorId: any) => {
      const predecessor = pertTasks.find((t) => t.id === predecessorId);
      pertTask!.addPredecessor(predecessor!);
    });
  });

  // Add successors
  pertTasks.forEach((task: Task) => {
    task.predecessors.forEach((predecessor: Task) => {
      predecessor.addSuccessor(task);
    });
  });

  // Create PERT model
  const pert = new Pert(pertTasks);

  // Calculate earliest and latest times
  pert.calculateEarliestTimes();
  pert.calculateLatestTimes();

  return pert;
}

const app = express();

app.get("/api/v1", (req, res) => {
  res.send("Hello, World!");
});

// generate SVG from DOT
app.get("/api/v1/pert.svg", async (req, res) => {
  // Create PERT model
  const pert = createPert(tasks);

  // Generate DOT string
  const dot = pert.generateDot();

  // Generate SVG from DOT
  const stream = await toStream(dot, { format: "svg" });

  // Send SVG to client
  stream.pipe(res);
});

app.listen(port, host, () => {
  console.log(`Server is running at http://${host}:${port}`);
});
