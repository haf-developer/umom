import * as React from 'react';
import './App.css';
import Game from './Game';
import History from './History';

import logo from './umom_logo.svg';

class App extends React.Component {
  // private readonly newProperty = 2;
  // private game = <Game plane={this.newProperty}/>;
  private game = <Game plane={3}/>;
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Umom</h1>
          <div className="Header-menu">
          <a href="#">Login</a>
          <div className="Menu-dropdown">
            <button className="dropbtn">Cities</button>
            <div className="dropdown-content">
              <a href="#">Link 1</a>
              <a href="#">Link 2</a>
              <a href="#">Link 3</a>
            </div>
          </div>
          <div className="Menu-dropdown">
            <button className="Dropbuttonarmies">Armies</button>
            <div className="dropdown-armies">
              <a href="#">Army 1</a>
              <a href="#">Army 2</a>
              <a href="#">Army 3</a>
            </div>
          </div>
          <div className="Menu-dropdown">
            <button className="Dropbuttonspells">Spells</button>
            <div className="dropdown-spells">
              <a href="#">Global</a>
              <a href="#">City</a>
              <a href="#">Army</a>
            </div>
          </div>
          <a href="#">Settings</a>
          <a href="#">About</a>
          </div>
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
