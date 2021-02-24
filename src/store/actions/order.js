import * as actionTypes from "./actionTypes";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderData,
    orderId: id,
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const purchaseBurger = (orderData, token) => {
  return {
    type: actionTypes.PURCHASE_INITIATE,
    orderData,
    token,
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders,
  };
};

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
    error,
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrders = (token, userId) => {
  return {
    type: actionTypes.FETCH_ORDERS_INITIATE,
    token,
    userId,
  };
};
