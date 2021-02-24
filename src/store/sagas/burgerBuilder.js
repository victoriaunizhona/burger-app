import axios from '../../axios-orders';
import {fetchIngredientsFailed, setIngredients} from '../actions/burgerBuilder';
import {put} from '@redux-saga/core/effects';

export function* initIngredientsSaga(action) {
    try{
        const response = yield axios.get('/ingredients.json');
        yield put(setIngredients(response.data));
    } catch (err) {
        yield put(fetchIngredientsFailed())
    }
}
