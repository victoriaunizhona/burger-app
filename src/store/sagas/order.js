import {put} from 'redux-saga/effects';
import axios from '../../axios-orders';
import {
    fetchOrdersFail,
    fetchOrdersStart,
    fetchOrdersSuccess,
    purchaseBurgerFail,
    purchaseBurgerStart,
    purchaseBurgerSuccess
} from '../actions/order';

export function* purchaseBurgerSaga(action) {
    yield put(purchaseBurgerStart());
    try{
        const response = yield axios.post("/orders.json?auth=" + action.token, action.orderData);
        yield put(purchaseBurgerSuccess(response.data.name, action.orderData))
    } catch (err) {
       yield put(purchaseBurgerFail(err))

    }
}



export function* fetchOrdersSaga(action) {
    yield  put(fetchOrdersStart());
    const queryParam = `?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`;
    try{
        const response = yield   axios.get('orders.json' + queryParam);
        const fetchedOrders = Object.entries(response.data).map(([id, elem]) =>  {
            return {id, ...elem}
        });
        yield  put(fetchOrdersSuccess(fetchedOrders));
    }catch (err) {
        yield put(fetchOrdersFail(err));
    }
}
