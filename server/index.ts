console.time('process');
const { performance } = require('perf_hooks'); // For high-resolution timing

// Start the timer
const start = performance.now();

import express from "express";
import { toStream } from "@ts-graphviz/adapter";
import { Task } from "./classes/metamodel/Task";
import { Pert } from "./classes/metamodel/Pert";
import { tasks } from "./data/tasks";

const PORT = 8080;
const HOST = "0.0.0.0";


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
app.get("/", (req, res) => {
  res.send("Hello, Docker!");
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
  if (data != null) {
    try {
      // Create PERT diagram
      const pert = createPert(data);
      const dot = pert.generateDot();

      // Convert DOT to SVG stream
      const stream = await toStream(dot, { format: "svg" });
      // Set the appropriate content-type for SVG
      res.setHeader("Content-Type", "image/svg+xml");

      // Pipe the stream to the response
      stream.pipe(res);
    } catch (error) {
      // Handle errors gracefully
      res.status(500).send({ error: "Internal Server Error: Could not generate PERT diagram." });
    }
  } else {
    // Handle missing data
    res.status(400).send({ error: "Bad Request: No data provided." });
  }
});

// Start the server
app.listen(PORT, HOST, () => {
  const elapsed = performance.now() - start; // Calculate the elapsed time
    
  console.log(
    `\n  \x1b[1m\x1b[35mPERT\x1b[0m \x1b[35mDiagram Server\x1b[0m ready in \x1b[1m${Math.trunc(elapsed)}\x1b[0m ms `
  );
  console.log(
    `\n  \x1b[35m➜\x1b[0m  \x1b[1mLocal\x1b[0m:   \x1b[36mhttp://localhost:${PORT}/api/v1/\x1b[0m`
  );
});
