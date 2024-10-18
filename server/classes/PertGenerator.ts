import { Pert } from "./metamodel/Pert";
import { Task } from "./metamodel/Task";

class PertGenerator {
  pert: Pert;

  constructor(pert: Pert) {
    this.pert = pert;
  }

  // Generate DOT string
  generateDot(): string {
    let dot = "digraph PertDiagram {\n";
    this.pert.tasks.forEach((task: Task) => {
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

export { PertGenerator };
