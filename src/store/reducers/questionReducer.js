import * as actionTypes from '../actions/actionTypes';
import axios from "axios";

const initialState = {
    new_questions: 0,
    currentQuestion: 0,
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
            ...state,
            new_questions: 0,
        }
    }

    if (action.type === actionTypes.CHANGE_CURRENT_QUESTION) {
        return {
            ...state,
            currentQuestion: action.number,
        }
    }

    if (action.type === actionTypes.GET_QUESTIONS) {
        const readyData = JSON.parse(action.data.data.questions);
        const questions = readyData.map((obj) => ({
            id: obj.pk,
            name: obj.fields.name,
            text: obj.fields.text,
            answers: [],
        }));
        questions.forEach((ques) => {
            axios.get(`http://localhost:8000/question/get_answers/${ques.id}/`).then( resp => {
                const answersArray = JSON.parse(resp.data.answers);
                ques.answers = answersArray.map((obj) => (obj.fields.name));
            })
        });
        return {
            new_questions: 0,
            questions
        }
    }
    return state;
};

export default reducer;