import { Node } from "./Node";

class Edge {
    source: Node;
    target: Node;
    attributes: Map<string, any>;

    constructor(source: Node, target: Node) {
        this.source = source;
        this.target = target;
        this.attributes = new Map<string, any>();
    }
}

export { Edge };