import axios from "axios";
import { setAlert } from "./alert";

import {
  GET_SITE,
  SITE_ERROR,
  UPDATE_SITE,
  CLEAR_SITE,
  ACCOUNT_DELETED,
} from "./types";

//get current users site
export const getCurrentSite = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/site/me");

    dispatch({
      type: GET_SITE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SITE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//create or update site
export const createSite = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/site", formData, config);

    dispatch({
      type: GET_SITE,
      payload: res.data,
    });

    dispatch(
      setAlert(
        edit ? "Sito aggiornato correttamente!" : "Sito creato correttamente!"
      )
    );

    if (edit) {
      history.push("/dashboard");
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: SITE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//add product
export const addProduct = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put("/api/site/products", formData, config);

    dispatch({
      type: UPDATE_SITE,
      payload: res.data,
    });

    dispatch(setAlert("Prodotto aggiunto", "success"));

    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: SITE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//delete product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/site/products/${id}`);

    dispatch({
      type: UPDATE_SITE,
      payload: res.data,
    });

    dispatch(setAlert("Prodotto rimosso!", "success"));
  } catch (err) {
    dispatch({
      type: SITE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//delete account & profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Sicuro? Non potrai più tornare indietro")) {
    try {
      const res = await axios.delete(`/api/site/`);

      dispatch({ type: CLEAR_SITE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(
        setAlert("Il tuo account è stato eliminato in modo permanente!")
      );
    } catch (err) {
      dispatch({
        type: SITE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
