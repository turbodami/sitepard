import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_SITE,
  PASSWORD_CHANGED
} from "./types";
import setAuthToken from "../utils/setAuthToken";

//load user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//register user
export const register = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/users", body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    //callback();

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

//login user
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/auth", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//logout/clear profile

export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_SITE });
  dispatch({ type: LOGOUT });
};

//modify password
export const editPassword = (email, password, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  const data = {
    email: email,
    password: password
  }

  const body = JSON.stringify(data);
  
  try {
    const res = await axios.post('/api/users/editpassword', body, config);

    dispatch({
      type: PASSWORD_CHANGED
    })

    dispatch(setAlert("Password modificata correttamente", "success"));
    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
}

//forgot password
export const passwordForgot = (email, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  const data = {
    email: email
  }
  const body = JSON.stringify(data);
  
  try {
    const res = await axios.post('/api/users/passwordforgot', body, config);
    
    dispatch(setAlert(`Email per recupero password inviata correttamente a ${email}`, "success"));
    
    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
}

//reset password
export const passwordReset = (token, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const data = {
    password: password
  }
  const body = JSON.stringify(data);

  try {
    const res = await axios.post(`/api/mail/passwordReset/${token}`, body, config);

    dispatch({
      type: PASSWORD_CHANGED,
    });

    /* dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });  
    
    dispatch(loadUser()); */

  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
}