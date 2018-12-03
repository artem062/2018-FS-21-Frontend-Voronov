import React, { Component } from 'react';
import './index.css'
import { Redirect } from 'react-router';
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/questionCollector";
import AnswerForm from "../../components/forms/answer-form/answerForm";

class AnswerList extends Component {
    constructor(props) {
        super(props);
        if (this.props.questions[this.props.currentQuestion]) {
            this.state = {
                question_topic: this.props.questions[this.props.currentQuestion].topic,
                question_text: this.props.questions[this.props.currentQuestion].text,
            };
        }
    }

    render() {
        if (!this.props.isLogin) {
            return <Redirect push to="/" />;
        }

        let output;
        if (this.props.question) {
            let i = 1;
            output = this.props.question.map((answer) =>
                <div
                    className='answer'
                    key={i++}
                >
                    Ответ: {answer}
                </div>
            );
        }

        let title;
        if (output && output.length !== 0) {
            title = <h3 align="center">Список ответов</h3>;
        }
        return (
            <div>
                <div className="result">
                    Вопрос: { this.state.question_topic } <br/>
                    Текст вопроса: { this.state.question_text } <br/>
                </div>

                {title}
                {output}
                <AnswerForm/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        question: state.quest.questions[state.quest.currentQuestion] !== undefined ?
            state.quest.questions[state.quest.currentQuestion].answers : state.quest.questions[state.quest.currentQuestion],
        isLogin: state.auth.token !== null,
        questions: state.quest.questions,
        currentQuestion: state.quest.currentQuestion,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onEnter: () => dispatch(actionCreators.check_questions()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AnswerList);