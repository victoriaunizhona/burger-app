import * as actionTypes from "./actionTypes";

export const checkAuthTimeout = (expirationTime) => {
  return {
    type: actionTypes.AUTH_CHECK_TIME_OUT,
    expirationTime: expirationTime,
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT,
  };
};

export const logoutSucceed = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: idToken,
    userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.AUTH_SET_REDIRECT_PATH,
    path,
  };
};

export const auth = (email, password, isSignUp) => {
  return {
    type: actionTypes.AUTH_INITIATE_START,
    email,
    password,
    isSignUp,
  };
};

export const authCheckState = () => {
  return {
    type: actionTypes.AUTH_CHECK_STATE_INIT
  }
};
