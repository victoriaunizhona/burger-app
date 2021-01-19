import React, { Component } from "react";
import Button from "../../../components/ui/Button/Button";
import cssClasses from "../ContactData/ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/ui/Spinner/Spinner";
import {withRouter} from    'react-router-dom';

class ContactData extends Component {
  state = {
    loading: false,
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
  };

  orderHandler = (e) => {
    e.preventDefault();
    console.log(this.props);
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: "Vika U",
        address: {
          street: "Siviv",
          zipCode: "2222",
          country: "Ukraine",
        },
        email: "some@gmail.com",
      },
      deliveryMethod: "Self-delivery",
    };
    // json is added for Firebase
    axios
      .post("/orders.json", order)
      .then((response) => {
        console.log(response);
        this.setState({ loading: false });
        this.props.history.push('/')
      })
      .catch((err) => {
        alert(err);
        this.setState({ loading: false });
      });
  };

  render() {
    return this.state.loading ? (
      <Spinner />
    ) : (
      <div className={cssClasses.ContactData}>
        <h4>Enter your Contact Data</h4>
        <form className={cssClasses.Form}>
          <div className={cssClasses.Inputs}>
            <input
              className={cssClasses.Input}
              type="text"
              name="name"
              placeholder="Your Name"
            />
            <input
              className={cssClasses.Input}
              type="text"
              name="email"
              placeholder="Your Email"
            />
            <input
              className={cssClasses.Input}
              type="text"
              name="street"
              placeholder="Your Street"
            />
            <input
              className={cssClasses.Input}
              type="text"
              name="postal"
              placeholder="Your Postal Code"
            />
          </div>

          <Button
            clicked={this.orderHandler}
            className={cssClasses.Input}
            type="Success"
          >
            ORDER
          </Button>
        </form>
      </div>
    );
  }
}

export default withRouter(ContactData);
