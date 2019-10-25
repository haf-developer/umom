import * as React from 'react';
import * as MapSquareData from '../MapSquareData';
import Square from './../Square';


export interface IViewProps {
    planemap: MapSquareData.MapSquareData[][];
    location: number[];
    viewsize: number[];
    reportlocation: any;
  }

const getzerobordercorrectedvalue=((bordermax: number, borderedvalue: number)=>{
    let validvalue=0;
    if(borderedvalue>=bordermax){
      validvalue=borderedvalue%bordermax;
    }else if(borderedvalue<validvalue){
      validvalue=bordermax+borderedvalue;
    }else{
      validvalue=borderedvalue;
    }
    return validvalue;
  });


class MapView extends React.Component<IViewProps>{

    public static getDerivedStateFromProps( props: IViewProps, state: MapView["state"] ){
        if( props.location !== state.initiallocation ){
            state = {
                initiallocation: props.location,
                location: props.location
            }
        }
    return state;
    }

    public state: {location: number[],
                    initiallocation: number[] };

    constructor(startposition: IViewProps, location: number[]){
        super(startposition);

        this.setState(
            this.state = {
                initiallocation: startposition.location,
                location: startposition.location
            });
    }

    public refsetmapposition=(x:number,y:number):void=>{this.setmapposition([x, y]);}
    public refbuttonfucntion=()=>{this.setmapposition([5,5]);}

    public render(){
        const mapcells=this.getmapsquorestable();

        return(
            <div style={{textAlign: 'center', backgroundColor: 'blue', borderStyle: 'solid'}}
             className="MapView">
                <table style={{marginLeft: '5%', alignSelf: 'right'}} className="Map-view">
                {mapcells}
                </table>
                <br />
                <button title="MapViewSetter" onClick={this.refbuttonfucntion}>
                Setposition to {this.props.location[0] + ", " + this.props.location[1]}
                </button>
                <br />
                Map props {this.props.location[0] + ", " + this.props.location[1]}
                <br />
                Map state at {this.state.location[0] + ", " + this.state.location[1]}
                <br />
                Map view {this.props.planemap[0].length}
            </div>
        )
    }

    public setmapposition=(newlocation: number[])=>{
        const oldlocation=this.state.initiallocation;
        this.setState(
            this.state = {
                initiallocation: oldlocation,
                location: [newlocation[0],newlocation[1]]
            }
        );
        this.props.reportlocation(newlocation[0],newlocation[1]);
    }

    private getmapsquorestable():any[]{
        const visibleHeigth=this.props.viewsize[1];
        const viewrows: any[]=new Array();
        const childstatechange=this.refsetmapposition;
        let mapy=this.state.location[1];
        const mapHeigth=this.props.planemap.length;
        for(let i: number=0;i<visibleHeigth;i++){
            const datacolums: any[]=new Array();                
            let mapx=this.state.location[0];
            const visibleWidth=this.props.viewsize[0];
            const mapwidth=this.props.planemap[i].length;
            for(let j: number=0;j<visibleWidth;j++){
                datacolums.push(<th><td key={i * visibleWidth + j}>
                <Square positionX={j} positionY={i} onChange={childstatechange} 
                squareData={this.props.planemap[mapy][mapx]}/>
                </td></th>);
                mapx++;
                mapx=getzerobordercorrectedvalue(mapwidth, mapx);
            }
            viewrows.push(<tr>{datacolums}</tr>);            
            mapy++;
            mapy=getzerobordercorrectedvalue(mapHeigth, mapy);
        }
        return viewrows;
    }

}

export default MapView;