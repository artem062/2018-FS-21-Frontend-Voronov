import React, { Component } from 'react';
import './index.css'
import { Redirect } from 'react-router';
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/questionCollector";

class QuestionList extends Component {
    constructor(props) {
        super(props);

        this.changeCurrentQuestion = this.changeCurrentQuestion.bind(this);
        this.state = {
            redirect: false,
        };
        this.props.onEnter();
    }

    changeCurrentQuestion(question) {
        this.props.onChangeCurrentQuestion(question);
        this.setState({
            redirect: true
        });
    }

    render() {
        if (!this.props.isLogin) {
            return <Redirect push to="/" />;
        }
        if (this.state.redirect) {
            return <Redirect push to="/answer/add" />;
        }

        let i = 1;
        const questions = this.props.questions;

        const output = questions.map((question, index) =>
            <div
                className='question'
                key={i++}
                onClick={() => this.changeCurrentQuestion(index)}
            >
                Тема: {question.topic}<br/>
                Вопрос: {question.text}<br/>
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

const mapStateToProps = state => {
    return {
        questions: state.quest.questions,
        isLogin: state.auth.token !== null,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onEnter: () => dispatch(actionCreators.check_questions()),
        onChangeCurrentQuestion: (num) => dispatch(actionCreators.change_current_question(num)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);