import React, { Component } from "react";
import Button from "../../../components/ui/Button/Button";
import cssClasses from "../ContactData/ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/ui/Spinner/Spinner";
import Input from "../../../components/ui/Input/Input";
import {connect} from 'react-redux';
import WithErrorHandler from '../../../hoc/withErrorHandler/WithErrorHandler';
import * as actions from '../../../store/actions/index';
import CONTACT_DATA_FORM from './contact-form.contant';
import  {updateObject} from '../../../shared/utility';
import {checkValidity} from '../../../shared/validation';

class ContactData extends Component {
  state = {
    orderForm: CONTACT_DATA_FORM
  };

  isFormValid(){
    return Object.entries(this.state.orderForm).every(([key, value]) => value.valid)
  }

  inputChangedHandler = (event, inputIdentifier) => {


    const updatedFormEl =  updateObject(this.state.orderForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(
          event.target.value,
          this.state.orderForm[inputIdentifier].validation
      ),
      touched: true
    });

    const updatedOrderForm = updateObject(
     this.state.orderForm,
        {
          [inputIdentifier]: updatedFormEl
        });

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
      userId: this.props.userId
    };

    this.props.onOrderBurger(order, this.props.token);
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
    loading: state.orderReducer.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
};
const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) =>  dispatch(actions.purchaseBurger(orderData, token))
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(ContactData, axios)) ;
