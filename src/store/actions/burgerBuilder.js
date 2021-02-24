import * as actionTypes from "./actionTypes";

export const addIngredient = (ingName) => {
  return {
    ingredientName: ingName,
    type: actionTypes.ADD_INGREDIENT,
  };
};

export const removeIngredient = (ingName) => {
  return {
    ingredientName: ingName,
    type: actionTypes.REMOVE_INGREDIENT,
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients,
  };
};

export const initIngredients = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_INITIATE,
  };
};
