import { put, delay } from "redux-saga/effects";
import { logout, logoutSucceed } from "../actions";
import axios from "axios";
import {
  authFail,
  authStart,
  authSuccess,
  checkAuthTimeout,
} from "../actions/auth";

export function* logoutSaga(action) {
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("expirationDate");
  yield localStorage.removeItem("userId");
  yield put(logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(logout());
}
export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem("token");
  if (!token) {
    yield put(logout());
  } else {
    const expirationDate = yield new Date(
      localStorage.getItem("expirationDate")
    );
    if (expirationDate >= new Date()) {
      const userId = yield localStorage.getItem("userId");
      yield put(authSuccess(token, userId));
      yield put(
        checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    } else {
      yield put(logout());
    }
  }
}

export function* authSaga(action) {
  yield put(authStart());

  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };

  console.log(action);
  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCX_T2XXPI1OApXmmBLouLPBae1CHEsc2Q";
  if (!action.isSignUp) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCX_T2XXPI1OApXmmBLouLPBae1CHEsc2Q";
  }
  try {
    const response = yield axios.post(url, authData);

    const expirationDate = yield new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    yield localStorage.setItem("token", response.data.idToken);
    yield localStorage.setItem("userId", response.data.localId);
    yield localStorage.setItem("expirationDate", expirationDate.toString());

    yield put(authSuccess(response.data.idToken, response.data.localId));
    yield put(checkAuthTimeout(response.data.expiresIn));
  } catch (err) {
    yield put(authFail(err.response.data.error));
  }
}
