class DataNode{

    private data: any;

    constructor(data: any){
        this.data = data;
    }

    public getnodedata(){
        return this.data;
    }
}

export default DataNode;