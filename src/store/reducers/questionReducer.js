import * as actionTypes from '../actions/actionTypes';

const initialState = {
    new_questions: 0,
    questions: []
};

const reducer = ( state = initialState, action ) => {
    if (action.type === actionTypes.ADD_QUESTION) {
        return {
            new_questions: state.new_questions + 1,
            questions: [
                ...state.questions,
                [action.topic, action.text]
            ]
        }
    }

    if (action.type === actionTypes.CHECK_QUESTIONS) {
        return {
            new_questions: 0,
            questions: state.questions
        }
    }

    if (action.type === actionTypes.GET_QUESTIONS) {
        const readyData = JSON.parse(action.data.data.questions);
        const questions = readyData.map((obj) => [obj.fields.name, obj.fields.text]);
        return {
            new_questions: 0,
            questions
        }
    }
    return state;
};

export default reducer;