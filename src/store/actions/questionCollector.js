import * as actionTypes from './actionTypes';

export const add_question = (id, topic, text) => {
    return {
        type: actionTypes.ADD_QUESTION,
        id,
        topic,
        text
    };
};

export const add_answer = (question_id, text) => {
    return {
        type: actionTypes.ADD_ANSWER,
        question_id,
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