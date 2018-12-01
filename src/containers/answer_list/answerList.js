import React, { Component } from 'react';
import './index.css'
import { Redirect } from 'react-router';
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/questionCollector";
import AnswerForm from "../../components/forms/answer-form/answerForm";

class AnswerList extends Component {
    render() {
        if (!this.props.isLogin) {
            return <Redirect push to="/" />;
        }

        let i = 1;
        const question = this.props.questions[this.props.currentQuestion];
        console.log(this.props);
        const output = question.answers.map((answer) =>
            <div
                className='answer'
                key={i++}
            >
                Ответ: {answer}
            </div>
        );
        let title;
        if (output.length !== 0) {
            title = <h2 align="center">Список вопросов</h2>;
        }
        return (
            <div>
                {title}
                {output}
                <AnswerForm/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentQuestion: state.quest.currentQuestion,
        questions: state.quest.questions,
        isLogin: state.auth.token !== null,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onEnter: () => dispatch(actionCreators.check_questions()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AnswerList);