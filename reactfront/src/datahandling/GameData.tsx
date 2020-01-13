import{
    MapSquareData,
    TerrainTypes
 } from "src/MapSquareData";

class GameData{
  // Required to be positive
  public planes: number=1;
  public mapwidth: number=20;
  public mapheigth: number=20;
  private planemap: MapSquareData[][];

  constructor(){
    this.generatemap(this.mapwidth, this.mapheigth);
  }

  public getMap():MapSquareData[][]{
    return this.planemap;
  }

  private generatemap(mapwidth: number, mapheight: number) {
  // alert("gd1x=" + this.mapwidth + " gd1y=" + this.mapheigth );
    this.planemap=Array(mapheight).fill([MapSquareData]).map(()=>{
      return(
        Array(mapwidth).fill(Object.keys(TerrainTypes).length).map((data)=>
        data=new MapSquareData(
          TerrainTypes[Object.keys(TerrainTypes)[Math.floor(Math.random() * data )]])
        )
      );}
    );
  }
}

export default GameData;