import * as React from 'react';

class SpellsView extends React.Component{

    public static getDerivedStateFromProps( props: SpellsView["props"], state: SpellsView["state"] ){
        if( props.location !== state.initiallocation ){
            state = {
                initiallocation: props.location,
                location: props.location
            }
        }
        return state;
    }

    public defaultProperty: number[] = [10,10];
    public props: {location: number[]
    }

    public state: {location: number[],
        initiallocation: number[] };

    constructor( {location=[6,6]}:{location?:number[]}){
    super(location);
    this.setState(
        this.state = {
            initiallocation: location,
            location
        });
    }

    public refsetmapposition=()=>{this.setmapposition();}

    public render(){

        return(
            <div className="SpellsView">
                Spells are
                <br />
                <button title="ViewSetter"  onClick={this.refsetmapposition}>
                Setposition to {this.props.location[0] + ", " + this.props.location[1]}
                </button>
                <br />
                Spells props {this.props.location[0] + ", " + this.props.location[1]}
                <br />
                Spells state at {this.state.location[0] + ", " + this.state.location[1]}
            </div>
        )
    }

    private setmapposition(){
        const oldlocation=this.state.initiallocation;
        this.setState(
            this.state = {
                initiallocation: oldlocation,
                location: [5,5]
            }
        );
    }

}

export default SpellsView;