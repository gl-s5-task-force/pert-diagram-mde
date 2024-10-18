import { Edge } from "../meta-metamodel/Edge";
import { Graph } from "../meta-metamodel/Graph";
import { Task } from "./Task";

class Pert extends Graph {
    tasks: Task[];

    constructor() {
        super();
        this.tasks = [];
    }

    addTask(task: Task) {
        this.tasks.push(task);
        super.addNode(task);
    }

    addDependency(predecessor: Task, successor: Task) {
        predecessor.addSuccessor(successor);
        successor.addPredecessor(predecessor);
        const edge = new Edge(predecessor, successor);
        super.addEdge(edge);
    }
}

export { Pert };