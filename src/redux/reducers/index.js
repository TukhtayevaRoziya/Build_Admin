import { combineReducers } from "redux";
import authReducer from "./authReducer";
import constructionReducer from './constructionReducer';
import contactReducer from './contactReducer';
import historyReducer from './historyReducer';
import navigationReducer from './navigationReducer';
import recentCommentReducer from './recentCommentReducer';
import newsReducer from './newsReducer';
import serviceReducer from './serviceReducer';
import categoryReducer from './categoryReducer';
import carouselReducer from './carouselReducer';
import projectReducer from './projectReducer';
import networkReducer from './networkReducer';
import networkUrlReducer from './networkUrlReducer';
import userCommentReducer from './userCommentReducer';

const appReducer = combineReducers({
  authReducer,
  categoryReducer,
  constructionReducer,
  contactReducer,
  historyReducer,
  navigationReducer,
  recentCommentReducer,
  newsReducer,
  serviceReducer,
  carouselReducer,
  projectReducer,
  networkReducer,
  networkUrlReducer,
  userCommentReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
