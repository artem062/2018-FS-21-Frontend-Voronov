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