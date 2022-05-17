import api from "../../utility/api";
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "./types";

export const login = (body) => async (dispatch) => {
  try {
    const res = await api.post(`/auth`, body);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(checkToken(3600));
  } catch (err) {
    console.log(err);
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// export const loadUser = (path) => async (dispatch) => {
//   try {
//     const res = await api.get(`/${path}`);

//     dispatch({
//       type: USER_LOADED,
//       payload: res.data,
//     });
//     dispatch(checkToken(3600));
//   } catch (err) {
//     dispatch({
//       type: LOGIN_FAIL,
//     });
//   }
// };

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

export const checkToken = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
      console.log("token expired");
    }, expirationTime * 1000);
  };
};
