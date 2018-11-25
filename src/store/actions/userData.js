import * as actionTypes from './actionTypes';

export const login = (name) => {
    return {
        type: actionTypes.LOGIN,
        name
    };
};

export const logout = () => {
    return {
        type: actionTypes.LOGOUT
    };
};