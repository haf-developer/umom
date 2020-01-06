import{
    MapSquareData,
    TerrainTypes
 } from "src/MapSquareData";

class GameData{
  // Required to be positive
  public planes: number;
  public mapwidth: number;
  public mapheigth: number;
  private planemap: MapSquareData[][];

  constructor(){
    this.planes=1;
    this.mapwidth=20;
    this.mapheigth=20;
    this.generatemap(this.mapwidth, this.mapheigth);
  }

  public getMap():MapSquareData[][]{
    return this.planemap;
  }

  private generatemap(mapwidth: number, mapheight: number) {
  // alert("gd1x=" + this.mapwidth + " gd1y=" + this.mapheigth );

    this.planemap = new Array<[MapSquareData]>();
    for(let ih = 0; ih < mapheight;ih++){
      const planemaprow = new Array<MapSquareData>();
      for(let iw = 0;iw < mapwidth;iw++){
        const terraintypekey = Object.keys(TerrainTypes)[Math.floor(
          Math.random() * Object.keys(TerrainTypes).length )];
        const newmapdata = new MapSquareData(
          TerrainTypes[terraintypekey]);
        planemaprow.push(newmapdata);
      }
      this.planemap.push(planemaprow);
    }
  }
}

export default GameData;