import { Node } from "./Node";
import { Edge } from "./Edge";

class Graph {
    nodes: Node[];
    edges: Edge[];

    constructor() {
        this.nodes = [];
        this.edges = [];
    }

    addNode(node: Node) {
        this.nodes.push(node);
    }

    addEdge(edge: Edge) {
        this.edges.push(edge);
    }
}

export { Graph };