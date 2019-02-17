import * as React from 'react';

class Square extends React.Component{

    public static positionX: number;
    public static positionY: number;

    public props: {
        positionX: number;
        positionY: number;
        onChange: any;
      }
    
    constructor(positionX: number = 0, positionY: number = 0, onChange: any){
        super(positionX, positionY);
        Square.positionX = positionX;
        Square.positionY = positionY;
    }

    public render(){
        return (
        <div className="Square">
        x y modulo = {this.props.positionX % this.props.positionY}

        <button className="squarebutton" onClick={
            ()=>{this.props.onChange(this.props.positionX, this.props.positionY);} }>
        Test X {this.props.positionX} test Y {this.props.positionY}
        </button> 
        </div>
        );
    }

}

export default Square;