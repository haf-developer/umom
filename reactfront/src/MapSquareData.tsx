class MapSquareData
{
    public basetext: string;
    public basepicture: string;

    constructor(landtype: string){
    this.basetext = landtype;
    this.basepicture = landtype + ".png";
    }
    /*
    public basemodifiers: [];
    public activatedmodifiers: [];
    */
}

enum TerrainTypes{
    Sea = "sea",
    Ground = "ground",
    Mountain = "mountain"
}

export {TerrainTypes, MapSquareData};
export default MapSquareData;