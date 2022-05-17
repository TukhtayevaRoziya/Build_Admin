import api from "../../utility/api";
import { getAction } from "./readAction";
import { GET_HISTORY, GET_NEWS, GET_SERVICES, GET_CAROUSEL, GET_PROJECT } from "./types";

export const updateAction =
  (path, actionType, id, data) => async (dispatch) => {
    try {
      const res = await api.put(`${path}/${id}`, data);

      dispatch({
        type: actionType,
        payload: res.data,
      });
      if (path === "news") {
        dispatch(getAction("news", GET_NEWS));
      }
      if (path === "history") {
        dispatch(getAction("history", GET_HISTORY));
      }
      if (path === "ourService") {
        dispatch(getAction("ourService", GET_SERVICES));
      }
      if (path === "carousel") {
        dispatch(getAction("carousel", GET_CAROUSEL));
      }
      if (path === "project") {
        dispatch(getAction("project", GET_PROJECT));
      }
    } catch (err) {
      console.log(err);
    }
  };
