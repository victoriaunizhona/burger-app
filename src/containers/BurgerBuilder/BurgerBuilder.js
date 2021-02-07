import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/ui/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/ui/Spinner/Spinner";
import WithErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index'
import axios from "../../axios-orders";


class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  getPurchasedState(ingredients) {
    const sum = Object.values(ingredients).reduce((sum, el) => sum + el, 0);

    return !!sum;
  }

  componentDidMount() {
    this.props.onInitIngredients();
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseContinuedHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout')
  };

  purchaseCanceledHandler = () => {
    this.setState({ purchasing: false });
  };


  render() {
    return (
      <React.Fragment>
        <Modal
          modalClosed={this.purchaseCanceledHandler}
          show={this.state.purchasing}
        >
          {!this.props.ings ? (
            <Spinner />
          ) : (
            <OrderSummary
              purchaseContinued={this.purchaseContinuedHandler}
              purchaseCanceled={this.purchaseCanceledHandler}
              ingredients={this.props.ings}
              totalPrice={this.props.price}
            />
          )}
        </Modal>
        {
          !this.props.ings ?  <Spinner /> :
       <div>
        <Burger ingredients={this.props.ings} />
        <BuildControls
          purchasable={this.getPurchasedState(this.props.ings)}
          totalPrice={this.props.price}
          ingredientsInfo={this.props.ings}
          ingredientRemoved={this.props.onIngredientRemoved}
          ingredientAdded={this.props.onIngredientAdded}
          ordered={() => this.purchaseHandler(this.state)}
        />
       </div>
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilderReducer.ingredients,
    price: state.burgerBuilderReducer.totalPrice,
    error: state.burgerBuilderReducer.error
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios)) ;
