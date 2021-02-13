import React, { Component, Suspense } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { Route, Switch, Redirect } from "react-router-dom";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
import Spinner from "./components/ui/Spinner/Spinner";

const OrdersComponent = React.lazy(() => import("./containers/Orders/Orders"));
const AuthComponent = React.lazy(() => import("./containers/Auth/Auth"));
const CheckoutComponent = React.lazy(() =>
  import("./containers/Checkout/Checkout")
);

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignUp();
  }

  render() {
    let routes = (
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path="/auth" component={AuthComponent} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect from="*" to="/" />
        </Switch>
      </Suspense>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route path="/checkout" component={CheckoutComponent} />
            <Route path="/auth" component={AuthComponent} />
            <Route path="/orders" component={OrdersComponent} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect from="*" to="/" />
          </Switch>
        </Suspense>
      );
    }

    return <Layout>{routes} </Layout>;
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
