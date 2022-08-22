import apildm from '../apis/apildm';
import history from '../history';

import {ADD_MESSAGE, CREATE_USER, EDIT_USER, FETCH_USERS} from './type';

const token = localStorage.getItem('token');

const config = {
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'Application/json',
        'Authorization': 'Bearer ' + token
    }
}

export const fetchUsers = (size, page) => async dispatch => {
    await apildm.get(`/api/users?size=${size}&page=${page}`, config)
    .then(res => {
        dispatch({
            type: FETCH_USERS,
            payload: res.data.values
        });
    })
    .catch(err => {
        dispatch({
            type: ADD_MESSAGE,
            payload: {
                message: err.response.data.resDesc,
                infoMessage: 'Error!',
                colorMessage: 'danger',
                isSubmiting: false
            }
        });
    })
    
    
}

export const createUser = data => async distpatch => {
    await apildm.post('/api/users', {...data}, config)
    .then(res => {
        distpatch({
            type: CREATE_USER,
            payload: res.data.value
        });
        distpatch({
            type: ADD_MESSAGE,
            payload: {
                message: res.data.resDesc,
                infoMessage: 'Success!',
                colorMessage: 'success',
                isSubmiting: false
            }
        });
        history.push('/users');
    })
    .catch(err => {
        distpatch({
            type: ADD_MESSAGE,
            payload: {
                message: err.response.data.resDesc,
                infoMessage: 'Error!',
                colorMessage: 'danger',
                isSubmiting: false
            }
        });
        history.push('/add-user');
    });
}

export const editUser = (data, id) => async distpatch => {
    await apildm.put(`/api/users/${id}`, {...data}, config)
    .then(res => {
        distpatch({
            type: EDIT_USER,
            payload: res.data
        })
        distpatch({
            type: ADD_MESSAGE,
            payload: {
                message: res.data.resDesc,
                infoMessage: 'Update Success!',
                colorMessage: 'info',
                isSubmiting: false
            }
        });
        history.push(`/users`);
    })
    .catch(err => {
        distpatch({
            type: ADD_MESSAGE,
            payload: {
                message: err.response.data.resDesc,
                infoMessage: 'Error!',
                colorMessage: 'danger',
                isSubmiting: false
            }
        });
        history.push(`/edit-user/${id}`);
    })
}

