import Graphvertex from './GraphVertex';
import NodeEdge from './NodeEdge';

class Graph{
  private Vertexes: Graphvertex[];
  private edges: NodeEdge[];

  constructor(area: any[][]){
    this.Vertexes = new Array<Graphvertex>();
    for(let ylocation = 0;ylocation < area.length;ylocation++){
      for(let xlocation = 0;xlocation < area[ylocation].length;xlocation++){
        this.Vertexes.push(new Graphvertex([xlocation,ylocation]));
      }
    }
    this.createedges();
  }

  public addedge(start: Graphvertex, end: Graphvertex, weight: number){
    this.edges.push(new NodeEdge(start, end, weight));
  }

  public createedges(){
    this.edges = new Array<NodeEdge>();
  }

  public getedgeweight(edge: number){
    return this.edges[edge].getweight();
  }

  public getedges(){
    return this.edges;
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

const getzerobordercorrectedvalue= ((bordermax: number, borderedvalue: number)=>{
  let validvalue=0;
  if(borderedvalue>=bordermax){
    // This doesn't work for values which are bigger than twice the bordermax
    validvalue=borderedvalue-bordermax;
  }else if(borderedvalue<validvalue){
    validvalue=bordermax+borderedvalue;
  }else{
    validvalue=borderedvalue;
  }
  return validvalue;
});

interface IWeightData{
  getweight(): number;
}

const shortestpath = (area: IWeightData[][], from: number[],
   to: number[], ...between: number[])=>{
     if(from===to){
       return;
     }

  const graph = new Graph(area);
  const path=graph.getvertexes();

  // Clean code note. fliedpathdirection is problem domain (which is fantasygame).
  const [dirx, diry]=getfliedpathdirection([area[0].length,area.length],from,to);
  let [startx, starty]=from;
  let [nextx,nexty]=[startx,starty];
  const areawidth=area[0].length;
  const areaheigth=area.length;
  if(Math.abs(dirx) >= Math.abs(diry) ){
    const xadder=dirx/Math.abs(dirx);
    const yadder=diry/Math.abs(dirx);
    for(startx;startx!==to[0];startx+=xadder){
      nexty+=yadder;
      nextx+=xadder;
      startx=getzerobordercorrectedvalue(areawidth, startx);
      nextx=getzerobordercorrectedvalue(areawidth, nextx);
      starty=getzerobordercorrectedvalue(areaheigth, starty);
      nexty=getzerobordercorrectedvalue(areaheigth, nexty);
      graph.addedge(path[starty*area[0].length+startx],
        path[Math.floor(nexty)*area[0].length+nextx],
        area[Math.floor(nexty)][nextx].getweight());
      starty=Math.floor(nexty);
    }
  }else{
    const yadder=diry/Math.abs(diry);
    const xadder=dirx/Math.abs(diry);
    for(starty;starty!==to[1];starty+=yadder){
      nextx+=xadder;
      nexty+=yadder;
      startx=getzerobordercorrectedvalue(areawidth, startx);
      nextx=getzerobordercorrectedvalue(areawidth, nextx);
      starty=getzerobordercorrectedvalue(areaheigth, starty);
      nexty=getzerobordercorrectedvalue(areaheigth, nexty);
      graph.addedge(path[starty*area[0].length+startx],
        path[nexty*area[0].length+Math.floor(nextx)],
        area[nexty][Math.floor(nextx)].getweight());
      startx=Math.floor(nextx);
    }
  }

  const routeedges = graph.getedges();
  return routeedges;
}

export {shortestpath, IWeightData};
export default Graph;

