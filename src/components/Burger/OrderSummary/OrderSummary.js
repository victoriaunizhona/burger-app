import React, {Component} from "react";
import Button from '../../ui/Button/Button';


class OrderSummary extends Component {

    render() {
        const ingredientsSummary = Object.entries(this.props.ingredients).map(([key, value]) =>
            <li key={key}>{key}: {value}</li>);

        return (
            <React.Fragment>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients: </p>
                <ul>
                    {
                        ingredientsSummary
                    }
                </ul>
                <p><strong>Total Price: {this.props.totalPrice.toFixed(2)}$</strong></p>
                <p>Continue to checkout?</p>
                <Button clicked={this.props.purchaseCanceled} type={'Danger'}>CANCEL</Button>
                <Button clicked={this.props.purchaseContinued} type={'Success'}>CONTINUE</Button>
            </React.Fragment>
        );
    }
}

export default OrderSummary;
