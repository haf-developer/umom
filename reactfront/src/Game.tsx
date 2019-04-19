import * as React from 'react';

import MapSquareData from './MapSquareData';
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
    value: number;
  }

  public static get mapViewX() {
    return Game.mapviewx;
  }
  public static set mapViewX(value) {
    Game.mapviewx = value;
  }

  private planemap: MapSquareData[][];

  constructor(plane: number = 0){
      super(plane);
      Game.plane = plane;
      this.setState(
      this.state = {
        value: this.props.plane,
      });
      Game.gameref = this;
      this.generatemap(20, 20);
  }

  public changestete(event: any ){
    Game.mapviewy++;
    const temporaryref = Game.gameref;
    temporaryref.setState(
      temporaryref.state = {
        value: Game.mapviewy,
      });
  }

  public movetoPosition( xlocation: number, ylocation: number)
{
  alert( "New x=" + xlocation + ", new y=" + ylocation );
}

public render(){
    const valuestate = this.state.value;
    // const childstatechange = this.changestete.bind(this);
    // const childstatechange = this.changestete;

    const childstatechange = this.movetoPosition;
    const visibleMapViewWidth = 5;
    const visibleMapViewHeight = 5;
    const rows = [];
    for (let i = 0; i < visibleMapViewHeight; i++) {
      const datacolums = [];
      for (let j = 0; j < visibleMapViewWidth; j++) {
        datacolums.push(<th><td key={i * visibleMapViewWidth + j}>
          <Square positionX={j} positionY={i} onChange={childstatechange} squareData={this.planemap[i][j]}/>
          </td></th>);
        }
        rows.push(<tr>{datacolums}</tr>);
      }     

      return (
        <div className="TheGame">
        Game running
        <h1>Properties for plane {this.props.plane} </h1>
        <ul>
          <li>No games</li>
          <li>X {Game.mapviewx}</li>
          <li>Y {Game.mapviewy}</li>
          <li>This state {valuestate}</li>        
          </ul>
        <table>
          {rows}
          </table>
        </div>
      );
    }

    private generatemap(mapwidth: number, mapheight: number) {
      this.planemap = new Array<[MapSquareData]>();
      for(let ih = 0; ih < mapheight;ih++){
        const planemaprow = new Array<MapSquareData>();
        for(let iw = 0;iw < mapwidth;iw++){
          const newmapdata = new MapSquareData("ground");
          newmapdata.basepicture = "ground.png";

          if(ih+iw > 3){
            newmapdata.basetext = "sea";
            newmapdata.basepicture = "sea.png";
          }

          planemaprow.push(newmapdata);  
          }
        this.planemap.push(planemaprow);  
        }
      }
    
}

export default Game;