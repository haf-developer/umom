class MapSquareData
{
    public basetext: string;
    public basepicture: string;
    public basemodifiers: any[];
    public activatedmodifiers: any[];

    private movecost: number;

    constructor(landtype: string){
    this.basetext = landtype;
    this.basepicture = landtype + ".png";
    this.movecost = TerrainMoves[landtype];
    }

    public requiredmoves(){
        return this.movecost;
    }
}

enum TerrainMoves{
    sea = 1,
    ground = 2,
    mountain = 6
}

enum TerrainTypes{
    Sea = "sea",
    Ground = "ground",
    Mountain = "mountain"
}

export {TerrainTypes, MapSquareData};
export default MapSquareData;