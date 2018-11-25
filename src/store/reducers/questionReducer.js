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
        //let readyData = JSON.parse(action.data);
        let readyData = {
            questions: [
                {
                    name: "ltl",
                    text: "kek"
                }
            ]
        };
        const questions = readyData.questions.map((obj) => [obj.name, obj.text]);
        return {
            new_questions: 0,
            questions
        }
    }
    return state;
};

export default reducer;