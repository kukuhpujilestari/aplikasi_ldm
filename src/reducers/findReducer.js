import { GET_JOB_BY_ID } from "../actions/type"

const INITIAL_STATE = {
    data: [],
}

const FindReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case GET_JOB_BY_ID:
            return {
                ...state,
                data: action.payload.values,
            }
        default:
            return state;
    }
}

export default FindReducer;