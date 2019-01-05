import * as React from 'react';
import { isNullOrUndefined } from 'util';

class Game extends React.Component{

  public static plane: number = 0;
  protected static mapviewy = 0;
  private static mapviewx = 0;

  public props: {
    plane: number;
  }


  public static get mapViewX() {
    return Game.mapviewx;
  }
  public static set mapViewX(value) {
    Game.mapviewx = value;
  }


  constructor(plane: number = 0){
      super(plane);
      Game.plane = plane;
  }

  public render(){
      return (
        <div className="TheGame">
        Game running
        <h1>Properties for plane {this.props.plane} </h1>
        <ul>
          <li>No games</li>
          <li>X {Game.mapviewx}</li>
          <li>Y {Game.mapviewy}</li>
          <li>Plane {isNullOrUndefined(Game.plane)            
              
          }</li>
          </ul>
        </div>
      );
    }
}

export default Game;