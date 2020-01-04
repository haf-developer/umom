// import * as History from 'history';
import * as React from 'react';
import { BrowserRouter as Router,
Link,
Redirect,
Route,
RouteComponentProps,
RouteProps} from "react-router-dom";

import './App.css';
import GameData from './datahandling/GameData';
import Game from './Game';
import GameState from './GameState';
import GameHistory from './History';
import AboutView from './views/AboutView';
import {
  AuthButton,
  LoginRender
} from './views/NewLogin';

import logo from './umom_logo.svg';


class App extends React.Component {
  public gamecall=(props: RouteComponentProps<any>) => <Game {...props}
    fromserver={new GameData()} plane={3}/>;
  public gamecalldefault=() => <Game fromserver={new GameData()} plane={1}/>;
  public loginviarender=() => <LoginRender/>;

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
          <Link to="/newlogin">New login</Link>
          <Link to="/game">Game not working render props routing</Link>
          <Link to="/gamezero">Game working</Link>
          <Link to="/">Root link</Link>
          </div>
        </header>

        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <AuthButton />
        <GameHistory move="1.1.2018"/>
        <PrivateRoute authorized={GameState.issigned()} exact={true}
          path={"/game"} render={this.gamecall}/>
        <PrivateRoute authorized={GameState.issigned()} exact={true}
          path={"/gamezero"} component={this.gamecalldefault}/>
        <Route path="/aboutview/" component={AboutView} />
        <Route exact={true} path="/newlogin" render={this.loginviarender} />
        </Router>
      </div>
    );
  }
}

interface IPrivateRouteProps extends RouteProps {
  authorized: boolean;
  component?: any;
}

const PrivateRoute = (props: IPrivateRouteProps):JSX.Element => {
  const { component: Component, render: Render, ...rest } = props;
  let returnedrendercandidate;
  const loggedstate=GameState.issigned();

  const loginredirect=(newrenderprops: RouteProps)=>(
    <Redirect
        to={{
          pathname: "/newlogin",
          state: {
            from: newrenderprops.location,
            logged: loggedstate.toString() + " authorized=" + props.authorized.toString()
            }
        }}
      />
    )

  if(undefined !== Render){
    if(loggedstate){
      returnedrendercandidate=props.render;

    }else{
      returnedrendercandidate=loginredirect;
    }
  }else{
    returnedrendercandidate=(componentpros: RouteProps)=>(
      GameState.issigned() ? (
        <Component {...props} />
      ) : (<Redirect
        to={{
          pathname: "/newlogin",
          state: {
            from: componentpros.location,
            logged: loggedstate.toString() + " authorized=" + props.authorized.toString()
          }
        }}
       />)
    )
  }

  return (
    <Route
      {...rest}
      render={returnedrendercandidate}
    />
  );
};



  /*
<Redirect
  to={{
    pathname: "/newlogin",
    state: { from: componentpros.location }
  }}
/>
*/

export default App;
