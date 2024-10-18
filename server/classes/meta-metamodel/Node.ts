class Node {
    id: string;
    attributes: Map<string, any>;

    constructor(id: string) {
        this.id = id;
        this.attributes = new Map<string, any>();
    }
}

export { Node };