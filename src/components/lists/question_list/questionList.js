import React, { Component } from 'react';
import './index.css'
import { Redirect } from 'react-router';

class QuestionList extends Component {
    constructor(props) {
        super(props);

        this.changeCurrentQuestion = this.changeCurrentQuestion.bind(this);
        this.state = {
            redirect: false,
        };
    }

    changeCurrentQuestion(question) {
        localStorage.setItem('currentQuestion_topic', question[0]);
        localStorage.setItem('currentQuestion_text', question[1]);
        this.setState({
            redirect: true
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to="/answer/add" />;
        }

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
            <div
                className='question'
                key={i++}
                onClick={() => this.changeCurrentQuestion(question)}
            >
                Тема: {question[0]}<br/>
                Вопрос: {question[1]}
            </div>
        );
        return (
            <div>
                <h2 align="center">Список вопросов</h2>
                {output}
            </div>
        );
    }
}

export default QuestionList;