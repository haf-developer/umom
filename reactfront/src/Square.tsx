import * as React from 'react';
import MapSquareData from './MapSquareData';

class Square extends React.Component{

    public static positionX: number;
    public static positionY: number;

    public props: {
        positionX: number;
        positionY: number;
        squareData: MapSquareData;
        onChange: any;
      }
    
    constructor(positionX: number = 0, positionY: number = 0, onChange: any,
        squareData: MapSquareData){
        super(positionX, positionY);
        Square.positionX = positionX;
        Square.positionY = positionY;
    }

    public refclick=()=>{
        this.props.onChange(this.props.positionX, this.props.positionY)
    };

    public render(){

        const rows = [];
        rows.push(<button className="squarebutton" onClick={this.refclick}>
        Test X {this.props.positionX} test Y {this.props.positionY}
        </button>);

        return (
        <div className="Square" onClick={this.refclick}>
        <img className="Map-view-image" src={process.env.PUBLIC_URL + "/media/" + this.props.squareData.basepicture}
        alt={this.props.squareData.basetext} />
        <div className="Square-data-centered">
        {
        this.props.squareData.requiredmoves()
        }
        </div>
        {
            // rows
            }
        </div>
        );
    }

}

export default Square;