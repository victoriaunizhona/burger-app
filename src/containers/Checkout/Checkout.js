import React, {Component} from "react";
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {Route} from 'react-router-dom';

class Checkout extends Component{
    state = {
        ingredients: null,
        totalPrice: 0
    };

    componentWillMount() {
        this.setState({ingredients: this.props.location?.state?.ingredients, totalPrice: this.props.location?.state?.totalPrice});
    }

    onCheckoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    onCheckoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
        return (
        <div>
            <CheckoutSummary onCheckoutCancelled={this.onCheckoutCancelledHandler} onCheckoutContinued={this.onCheckoutContinuedHandler} ingredients={this.state.ingredients}/>
            <Route path={this.props.match.url + '/contact-data'} render={()=> (<ContactData totalPrice={this.state.totalPrice} ingredients={this.state.ingredients}/>)}/>
        </div>
    )
}
}

export default Checkout;
