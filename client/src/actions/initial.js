import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  GET_SITE,
} from "./types";
import setAuthToken from "../utils/setAuthToken";

//register user & send site data
export const registerAndCreateSite = ({ email, password, formData }) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const resUser = await axios.post("/api/users", body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: resUser.data,
    });

    dispatch(loadUserAndCreateSite(formData));
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

//load user & create site
export const loadUserAndCreateSite = (formData) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const resAuth = await axios.get("/api/auth");

    dispatch({
      type: USER_LOADED,
      payload: resAuth.data,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const resSite = await axios.post("/api/site", formData, config);

    dispatch({
      type: GET_SITE,
      payload: resSite.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
