import React, { Component } from 'react';
import './index.css'
import { Redirect } from 'react-router';
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions/questionCollector";

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

        let i = 1;

        // let questions = [];
        // while (localStorage.getItem(`question_topic${i}`)) {
        //     questions.push([
        //         localStorage.getItem(`question_topic${i}`),
        //         localStorage.getItem(`question_text${i}`),
        //     ]);
        //     ++i;
        // }
        const questions = this.props.questions;

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

const mapStateToProps = state => {
    return {
        questions: state.quest.questions,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onEnter: () => dispatch(actionCreators.check_questions()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);