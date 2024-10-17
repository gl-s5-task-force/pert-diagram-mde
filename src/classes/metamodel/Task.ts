import { Node } from "../meta-metamodel/Node";

class Task extends Node {
    name: string;
    duration: number;
    startTime: number;
    endTime: number;
    predecessors: Task[];
    successors: Task[];

    constructor(id: string, name: string, duration: number) {
        super(id);
        this.name = name;
        this.duration = duration;
        this.startTime = 0;
        this.endTime = 0;
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