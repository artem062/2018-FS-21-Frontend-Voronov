import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isAuthorized: false,
    name: ''
};

const reducer = ( state = initialState, action ) => {
    if (action.type === actionTypes.LOGIN) {
        return {
            isAuthorized: true,
            name: action.name,
        }
    }

    if (action.type === actionTypes.LOGOUT) {
        return {
            isAuthorized: false,
            name: '',
        }
    }
    return state;
};

export default reducer;