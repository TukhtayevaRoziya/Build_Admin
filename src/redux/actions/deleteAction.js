import api from "../../utility/api";

export const deleteAction = (path, actionType, id) => async (dispatch) => {
  try {
    const res = await api.delete(`${path}/${id}`);
    dispatch({
      type: actionType,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
