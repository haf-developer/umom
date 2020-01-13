import {IWeightData} from './algorithms/Graph';

class MapSquareData implements IWeightData
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

    public getweight(): number {
        return this.movecost;
        throw new Error("Method not implemented.");
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

function getfunction(x: () => number) {
    x();
}

export {TerrainTypes, MapSquareData, getfunction };
export default MapSquareData;