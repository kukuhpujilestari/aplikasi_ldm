import {GET_PRODUCT, ADD_MESSAGE, ADD_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT} from './type';
import apildm from '../apis/apildm';
import history from '../history';

const token = localStorage.getItem('token');

const config = {
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'Application/json',
        'Authorization': 'Bearer ' + token,
        'Mode': 'no-cors',
    }
}

export const getProduct = (size, page) => async dispatch => {
    await apildm.get(`/api/products/?size=${size}&page=${page}`, config)
    .then(res => {
        dispatch({
            type: GET_PRODUCT,
            payload: res.data.values
        });
    })
    .catch(err => {
        dispatch({
            type: ADD_MESSAGE,
            payload: {
                message: err.response.data.resDesc,
                infoMessage: 'Error!',
                colorMessage: 'warning',
                isSubmiting: false
            }
        });
        history.push('/products');
    })
    
}

export const createProduct = (data) => async distpatch => {
    await apildm.post('/api/products/', data, config)
    .then(response => {
        distpatch({
            type: ADD_PRODUCT,
            payload: response.data.value
        });
        distpatch({
            type: ADD_MESSAGE,
            payload: {
                message: response.data.resDesc,
                infoMessage: 'Success!',
                colorMessage: 'success',
                isSubmiting: false
            }
        })
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
    });
    // console.log(response.data);
    history.push('/products');
    
}

export const deleteProduct = (id) => async dispatch => {
    await apildm.delete(`/api/products/${id}`, config)
    .then(res => {
        dispatch({
            type: DELETE_PRODUCT
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
        })
    });
    history.push('/products');
}

export const editProduct = (data, id) => async distpatch => {
    await apildm.put(`/api/products/${id}`, data, config)
    .then(res => {
        distpatch({
            type: EDIT_PRODUCT,
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
    });
    history.push(`/products`);
}