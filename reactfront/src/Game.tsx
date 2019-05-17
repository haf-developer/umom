import * as React from 'react';

import { isNumber } from 'util';
import {shortestpath} from './algorithms/Graph';
import LinkedList from './algorithms/LinkedList';
import GameState from './GameState';
import * as MapSquareData from './MapSquareData';
import Square from './Square';



class Game extends React.Component{

  public static plane: number = 0;
  public static gameref: Game;
  protected static mapviewy: number = 0;
  private static mapviewx = 0;
  
  public props: {
    plane: number;
  }

  public state: {
    mapposition: GameState;
  }

  public static get mapViewX() {
    return Game.mapviewx;
  }
  public static set mapViewX(value) {
    Game.mapviewx = value;
  }

  private planemap: MapSquareData.MapSquareData[][];

  constructor(plane: number = 0){
      super(plane);
      Game.plane = plane;
      const gamestate = new GameState();

      this.setState(
      this.state = {
        mapposition: gamestate
      });
      Game.gameref = this;
      this.generatemap(gamestate.mapwidth, gamestate.mapheigth);
  }

  public changestete(event: any ){
    Game.mapviewy++;
  }

  public movetoPosition( xlocation: number, ylocation: number)
{
  // alert( "New x=" + xlocation + ", new y=" + ylocation );
  const mapviewstate = Game.gameref.state.mapposition;
  const nexxlocation = xlocation - Math.floor(mapviewstate.mapviewwidth/2);
  const newylocation = ylocation - Math.floor(mapviewstate.mapviewheigth/2);
  mapviewstate.mapviewx = mapviewstate.mapviewx + nexxlocation;
  mapviewstate.mapviewy = mapviewstate.mapviewy + newylocation;
  if(mapviewstate.mapviewx < 0){
    mapviewstate.mapviewx = mapviewstate.mapviewx + mapviewstate.mapwidth;
  }else if(mapviewstate.mapviewx >= mapviewstate.mapwidth){
    mapviewstate.mapviewx = mapviewstate.mapviewx - mapviewstate.mapwidth;
  }

  if(mapviewstate.mapviewy < 0){
    mapviewstate.mapviewy = mapviewstate.mapviewy + mapviewstate.mapheigth;
  }else if(mapviewstate.mapviewy >= mapviewstate.mapheigth){
    mapviewstate.mapviewy = mapviewstate.mapviewy - mapviewstate.mapheigth;
  }
  Game.gameref.setState(
    Game.gameref.state = {
      mapposition: mapviewstate,
    }
  );
}

public render(){
    Game.mapviewx = this.state.mapposition.mapviewx;
    Game.mapviewy = this.state.mapposition.mapviewy;

    const childstatechange = this.movetoPosition;
    const visibleMapViewWidth = this.state.mapposition.mapviewwidth;
    const visibleMapViewHeight = this.state.mapposition.mapviewheigth;
    const rows = [];
    for (let i = 0; i < visibleMapViewHeight; i++) {
      const datacolums = [];
      let mappointy = i + Game.mapviewy;
      if(mappointy >= this.state.mapposition.mapheigth){
        mappointy = mappointy - this.state.mapposition.mapheigth;
      }
      for (let j = 0; j < visibleMapViewWidth; j++) {
        let mappointx = j + Game.mapViewX;
        if(mappointx >= this.state.mapposition.mapwidth){
          mappointx = mappointx - this.state.mapposition.mapwidth;
        }
        if(mappointy < 0){
          mappointy = 0;
        }
        if(mappointx < 0){
          mappointx = 0;
        }
        datacolums.push(<th><td key={i * visibleMapViewWidth + j}>
          <Square positionX={j} positionY={i} onChange={childstatechange} 
          squareData={this.planemap[mappointy][mappointx]}/>
          </td></th>);
        }
        rows.push(<tr>{datacolums}</tr>);
      }
      
      const pathresult=new LinkedList(); // shortestPath();
      const gotpath=shortestpath(this.planemap,[0,0],[3,0]);
      let shortpath = "and ";
      gotpath.forEach(element => {
        let addable = " ";
        if(isNumber(element)){
          addable = " num ";
          addable = addable + element.toString();
        }else{
          addable = " type " + Object.values(element);
        }
        shortpath = shortpath + addable;
      });
      pathresult.sortingalgorithm="No sorting";

      return (
        <div className="TheGame">
        Game running
        <h1>Properties for plane {this.props.plane} </h1>
        <ul>
          <li>No games</li>
          <li>
            <button title="Path test">Testing</button>
          </li>
          <li>Test path is {pathresult.sortingalgorithm}</li>
          <li>Samll path is {shortpath}</li>
          <li>X {Game.mapviewx}</li>
          <li>Y {Game.mapviewy}</li>
          <li>This state plane</li>
          </ul>          
          <table className="Map-view">
          {rows}
          </table>
        </div>
      );
    }

    private generatemap(mapwidth: number, mapheight: number) {
      this.planemap = new Array<[MapSquareData.MapSquareData]>();
      for(let ih = 0; ih < mapheight;ih++){
        const planemaprow = new Array<MapSquareData.MapSquareData>();
        for(let iw = 0;iw < mapwidth;iw++){

          const terraintypekey = Object.keys(MapSquareData.TerrainTypes)[Math.floor( 
            Math.random() * Object.keys(MapSquareData.TerrainTypes).length )];
          const newmapdata = new MapSquareData.MapSquareData(
            MapSquareData.TerrainTypes[terraintypekey]);

          planemaprow.push(newmapdata);  
          }
        this.planemap.push(planemaprow);  
        }
      }
    
}

export default Game;