import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Checkout extends Component {
    onCheckoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    onCheckoutContinuedHandler = () => {
        this.props.history.replace("/checkout/contact-data");
    };

    render() {
        let summary = <Redirect to="/" />;
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? (
                <Redirect to="/" />
            ) : null;

            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        onCheckoutCancelled={this.onCheckoutCancelledHandler}
                        onCheckoutContinued={this.onCheckoutContinuedHandler}
                        ingredients={this.props.ings}
                    />
                    <Route
                        path={this.props.match.url + "/contact-data"}
                        component={ContactData}
                    />
                </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilderReducer.ingredients,
        purchased: state.orderReducer.purchased,
    };
};


export default connect(mapStateToProps, null)(Checkout);
