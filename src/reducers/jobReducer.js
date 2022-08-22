import { ADD_JOB, DELETE_JOB, EDIT_JOB, GET_JOB } from "../actions/type"

const INITIAL_STATE = {
    data: [],
    totalItems: 0,
    totalPages: 0,
    currentPage: 0
}

const JobReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case GET_JOB:
            return {
                ...state,
                data: [...action.payload.rows],
                totalItems: action.payload.totalItems,
                currentPage: action.payload.currentPage,
                totalPages: action.payload.totalPages
            }
        case ADD_JOB:
            return state;
        case EDIT_JOB:
            return state;
        case DELETE_JOB:
            return state;
        default:
            return state;
    }
}

export default JobReducer;