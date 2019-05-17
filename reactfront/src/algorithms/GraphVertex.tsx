import DataNode from "./DataNode";

class GraphVertex extends DataNode{

    private neighbors: GraphVertex[];

    constructor(location: number[]){
        super(location);
    }

    public getneighbors(){
        return this.neighbors;
    }
}

export default GraphVertex;