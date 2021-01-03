import React from "react";


const OrderSummary = (props) => {
    const ingredientsSummary = Object.entries(props.ingredients).map(([key, value]) =>
     <li key={key}>{key}: {value}</li>
);

    return (
        <React.Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients: </p>
            <ul>
                {
                    ingredientsSummary
                }
            </ul>
            <p>Continue to checkout?</p>
        </React.Fragment>
    );
}

export default OrderSummary;
