import {FETCH_MESSAGE, ADD_MESSAGE, DELETE_MESSAGE} from '../actions/type';

const INITIAL_STATE = {
    message: '',
    infoMessage: '',
    colorMessage: '',
    isSubmiting: false
}

const MessageReducer = (state = INITIAL_STATE, action) =>{
    switch (action.type) {
        case FETCH_MESSAGE:
            return state;
        case ADD_MESSAGE:
            return {
                ...state,
                message: action.payload.message,
                infoMessage: action.payload.infoMessage,
                colorMessage: action.payload.colorMessage,
                isSubmiting: action.payload.isSubmiting
            }
        case DELETE_MESSAGE:
            return {
                ...state,
                message: '',
                infoMessage: '',
                colorMessage: '',
                isSubmiting: false
            }
        default:
            return state;
    }
}

export default MessageReducer;