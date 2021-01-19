import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/ui/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/ui/Spinner/Spinner";
import WithErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler';


const INGREDIENT_PRICES = {
  Salad: 0.5,
  Cheese: 0.4,
  Meat: 1.6,
  Bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
  };
  
  componentDidMount() {
    axios.get('/ingredients.json').then(response => {
      this.setState({ingredients: response.data})
    }).catch((error) => alert('Ingredients cannot be loaded!'))
  }

  updatePurchaseState(ingredients) {
    const sum = Object.values(ingredients).reduce((sum, el) => sum + el, 0);

    this.setState({ purchasable: !!sum });
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseContinuedHandler = () => {
    this.props.history.push('/checkout', {ingredients: this.state?.ingredients, totalPrice: this.state?.totalPrice})
  };

  purchaseCanceledHandler = () => {
    this.setState({ purchasing: false });
  };

  addIngredientHandler = (type) => {
    const updatedIngredients = this.getUpdatedIngredients(type, "addition");

    this.recalculateTotalPrice(type, "addition");

    this.setState({ ingredients: updatedIngredients });
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

  getUpdatedIngredients(type, operation) {
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
    const updatedIngredients = this.getUpdatedIngredients(type, "reduction");

    this.recalculateTotalPrice(type, "reduction");
    this.updatePurchaseState(updatedIngredients);

    this.setState({ ingredients: updatedIngredients });
  };

  render() {
    return (
      <React.Fragment>
        <Modal
          modalClosed={this.purchaseCanceledHandler}
          show={this.state.purchasing}
        >
          {this.state.loading || !this.state.ingredients ? (
            <Spinner />
          ) : (
            <OrderSummary
              purchaseContinued={this.purchaseContinuedHandler}
              purchaseCanceled={this.purchaseCanceledHandler}
              ingredients={this.state.ingredients}
              totalPrice={this.state.totalPrice}
            />
          )}
        </Modal>
        {
          !this.state.ingredients ?  <Spinner /> :
       <div>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          purchasable={this.state.purchasable}
          totalPrice={this.state.totalPrice}
          ingredientsInfo={this.state.ingredients}
          ingredientRemoved={this.removeIngredientHandler}
          ingredientAdded={this.addIngredientHandler}
          ordered={() => this.purchaseHandler(this.state)}
        />
       </div>
        }
      </React.Fragment>
    );
  }
}

export default WithErrorHandler(BurgerBuilder, axios);
