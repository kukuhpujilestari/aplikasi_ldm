import {CREATE_USER, EDIT_USER, FETCH_USERS} from '../actions/type';
const INITIAL_STATE = {
    data: [],
    totalItems: 0,
    totalPages: 0,
    currentPage: 0
}

const UserReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case FETCH_USERS:
            return {
                ...state,
                data: [...action.payload.rows],
                totalItems: action.payload.totalItems,
                totalPages: action.payload.totalPages,
                currentPage: action.payload.currentPage
            }
        case CREATE_USER:
            return state;
        case EDIT_USER:
            return state;
        default:
            return state;
    }
}

export default UserReducer;