import { combineReducers } from 'redux';
import productsReducer from 'src/views/products/store/index';

const rootReducer = combineReducers({
  productsReducer,
});

export default rootReducer;
