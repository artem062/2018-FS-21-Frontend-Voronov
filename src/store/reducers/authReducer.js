import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    error: null,
    loading: false,
    email: '',
    avatar: '',
};

const authStart = (state) => {
    return {
        ...state,
        loading: true,
        error: null,
    };
};

const authSuccess = (state, action) => {
    return {
        ...state,
        token: action.token,
        email: action.email,
        error: null,
        loading: false,
    }
};

const authFail = (state, action) => {
    return {
        ...state,
        error: action.error,
        loading: false
    }
};

const updateProfile = (state, action) => {
    return {
        ...state,
        token: action.login, //TODO token different from login
        email: action.email,
        avatar: action.avatar,
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAILED: return authFail(state, action);
        case actionTypes.UPDATE_PROFILE: return updateProfile(state, action);
        default: return state;
    }
};
export default reducer;