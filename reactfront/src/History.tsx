import * as React from 'react';


export interface IProps {
  move: string;
  moveTime?: number;
}

interface IState {
  moved?: string;
}

class History extends React.Component<IProps, IState>{

  protected static move = "NO moves";

  constructor(props: IProps)
  {
    super(props);
  }
  
  public render(){
      return (
        <div className="History">
        History listing
        <ul>
          <li>{History.move}</li>
          </ul>
        </div>
      );
    }
}

export default History;