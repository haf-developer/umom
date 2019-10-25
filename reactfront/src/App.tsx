// import * as History from 'history';
import * as React from 'react';
import { BrowserRouter as Router,
Link,
Redirect,
Route,
RouteProps } from "react-router-dom";

import './App.css';
import Game from './Game';
import GameHistory from './History';
import AboutView from './views/AboutView';
import {
  AuthButton,
  NewLogin
} from './views/NewLogin';

import logo from './umom_logo.svg';

class App extends React.Component {
  public gamecall=() => <Game plane={3}/>;
  public gamecalldefault=() => <Game/>;

  public render() {

    return (
      <div className="App">
        <Router>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Umom</h1>
          <div className="Header-menu">
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
          <Link to="/aboutview/">AboutView</Link>
          <Link to="/game">Game</Link>
          <Link to="/gamezero">Game_default_plane</Link>
          </div>
        </header>

        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <AuthButton />
        <GameHistory move="1.1.2018"/>
        <PrivateRoute path={"/game"} component={this.gamecall}/>
        <PrivateRoute path={"/gamezero"} component={this.gamecalldefault}/>
        <Route path="/aboutview/" component={AboutView} />
        <Route path="/newlogin" component={NewLogin} />
        </Router>
      </div>
    );
  }
}


interface IPrivateRouteProps extends RouteProps {
  component: any;
}

const PrivateRoute = (props: IPrivateRouteProps):JSX.Element => {
  const { component: Component, ...rest } = props;
  const returnedrender=(propsa:any)=>(
    fakeAuth.isAuthenticated ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: "/newlogin",
          state: { from: propsa.location }
        }}
      />
    )
  )

  return (
    <Route
      {...rest}
      render={returnedrender}
    />
  );
};

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb: any) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb: any) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

export {fakeAuth};
export default App;
