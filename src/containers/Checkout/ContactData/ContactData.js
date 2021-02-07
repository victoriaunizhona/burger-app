import React, { Component } from "react";
import Button from "../../../components/ui/Button/Button";
import cssClasses from "../ContactData/ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/ui/Spinner/Spinner";
import Input from "../../../components/ui/Input/Input";
import {connect} from 'react-redux';
import WithErrorHandler from '../../../hoc/withErrorHandler/WithErrorHandler';
import * as actions from '../../../store/actions/index'
import CONTACT_DATA_FORM from './contact-form.contant'

class ContactData extends Component {
  state = {
    orderForm: CONTACT_DATA_FORM
  };

  isFormValid(){
    return Object.entries(this.state.orderForm).every(([key, value]) => value.valid)
  }

  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length > rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length < rules.maxLength && isValid;
    }
    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm,
    };

    const updatedFormEl = { ...updatedOrderForm[inputIdentifier] };
    updatedFormEl.value = event.target.value;
    updatedFormEl.valid = this.checkValidity(
      updatedFormEl.value,
      updatedFormEl.validation
    );
    updatedFormEl.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormEl;
    this.setState({ orderForm: updatedOrderForm });
  };

  orderHandler = (e) => {
    e.preventDefault();

    const formData = {};
    for (let formElIdentifier in this.state.orderForm) {
      formData[formElIdentifier] = this.state.orderForm[formElIdentifier].value;
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
    };

    this.props.onOrderBurger(order);
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    const form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((formEl) => (
          <Input
            invalid={!formEl.config.valid}
            changed={(event) => this.inputChangedHandler(event, formEl.id)}
            key={formEl.id}
            touched={formEl.config.touched}
            shouldValidate={formEl.config.validation}
            value={formEl.config.value}
            elementConfig={formEl.config.elementConfig}
            elementType={formEl.config.elementType}
          />
        ))}

        <Button  disabled={!this.isFormValid()} className={cssClasses.Input} type="Success">
          ORDER
        </Button>
      </form>
    );

    return this.props.loading ? (
      <Spinner />
    ) : (
      <div className={cssClasses.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilderReducer.ingredients,
    price: state.burgerBuilderReducer.totalPrice,
    loading: state.orderReducer.loading
  }
};
const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData) =>  dispatch(actions.purchaseBurger(orderData))
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(ContactData, axios)) ;
