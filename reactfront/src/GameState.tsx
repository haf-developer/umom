import NodeEdge from './algorithms/NodeEdge';

class GameState{
    public static issigned(){
        return GameState.isAuthenticated;
    }

    public static signout(cb: any) {
        GameState.isAuthenticated = false;
        setTimeout(cb, 100);
    }

    public static authenticate(cb: any) {
        GameState.isAuthenticated = true;
        setTimeout(cb, 1500); // fake async
    }

    private static isAuthenticated: boolean=false;
    // Required to be positive
    public mapviewx: number;
    public mapviewy: number;
    public plane: number;
    public mapwidth: number;
    public mapheigth: number;
    
    // Following has to also be odd numbers   
    public mapviewwidth: number; // Cannot be greater than mapwidth
    public mapviewheigth: number; // Cannot be greater than mapheight

    private pathstart: number[]=[-1,-1];
    private pathend: number[]=[-1,-1];
    private pathedges: NodeEdge[] | undefined;

    constructor(){
        this.plane = this.mapviewx = this.mapviewy = 0;
        this.mapwidth = 20;
        this.mapheigth = 20;
        this.mapviewwidth = 5;
        this.mapviewheigth = 5;
    }

    public getcurrentpath(){
        return this.pathedges;
    }

    public getcurrentpathstart(){
        return this.pathstart;
    }

    public getcurrentpathend(){
        return this.pathend;
    }

    public setnewpathstart(point: number[]){
        this.pathstart=point;
    }

    public setnewpathend(point: number[]){
        this.pathend=point;
    }

    public setnewpath(pathedeges: NodeEdge[] | undefined){
        this.pathedges=pathedeges;
    }

}

export default GameState;