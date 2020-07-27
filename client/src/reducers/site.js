import {
  GET_SITE,
  SITE_ERROR,
  CLEAR_SITE,
  UPDATE_SITE,
} from "../actions/types";

const initialState = {
  site: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SITE:
    case UPDATE_SITE:
      return {
        ...state,
        site: payload,
        loading: false,
      };
    case SITE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_SITE:
      return {
        ...state,
        site: null,
        loading: false,
      };
    default:
      return state;
  }
}