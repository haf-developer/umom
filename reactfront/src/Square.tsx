import * as React from 'react';

class Square extends React.Component{

    public static positionX: number;
    public static positionY: number;

    public props: {
        positionX: number;
        positionY: number;
        squareData: any;
        onChange: any;
      }
    
    constructor(positionX: number = 0, positionY: number = 0, onChange: any,
        squareData: any){
        super(positionX, positionY);
        Square.positionX = positionX;
        Square.positionY = positionY;
    }

    public render(){

        const rows = [];
        rows.push(<button className="squarebutton" onClick={
            ()=>{this.props.onChange(this.props.positionX, this.props.positionY);} }>
        Test X {this.props.positionX} test Y {this.props.positionY}
        </button>);

        return (
        <div className="Square" onClick={
            ()=>{this.props.onChange(this.props.positionX, this.props.positionY);} }>
        {this.props.squareData}
        x y modulo = {this.props.positionX % this.props.positionY}
        {
            // rows
            }
        </div>
        );
    }

}

export default Square;