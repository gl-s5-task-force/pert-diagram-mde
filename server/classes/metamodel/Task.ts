import { Node } from "../meta-metamodel/Node";

class Task extends Node {
    name: string;
    duration: number;
    earliestStart: number;
    earliestEnd: number;
    latestStart: number;
    latestEnd: number;
    resource: string;
    predecessors: Task[];
    successors: Task[];

    constructor(id: string, name: string, duration: number, resource: string) {
        super(id);
        this.name = name;
        this.duration = duration;
        this.earliestStart = 0;
        this.earliestEnd = 0;
        this.latestStart = 0;
        this.latestEnd = 0;
        this.resource = resource;
        this.predecessors = [];
        this.successors = [];
    }

    addPredecessor(task: Task) {
        this.predecessors.push(task);
    }

    addSuccessor(task: Task) {
        this.successors.push(task);
    }
}

export { Task };