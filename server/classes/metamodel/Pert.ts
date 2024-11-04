import { Graph } from "../meta-metamodel/Graph";
import { Task } from "./Task";

class Pert extends Graph {
  tasks: Task[];

  constructor(tasks: Task[]) {
    super();
    this.tasks = tasks;
  }

  // Calculate earliest start (recursive)
  calculateEarliestStart(task: Task): number {
    if (task.predecessors.length === 0) {
      return 0;
    }
    let earliestStart = 0;
    task.predecessors.forEach((predecessor: Task) => {
      const start =
        this.calculateEarliestStart(predecessor) + predecessor.duration;
      if (start > earliestStart) {
        earliestStart = start;
      }
    });
    return earliestStart;
  }

  // Calculate earliest times
  calculateEarliestTimes(): void {
    this.tasks.forEach((task: Task) => {
      task.earliestStart = this.calculateEarliestStart(task);
      task.earliestEnd = task.earliestStart + task.duration;
    });
  }

  // Calculate latest times (recursive)
  calculateLatestStart(task: Task): number {
    if (task.successors.length === 0) {
      return task.earliestStart;
    }
    let latestStart = 999999;
    task.successors.forEach((successor: Task) => {
      const start = this.calculateLatestStart(successor) - successor.duration;
      if (start < latestStart) {
        latestStart = start;
      }
    });
    return latestStart;
  }

  // Calculate latest times
  calculateLatestTimes(): void {
    this.tasks.forEach((task: Task) => {
      task.latestEnd = this.calculateLatestStart(task);
      task.latestStart = task.latestEnd - task.duration;
    });
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
