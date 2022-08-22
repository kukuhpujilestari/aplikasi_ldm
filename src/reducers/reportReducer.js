import { GET_REPORT } from "../actions/type"

const INITIAL_STATE = {
    data: [],
    totalItems: 0,
    totalPages: 0,
    currentPage: 0
}

const ReportReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case GET_REPORT:
            return {
                ...state,
                data: [...action.payload.rows],
                totalItems: action.payload.totalItems,
                currentPage: action.payload.currentPage,
                totalPages: action.payload.totalPages
            }
        default:
            return state;
    }
}

export default ReportReducer;