import React from "react";
import cssClasses from '../Order/Order.module.css'

const Order = (props) => {
    const formattedIngredients = Object.entries(props.ingredients).map(([name, amount]) => (
        {name, amount}
    )) ;

    const ingredientOutput = formattedIngredients.map(ingredient => {
        return <span style={{display: 'inline-block', margin: '0 10px', border: '1px solid lightgrey', padding: '2px'}} key={ingredient.name}>{ingredient.name}({ingredient.amount}) </span>
    });

        return (
            <div className={cssClasses.Order}>
                <p>Ingredients: {ingredientOutput}</p>
                <p>Total Price: <strong>{props.price.toFixed(2)}$</strong></p>
            </div>
            )

};

export default Order
