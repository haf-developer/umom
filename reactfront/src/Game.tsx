import * as React from 'react';
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
  
  constructor(plane: number = 0){
      super(plane);
      Game.plane = plane;
      this.setState(
      this.state = {
        value: this.props.plane,
      });
      Game.gameref = this;
  }

public changestete(event: any )
{
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
          <tr><th>x/y</th><th>0</th><th>1</th></tr>
          <tr>
            <th>y=0</th>
            <td><Square positionX={0} positionY={valuestate} onChange={childstatechange}/>
            </td>
          </tr>
          <tr>
          <th>y=1</th>
            <td>
            <Square positionX={0} positionY={valuestate} onChange={childstatechange}/>
            </td>
            <td>
            <Square positionX={1} positionY={valuestate + 1} onChange={childstatechange}/>
            </td>
          </tr>
          </table>
        </div>
      );
    }
}

export default Game;