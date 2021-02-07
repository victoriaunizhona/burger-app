import  * as actionTypes from './actionTypes';
import axios from "../../axios-orders";


export const addIngredient = (ingName) => {
    return {
        ingredientName: ingName,
        type: actionTypes.ADD_INGREDIENT
    }
};

export const removeIngredient = (ingName) => {
    return {
        ingredientName: ingName,
        type: actionTypes.REMOVE_INGREDIENT
    }
};

export const fetchIngredientsFailed = () => {
    return  {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
    }
};


export const setIngredients = (ingredients) => {
    return  {
        type: actionTypes.SET_INGREDIENTS,
        ingredients
    }
};

export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json').then(response => {
          dispatch(setIngredients(response.data))
        }).catch((error) => dispatch(fetchIngredientsFailed()))
    }
};
