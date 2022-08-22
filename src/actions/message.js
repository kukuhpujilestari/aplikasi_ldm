import {ADD_MESSAGE, FETCH_MESSAGE, DELETE_MESSAGE} from './type';

export const addMessage = (payload) => {
    return {
        type: ADD_MESSAGE,
        payload: payload
    }
}

export const getMessage = () => {
    return {
        type: FETCH_MESSAGE
    }
}

export const deleteMessage = () => {
    return {
        type: DELETE_MESSAGE
    }
}