import {ADD_MESSAGE,GET_REPORT} from './type';
import apildm from '../apis/apildm';

const config = {
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'Application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
}

export const getReport = (page, size) => async dispatch => {
    await apildm.get(`/api/jobs/?size=${size}&page=${page}`, config)
    .then(res => {
        dispatch({
            type: GET_REPORT,
            payload: res.data.values
        });
    }).catch(err => {
        dispatch({
            type: ADD_MESSAGE,
            payload: {
                message: err.response.data.resDesc,
                infoMessage: 'Error!',
                colorMessage: 'warning',
                isSubmiting: false
            }
        });
    });
}
