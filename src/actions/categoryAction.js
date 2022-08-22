import apildm from "../apis/apildm"
import {ADD_CATEGORY, ADD_MESSAGE, DELETE_CATEGORY, EDIT_CATEGORY, GET_CATEGORY } from "./type";
import history from '../history';

const token = localStorage.getItem('token');
const config = {
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'Application/json',
        'Authorization': 'Bearer ' + token
    }
}

export const getCategory =(size, page) => async dispatch => {
    await apildm.get(`/api/categories/?size=${size}&page=${page}`, config)
    .then(res => {
        dispatch({
            type: GET_CATEGORY,
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
        history.push('/categories');
    });
}

export const deleteCategory = (id) => async dispatch => {
    await apildm.delete(`/api/categories/${id}`, config)
    .then(res => {
        dispatch({
            type: DELETE_CATEGORY
        });
        dispatch({
            type: ADD_MESSAGE,
            payload: {
                message: res.data.resDesc,
                infoMessage: 'Delete Success!',
                colorMessage: 'success',
                isSubmiting: false
            }
        });
    }).catch(err => {
        dispatch({
            type: ADD_MESSAGE,
            payload: {
                message: err.response.data.resDesc,
                infoMessage: 'Error!',
                colorMessage: 'danger',
                isSubmiting: false
            }
        })
    })
    history.push('/categories');
}

export const createCategory = (data) => async distpatch => {
    await apildm.post('/api/categories', {...data}, config)
    .then(res => {
        distpatch({
            type: ADD_CATEGORY,
            payload: res.data.values
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
        history.push('/categories');
    }).catch(err => {
        distpatch({
            type: ADD_MESSAGE,
            payload: {
                message: err.response.data.resDesc,
                infoMessage: 'Error!',
                colorMessage: 'danger',
                isSubmiting: false
            }
        });
        history.push('/categories');
    })
}

export const editCategory = (data, id) => async distpatch => {
    await apildm.put(`/api/categories/${id}`, {...data}, config)
    .then(res => {
        distpatch({
            type: EDIT_CATEGORY,
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
        history.push(`/categories`);
    }).catch(err => {
        distpatch({
            type: ADD_MESSAGE,
            payload: {
                message: err.response.data.resDesc,
                infoMessage: 'Error!',
                colorMessage: 'danger',
                isSubmiting: false
            }
        });
        history.push(`/categories`);
    })
    
}