import React, { Component } from 'react';
import './index.css'

class QuestionList extends Component {
    render() {
        let questions = [];
        let i = 1;
        while (localStorage.getItem(`question_topic${i}`)) {
            questions.push([
                localStorage.getItem(`question_topic${i}`),
                localStorage.getItem(`question_text${i}`),
            ]);
            ++i;
        }

        i = 0;
        const output = questions.map((question) =>
            <div className='question' key={i++}>
                Тема: {question[0]}<br/>
                Вопрос: {question[1]}
            </div>
        );
        return (
            <div>
                {output}
            </div>
        );
    }
}

export default QuestionList;