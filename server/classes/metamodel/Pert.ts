import { Edge } from "../meta-metamodel/Edge";
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

  // Generate DOT string
  generateDot(): string {
    let dot = "digraph PertDiagram {\n";
    this.tasks.forEach((task: Task) => {
      dot += `"${task.id}" [label="${task.name}\\nDuration: ${task.duration}\\nEarliest Start: ${task.earliestStart}\\nLatest End: ${task.latestEnd}"];\n`;

      if (task.successors) {
        task.successors.forEach((successor: Task) => {
          dot += `"${task.id}" -> "${successor}";\n`;
        });
      }
    });
    dot += "}\n";
    return dot;
  }
}

export { Pert };
