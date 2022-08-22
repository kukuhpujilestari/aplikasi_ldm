import { ADD_CATEGORY, DELETE_CATEGORY, EDIT_CATEGORY, GET_CATEGORY } from "../actions/type"

const INITIAL_STATE = {
    data: [],
    totalItems: 0,
    totalPages: 0,
    currentPage: 0
}

const CategoryReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case GET_CATEGORY:
            return {
                ...state,
                data: [...action.payload.rows],
                totalItems: action.payload.totalItems,
                currentPage: action.payload.currentPage,
                totalPages: action.payload.totalPages
            }
        case ADD_CATEGORY:
            return state;
        case EDIT_CATEGORY:
            return state;
        case DELETE_CATEGORY:
            return state;
        default:
            return state;
    }
}

export default CategoryReducer;