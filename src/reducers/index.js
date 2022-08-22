import { combineReducers } from 'redux';
import AuthReducer from './authReducer';
import UserReducer from './userReducer';
import MessageReducer from './messageReducer';
import CategoryReducer from './categoryReducer';
import ProductReducer from './productReducer';
import JobReducer from './jobReducer';
import ReportReducer from './reportReducer';

export default combineReducers({
    auth: AuthReducer,
    users: UserReducer,
    messages: MessageReducer,
    catigories: CategoryReducer,
    products: ProductReducer,
    jobs: JobReducer,
    reports: ReportReducer,
});