import GraphVertex from "./GraphVertex";

class NodeEdge{
    private weight: number;
    private startvertex: GraphVertex;
    private endvertex: GraphVertex;

    constructor(startvertex: GraphVertex, endvertex: GraphVertex, weight: number=1 ){
        this.weight = weight;
        this.startvertex = startvertex;
        this.endvertex = endvertex;
    }

    public getweight(){
        return this.weight;
    }

    public getend(){
        return this.endvertex;
    }

    public getstart(){
        return this.startvertex;
    }
}

export default NodeEdge;