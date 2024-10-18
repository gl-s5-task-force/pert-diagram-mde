import { Graph } from "../meta-metamodel/Graph";
import { Task } from "./Task";

class Pert extends Graph {
  tasks: Task[];

  constructor(
    tasks: Task[],
  ) {
    super();
    this.tasks = tasks;
  }

  // Calculate earliest start and end times
  calculateEarliestTimes(): void {
    this.tasks.forEach((task: Task) => {
      if (task.predecessors.length === 0) {
        task.earliestStart = 0;
        task.earliestEnd = task.duration;
      } else {
        task.earliestStart = 0; // TODO: calculate earliest start time
        task.earliestEnd = task.earliestStart + task.duration;
      }
    });
  }

  // Calculate latest start and end times
  calculateLatestTimes(): void {
    const lastTask = this.tasks[this.tasks.length - 1];
    lastTask.latestEnd = lastTask.earliestEnd;
    lastTask.latestStart = lastTask.latestEnd - lastTask.duration;

    for (let i = this.tasks.length - 2; i >= 0; i--) {
      const task = this.tasks[i];
      task.latestEnd = task.earliestEnd; // TODO: calculate latest end time
      task.latestStart = task.latestEnd - task.duration;
    }
  }

  // Generate DOT string
  generateDot(): string {
    let dot = "digraph PertDiagram {\n";
    this.tasks.forEach((task: Task) => {
      dot += `  "${task.id}" [shape=rect, style=filled, fillcolor=lightblue, label=<<table border="0" cellborder="1" cellspacing="0"><tr><td>${task.id} (${task.duration})</td><td>${task.earliestStart}, ${task.earliestEnd}</td></tr></table>>];\n`;

      if (task.successors) {
        task.successors.forEach((successor: Task) => {
          dot += `"${task.id}" -> "${successor.id}";\n`;
        });
      }
    });
    dot += "}\n";
    return dot;
  }
}

export { Pert };
