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

// Create an Express app
const app = express();

// Parse JSON bodies
app.use(express.json());

// Enable CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Route to test the server
app.get("/api/v1", (req, res) => {
  res.send("Hello, World!");
});

// Route to test the PERT model
app.get("/api/v1/test/pert.svg", async (req, res) => {
  const pert = createPert(tasks);
  const dot = pert.generateDot();
  const stream = await toStream(dot, { format: "svg" });
  stream.pipe(res);
});

// Route to create a PERT diagram
app.post("/api/v1/pert.svg", async (req, res) => {
  const data = req.body;
  const pert = createPert(data);
  const dot = pert.generateDot();
  const stream = await toStream(dot, { format: "svg" });
  stream.pipe(res);
});

// Start the server
app.listen(port, host, () => {
  console.log(`Server is running at http://${host}:${port}`);
});
