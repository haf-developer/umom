import * as React from 'react';

import { isNumber } from 'util';
import {shortestpath} from './algorithms/Graph';
import LinkedList from './algorithms/LinkedList';
import GameState from './GameState';
import * as MapSquareData from './MapSquareData';
import CityView from './views/CityView';
import MapView from './views/MapView';
import SpellsView from './views/SpellsView';

class Game extends React.Component{

  public static get mapViewX() {
    return Game.mapviewx;
  }
  public static set mapViewX(value) {
    Game.mapviewx = value;
  }
  public static gameref: Game;

  public static defaultProps = {
    plane: 0
  };

  protected static mapviewy: number = 0;
  private static mapviewx = 0;

  public props: {
    plane?: number;
  }

  public state: {
    mapposition: GameState;
  }

  private planemap: MapSquareData.MapSquareData[][];

  constructor(plane: number){
      super(plane);
      const gamestate = new GameState();

      this.setState(
      this.state = {
        mapposition: gamestate
      });
      Game.gameref = this;
      this.generatemap(gamestate.mapwidth, gamestate.mapheigth);
  }

  public refpathaction=()=>{this.pathaction();}

  public changestete(event: any ){
    Game.mapviewy++;
  }

  public childstatechange=(x:number, y:number)=> this.movetoPosition(x,y);

  public movetoPosition( xlocation: number, ylocation: number){
  const mapviewstate = this.state.mapposition;
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

  this.setState(
    this.state = {
      mapposition: mapviewstate,
    }
  );
}

public render(){
    Game.mapviewx = this.state.mapposition.mapviewx;
    Game.mapviewy = this.state.mapposition.mapviewy;

    const visibleMapViewWidth = this.state.mapposition.mapviewwidth;
    const visibleMapViewHeight = this.state.mapposition.mapviewheigth;

    const pathresult=new LinkedList(); // shortestPath();
    const gotpath=this.state.mapposition.getcurrentpath();
    let shortpath="";

    if(undefined!==gotpath){
      gotpath.forEach(element => {
        let addable=" ";
        if(isNumber(element)){
          addable=" num ";
          addable=addable + element.toString();
        }else{
          addable += " data " + element.getend().getnodedata();
          addable += " weight=" + element.getweight();
        }
        shortpath=shortpath + addable;
      });
    }
    pathresult.sortingalgorithm="No sorting";

    let testaction="Test path";
    const pathstart=this.state.mapposition.getcurrentpathstart();

    if(pathstart[0]>=0 && pathstart[1]>=0){
      const pathend=[Game.mapviewx, Game.mapviewy];
      testaction="Path from ["+pathstart[0]+"]["+pathstart[1]+"]";
      testaction+=" to ["+pathend[0]+"]["+pathend[1]+"]";
    }

    return (
      <div className="TheGame">
      Game running
      <h1>Properties for plane {this.props.plane} </h1>
      <ul>
        <li><SpellsView location={[Game.mapviewx, Game.mapviewy]} /></li>
        <li><CityView /></li>
        <li className="CenteredComponent"><MapView planemap={this.planemap} location={[Game.mapviewx, Game.mapviewy]}
        reportlocation={this.childstatechange} viewsize={[visibleMapViewWidth, visibleMapViewHeight]}/></li>
        <li>
          <button title="Path test" onClick={
            this.refpathaction}>{testaction}</button>
        </li>
        <li>Test path is {pathresult.sortingalgorithm}</li>
        <li>Samll path is {shortpath}</li>
        <li>X {Game.mapviewx}</li>
        <li>Y {Game.mapviewy}</li>
        <li>This state plane</li>
        </ul>
      </div>
    );
  }

  private pathaction(){
    const mapviewstate = this.state.mapposition;
    const validpathstart = mapviewstate.getcurrentpathstart();
    if(validpathstart[0]<0 || validpathstart[1]<0){
      mapviewstate.setnewpathstart([mapviewstate.mapviewx,mapviewstate.mapviewy]);
    }else{
      let validpathend = mapviewstate.getcurrentpathend();
      if(validpathend[0]<0 || validpathend[1]<0){
        validpathend=[mapviewstate.mapviewx,mapviewstate.mapviewy];
        if((validpathend[0] !== validpathstart[0]) || (validpathend[1] !== validpathstart[1]) ){
          mapviewstate.setnewpathend(validpathend);
          const path=shortestpath(this.planemap, validpathstart, validpathend)
          mapviewstate.setnewpath(path);
          mapviewstate.setnewpathstart([-1,-1]);
          mapviewstate.setnewpathend([-1,-1]);
        }
      }
    }
    this.setState(
      this.state = {
        mapposition: mapviewstate,
      }
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