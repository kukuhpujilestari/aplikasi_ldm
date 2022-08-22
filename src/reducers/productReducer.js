import { ADD_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT, GET_PRODUCT } from "../actions/type"

const INITIAL_STATE = {
    data: [],
    totalItems: 0,
    totalPages: 0,
    currentPage: 0
}

const ProductReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case GET_PRODUCT:
            return {
                ...state,
                data: [...action.payload.rows],
                totalItems: action.payload.totalItems,
                currentPage: action.payload.currentPage,
                totalPages: action.payload.totalPages
            }
        case ADD_PRODUCT:
            return state;
        case EDIT_PRODUCT:
            return state;
        case DELETE_PRODUCT:
            return state;
        default:
            return state;
    }
}

export default ProductReducer;