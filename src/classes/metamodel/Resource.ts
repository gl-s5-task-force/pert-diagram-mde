import { Task } from "./Task";

class Resource {
    name: string;
    tasks: Task[];

    constructor(name: string) {
        this.name = name;
        this.tasks = [];
    }

    addTask(task: Task) {
        this.tasks.push(task);
    }
}

export { Resource };