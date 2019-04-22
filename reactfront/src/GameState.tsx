class GameState
{
    // Required to be positive
    public mapviewx: number;
    public mapviewy: number;
    public plane: number;
    public mapwidth: number;
    public mapheigth: number;
    
    // Following has to also be odd numbers   
    public mapviewwidth: number; // Cannot be greater than mapwidth
    public mapviewheigth: number; // Cannot be greater than mapheight

    constructor(){
        this.plane = this.mapviewx = this.mapviewy = 0;
        this.mapwidth = 20;
        this.mapheigth = 20;
        this.mapviewwidth = 5;
        this.mapviewheigth = 5;
    }
}

export default GameState;