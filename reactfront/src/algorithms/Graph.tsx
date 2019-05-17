import Graphvertex from './GraphVertex';

class Graph{
  private Vertexes: Graphvertex[];

  constructor(area: any[][]){
    this.Vertexes = new Array<Graphvertex>();
    for(let ylocation = 0;ylocation < area.length;ylocation++){
      for(let xlocation = 0;xlocation < area[ylocation].length;xlocation++){
        this.Vertexes.push(new Graphvertex([xlocation,ylocation]));
      }
    }
  }
  public getvertexes(){
    return this.Vertexes;
  }

}

const getfliedpathdirection = ((areasize: number[], from: number[], to: number[])=>{
  /* Is it shorter if breaking area borders? This is counted by dividing area size
  parameters to half. Longest possible distance is half of size.
  Settings also affect. Are vertical or horizontal map borders active or not.
  */
  const xmax = Math.floor(areasize[0]/2);
  const ymax = Math.floor(areasize[1]/2);
  let [xdir, ydir]=[(to[0]-from[0]), (to[1]-from[1])];
  if( Math.abs(xdir) > xmax){
    if(xdir>=0){
      xdir-=areasize[0];
    }else{
      xdir+=areasize[0];
    }
  }
  if( Math.abs(ydir) > ymax){
    if(ydir>=0){
      ydir-=areasize[1];
    }else{
      ydir+=areasize[1];
    }
  }
  return [xdir, ydir];
});

const shortestpath = (area: any[][], from: number[], to: number[], ...between: number[])=>{
  const graph = new Graph(area);
//   const path=graph.getvertexes().values;
  const path=graph.getvertexes();

  const smallpath = [];
  smallpath.push(path[0]);
  smallpath.push(path[1]);
  smallpath.push(path[2]);
  const dirfrom=getfliedpathdirection([area[0].length,area.length],from,to);
  const dirarray=new Array<number>();
  dirarray[0]=dirfrom[0];
  let flypathisgreater=false;
  if(flypathisgreater){
    smallpath.pop();   
    if(smallpath.length < 2){
      flypathisgreater=true;
    }  
}

const what =() => {
   path.pop();
   return path.length > 0;
 }
  
  if(what() === true)
  {
    smallpath.pop();
  }
  return smallpath;
}

export {shortestpath};
export default Graph;

