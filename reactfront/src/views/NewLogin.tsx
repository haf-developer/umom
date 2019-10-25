
import * as React from 'react';
import { Redirect,
  RouteComponentProps,
  withRouter
} from 'react-router-dom';
import {fakeAuth} from './../App'


const AuthButton = withRouter(({ history }) => {
  const signout = () => fakeAuth.signout(() => history.push("/"));
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

  return (fakeAuth.isAuthenticated)
  ? signoutrender()
  : (
    <p>{"You are not logged in."}</p>
  )
});

class NewLogin extends React.Component<RouteComponentProps>{
    public static location: any;
    public state = { redirectToReferrer: false };

  public login = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });
  };

  public render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
      }

    return (
      <div>
        <AuthButton />
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    );
  }
}
export {AuthButton, NewLogin};
export default NewLogin;