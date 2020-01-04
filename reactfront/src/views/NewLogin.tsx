
import * as React from 'react';
import {
  Redirect,
  RouteComponentProps,
  withRouter
} from 'react-router-dom';
import GameState from 'src/GameState';


const AuthButton = withRouter(({ history }) => {
  const signout = () => GameState.signout(() => history.push("/"));
  const signoutrender = () => (
    <div>
      {"Welcome! "}
      <button
        onClick={signout}
      >
        {"Sign out"}
      </button>
    </div>
  );

  return (GameState.issigned())
  ? signoutrender()
  : (
    <p>{"You are not logged in."}</p>
  )
});

// class NewLogin extends React.Component{
class NewLogin extends React.Component<RouteComponentProps>{
    public static location: any;
    public state = {
      redirectToReferrer: false,
      timesMounted: 0
    };

    public componentDidMount() {
      let mountcounter=this.state.timesMounted;
      mountcounter++;
      this.setState({ timesMounted: mountcounter }
      );
    }

  public login = () => {
    GameState.authenticate(() => {
      this.setState({ redirectToReferrer: true
           }
        );
    });
  };

  public render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;
    const { logged } = this.props.location.state || { logged: false };

    if (redirectToReferrer) {
      return <Redirect to={from} />;
      }else{
      return (
        <div>
          <AuthButton />
          <p>You must log in to view the page at {from.pathname}</p>
          <button onClick={this.login}>Log in</button>
          <br/>
          State information for debugging. Will be removed when working properly with render properties
          <br/>
          Mounted {this.state.timesMounted} times
          <br/>
          State of logged in is {logged.toString()}
          <br/>
          Redirect setting is {redirectToReferrer.toString()}
        </div>
      );
    }
  }
}

export const LoginRender = withRouter(NewLogin);
export {AuthButton, NewLogin};
export default NewLogin;