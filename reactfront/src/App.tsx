import * as React from 'react';
import './App.css';
import Game from './Game';
import History from './History';

import logo from './logo.svg';

class App extends React.Component {
  // private readonly newProperty = 2;
  // private game = <Game plane={this.newProperty}/>;
  private game = <Game plane={3}/>;
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        {this.game},
        <History move="1.1.2018"/>
      </div>
    );
  }
}

export default App;
