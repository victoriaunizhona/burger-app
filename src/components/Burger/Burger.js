import React from "react";
import cssClasses from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const Burger = (props) => {
    let transformedIngredients;

    if(props.ingredients){
        transformedIngredients = Object.keys(props.ingredients).map((igKey) => {
            return [...Array(props.ingredients[igKey])].map((e, i) => (
                <BurgerIngredient key={igKey + i} type={igKey} />
            ));
        });
    }

  const isAnyIngredientAdded = transformedIngredients && transformedIngredients?.flat().length !== 0;

  return (
    <div className={cssClasses.Burger}>
      <BurgerIngredient type="BreadTop" />
      {isAnyIngredientAdded ? (
        transformedIngredients
      ) : (
        <p>Please add ingredients</p>
      )}
      <BurgerIngredient type="BreadBottom" />
    </div>
  );
};

export default Burger;
