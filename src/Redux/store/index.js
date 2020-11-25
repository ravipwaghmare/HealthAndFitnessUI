import { combineReducers } from 'redux';
import auth from './reducers/auth';

export const AllReducers = combineReducers({
  auth,
});

const rootReducer = (state, action) => {
  return AllReducers(state, action);
};
export default rootReducer;
