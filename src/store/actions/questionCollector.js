import * as actionTypes from './actionTypes';

export const add_question = (topic, text) => {
    return {
        type: actionTypes.ADD_QUESTION,
        topic,
        text
    };
};

export const check_questions = () => {
    return {
        type: actionTypes.CHECK_QUESTIONS,
    };
};

export const get_questions = (data) => {
    return {
        type: actionTypes.GET_QUESTIONS,
        data
    };
};

export const change_current_question = (number) => {
    return {
        type: actionTypes.CHANGE_CURRENT_QUESTION,
        number
    };
};