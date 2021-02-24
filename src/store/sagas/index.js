import {takeEvery} from 'redux-saga/effects'; // listen to actions and react when they occur
import {checkAuthTimeoutSaga, logoutSaga, authSaga, authCheckStateSaga} from './auth';
import {purchaseBurgerSaga, fetchOrdersSaga} from './order';
import {initIngredientsSaga} from   './burgerBuilder';
import * as actionTypes from '../actions/actionTypes';


export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_TIME_OUT, checkAuthTimeoutSaga);
    yield takeEvery(actionTypes.AUTH_INITIATE_START, authSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_STATE_INIT, authCheckStateSaga);


    yield takeEvery(actionTypes.PURCHASE_INITIATE, purchaseBurgerSaga);
    yield takeEvery(actionTypes.FETCH_ORDERS_INITIATE, fetchOrdersSaga);


    yield takeEvery(actionTypes.FETCH_INGREDIENTS_INITIATE, initIngredientsSaga);

}
