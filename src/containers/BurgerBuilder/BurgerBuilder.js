import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/ui/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  Salad: 0.5,
  Cheese: 0.4,
  Meat: 1.6,
  Bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      Salad: 0,
      Bacon: 0,
      Cheese: 0,
      Meat: 0,
    },
    totalPrice: 4,
    purchasable: false,
      purchasing: false
  };

  updatePurchaseState(ingredients) {
    const sum = Object.values(ingredients).reduce((sum, el) => sum + el, 0);

    this.setState({ purchasable: !!sum });
  }


  purchaseHandler = () => {
    this.setState({purchasing: true})
  };

  purchaseCanceledHandler = () => {
      this.setState({purchasing: false})
  };

  addIngredientHandler = (type) => {
   const updatedIngredients = this.getUpdatedIngredients(type, 'addition');

   this.recalculateTotalPrice(type, 'addition');

    this.setState({ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  recalculateTotalPrice(type, operation) {
    let newPrice;

    const priceValue = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;

    if (operation === "reduction") {
      newPrice = oldPrice - priceValue;
    } else if (operation === "addition") {
      newPrice = oldPrice + priceValue;
    }

    this.setState({ totalPrice: newPrice });
  }

  getUpdatedIngredients(type, operation){
      let updatedCount;

      const oldCount = this.state.ingredients[type];
      const updatedIngredients = {
          ...this.state.ingredients,
      };

      if (operation === "reduction") {
          updatedCount = oldCount ? oldCount - 1 : 0;
      } else if (operation === "addition") {
          updatedCount = oldCount + 1;
      }
      updatedIngredients[type] = updatedCount;
      return updatedIngredients;
  }

  removeIngredientHandler = (type) => {
    const updatedIngredients = this.getUpdatedIngredients(type, 'reduction');

    this.recalculateTotalPrice(type, 'reduction');
    this.updatePurchaseState(updatedIngredients);

    this.setState({ ingredients: updatedIngredients });
  };

  render() {
    return (
      <React.Fragment>
          <Modal modalClosed={this.purchaseCanceledHandler} show={this.state.purchasing}>
              <OrderSummary ingredients = {this.state.ingredients}/>
          </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          purchasable={this.state.purchasable}
          totalPrice={this.state.totalPrice}
          ingredientsInfo={this.state.ingredients}
          ingredientRemoved={this.removeIngredientHandler}
          ingredientAdded={this.addIngredientHandler}
          ordered={() => this.purchaseHandler(this.state)}
        />
      </React.Fragment>
    );
  }
}

export default BurgerBuilder;
