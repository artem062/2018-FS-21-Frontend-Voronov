import * as actionTypes from './actionTypes';
import axios from 'axios';
import * as actionCreators from './questionCollector';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (token, email) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token,
        email
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
                localStorage.setItem('token', response.data.token);
                dispatch(getQuestions(response.data.token));
            })
            .catch(error => {
                dispatch(authFailed(error));
            });
    }
};

export const getQuestions = (token) => {
    return dispatch => {
        dispatch(authSuccess(token));
        axios.get('https://voronov.chickenkiller.com/question/get/').then( resp => {
            dispatch(actionCreators.get_questions(resp))
        })
    }
};

export const updateProfile = (login, email, avatar) => {
    return {
        type: actionTypes.UPDATE_PROFILE,
        login,
        email,
        avatar
    }
};