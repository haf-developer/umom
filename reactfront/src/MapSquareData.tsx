class MapSquareData
{
    public basetext: string;
    public basepicture: string;

    constructor(landtype: string){
    this.basetext = landtype;
    }
    /*
    public basemodifiers: [];
    public activatedmodifiers: [];
    */
}

export default MapSquareData;