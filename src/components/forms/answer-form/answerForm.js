import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router";
import FormInput from '../components/formInput';
import './index.css'
import axios from "axios";

class AnswerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question_id: this.props.questions[this.props.currentQuestion].id,
            text: '',
            status: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateText = this.updateText.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    updateText (value) {
        this.setState({
            text: value
        })
    }

    handleSubmit (event) {
        this.setState({ status: 'Загрузка...' });
        axios.post('https://voronov.chickenkiller.com/question/add_answer_js/', {
            token: this.props.token,
            question_id: this.state.question_id,
            text: this.state.text
        })
            .then(response => {
                this.setState({
                    status: response.data.status,
                });
            });
        this.setState({
            text: '',
        });
        event.preventDefault();
    }

    handleKeyPress(event) {
        if (event.keyCode === 13) {
            this.dispatchEvent(new Event('submit'));
        }
    }

    render() {
        if (!this.props.isLogin) {
            return <Redirect push to="/" />;
        }

        return (
            <form
                onSubmit={ this.handleSubmit }
                onKeyPress={ this.handleKeyPress }
            >

                <FormInput
                    placeholder="Введите текст ответа"
                    name="answer-text"
                    value={ this.state.text }
                    saveFun={ this.updateText }
                />

                <input type="submit" value="Отправить"/>
            </form>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLogin: state.auth.token !== null,
        token: state.auth.token,
        questions: state.quest.questions,
        currentQuestion: state.quest.currentQuestion,
    }
};

export default connect(mapStateToProps)(AnswerForm);