import * as actionTypes from './actionTypes';
import axios from "../../axios-orders";



export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderData,
        orderId: id
    }
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
    }
};


export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START,
    }
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT,
    }
};


export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios
            .post("/orders.json", orderData)
            .then((response) => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))

            })
            .catch((err) => {
               dispatch(purchaseBurgerFail(err))
            });

    }
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders
    }
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
        error
    }
};


export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,
    }
};

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get('orders.json').then(res => {
            const fetchedOrders = Object.entries(res.data).map(([id, elem]) =>  {
                return {id, ...elem}
            });
           dispatch(fetchOrdersSuccess(fetchedOrders));
        }).catch(err=> {
            dispatch(fetchOrdersFail(err));
        })
    }
}
