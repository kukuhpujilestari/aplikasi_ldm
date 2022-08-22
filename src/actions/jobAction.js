import {GET_JOB, ADD_MESSAGE, ADD_JOB, DELETE_JOB, EDIT_JOB, GET_REPORT} from './type';
import apildm from '../apis/apildm';
import history from '../history';

const token = localStorage.getItem('token');

const config = {
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'Application/json',
        'Authorization': 'Bearer ' + token
    }
}

// console.log('token', token)

export const getJobs = (page, size) => async dispatch => {
    await apildm.get(`/api/jobs/?size=${size}&page=${page}`, config)
    .then(res => {
        
        dispatch({
            type: GET_JOB,
            payload: res.data.values
        });
    }).catch(err => {
        // console.log(err.response);
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

export const getReport = (page, size) => async dispatch => {
    await apildm.get(`/api/jobs/report?size=${size}&page=${page}`, config)
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
    })
}

export const createJob = (data) => async distpatch => {
    await apildm.post('/api/jobs', {...data}, config)
    .then(res => {
        distpatch({
            type: ADD_JOB,
            payload: res.data.values
        });
        history.push('/jobs');
    }).catch(err => {
        // console.log(err.response);
        distpatch({
            type: ADD_MESSAGE,
            payload: {
                message: err.response.data.resDesc,
                infoMessage: 'Error!',
                colorMessage: 'danger',
                isSubmiting: false
            }
        });
        history.push('/add-job');
    });
}

export const editJob = (data, id) => async distpatch => {
    await apildm.put(`/api/jobs/${id}`, {...data}, config)
    .then(res => {
        distpatch({
            type: EDIT_JOB,
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
        history.push(`/edit-job/${id}`);
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
        history.push(`/edit-job/${id}`);
    })
}

export const deleteJob = (id) => async dispatch => {
    await apildm.delete(`/api/jobs/${id}`, config)
    .then(res => {
        dispatch({
            type: DELETE_JOB
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
    });
    history.push('/jobs');
}

export const sendJob = (data, id) => async distpatch => {
    await apildm.post('/api/jobs/addUser', {...data}, config)
    .then(res => {
        distpatch({
            type: ADD_MESSAGE,
            payload: {
                message: res.data.resDesc,
                infoMessage: 'Success!',
                colorMessage: 'success',
                isSubmiting: false
            }
        });
        history.push(`/edit-job/${id}`);
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
        history.push(`/edit-job/${id}`);
    });
}


export const deleteJobUser = (jobsId, data) => async dispatch => {
    // console.log(config);
    await apildm.delete(`/api/jobs/deleteUser/${jobsId}`, {data: { userId: data }, headers: { Authorization: 'Bearer ' + token } })
    .then(res => {
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
    
    history.push(`/edit-job/${jobsId}`);
}

export const deleteJobProduct = (id, productId) => async dispatch => {
    await apildm.delete(`/api/jobs/deleteProduct/${id}`, {data: { productId: productId }, headers: { Authorization: 'Bearer ' + token } })
    .then(res => {
        dispatch({
            type: ADD_MESSAGE,
            payload: {
                message: res.data.resDesc,
                infoMessage: 'Delete Success!',
                colorMessage: 'success',
                isSubmiting: false
            }
        });
        history.push(`/edit-job/${id}`);
    }).catch(err => {
        dispatch({
            type: ADD_MESSAGE,
            payload: {
                message: err.response.data.resDesc,
                infoMessage: 'Error!',
                colorMessage: 'danger',
                isSubmiting: false
            }
        });
        history.push(`/edit-job/${id}`);
    })
    
}

export const sendProduct = (data, id) => async distpatch => {
    await apildm.post('/api/jobs/addProduct', {...data}, config)
    .then(res => {
        distpatch({
            type: ADD_MESSAGE,
            payload: {
                message: res.data.resDesc,
                infoMessage: 'Success!',
                colorMessage: 'success',
                isSubmiting: false
            }
        });
        history.push(`/edit-job/${id}`);
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
        history.push(`/edit-job/${id}`);
    });
}

export const editProductJob = (data, id) => async distpatch => {
    await apildm.patch(`/api/jobs/editProduct`, {...data}, config)
    .then(res => {
        distpatch({
            type: ADD_MESSAGE,
            payload: {
                message: res.data.resDesc,
                infoMessage: 'Update Success!',
                colorMessage: 'info',
                isSubmiting: false
            }
        });
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
    history.push(`/edit-job/${id}`);
}

export const uploadImageJob = (data) => async dispatch => {
    await apildm.post('/api/jobs/uploadJobs', data, config)
    .then(res => {
        dispatch({
            type: ADD_MESSAGE,
            payload: {
                message: res.data.resDesc,
                infoMessage: 'Success!',
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
        });
    });
    history.push(`/jobs`);
};

export const verify = (data) => async dispatch => {
    await apildm.post('/api/jobs/verify', data, config)
    .then(res => {
        dispatch({
            type: ADD_MESSAGE,
            payload: {
                message: res.data.resDesc,
                infoMessage: 'Success!',
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
        });
    });
    history.push(`/jobs`);
};