import * as React from 'react';

class History extends React.Component<props: any. any?>{
  static moves: any;
  constructor(props: any, moves: any?)
  {
    super(props);
    History.moves = "Class instance created";
  }
  
    public render() {
      return (
        <div className="History">
        History listing
        <ul>
          <li>{History.moves;}</li>
          </ul>
        </div>
      );
    }
}

export default History;