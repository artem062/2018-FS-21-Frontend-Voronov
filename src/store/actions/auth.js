import * as actionTypes from './actionTypes';
import axios from 'axios';
import * as actionCreators from './questionCollector';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token
    }
};

export const authFailed = (err) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: err,
    }
};


export const auth = (login, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('https://voronov.chickenkiller.com/js_login/', { login, password }) //postman
            .then(response => {
                console.log(response);
                localStorage.setItem('token', response.data.token);
                dispatch(authSuccess(response.data.token));
                axios.get('https://voronov.chickenkiller.com/question/get/').then( resp => {
                    console.log(resp);
                    dispatch(actionCreators.get_questions(resp))
                })
            })
            .catch(error => {
                dispatch(authFailed(error));
            });
    }
};