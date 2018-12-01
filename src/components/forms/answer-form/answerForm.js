import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router";
import FormInput from '../components/formInput';
// import FileInput from '../components/fileInput';
import './index.css'
import axios from "axios";
import * as actionCreators from "../../../store/actions/questionCollector";

class AnswerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question_id: this.props.questions[this.props.currentQuestion].id,
            question_topic: this.props.questions[this.props.currentQuestion].topic,
            question_text: this.props.questions[this.props.currentQuestion].text,
            text: '',
            status: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateText = this.updateText.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.updateFile = this.updateFile.bind(this);
    }

    updateText (value) {
        this.setState({
            text: value
        })
    }

    // updateFile (value) {
    //     this.setState({
    //         file: value
    //     })
    // }

    handleSubmit (event) {
        this.setState({ status: 'Загрузка...' });
        // const data = new FormData();
        // data.append('topic', this.state.topic);
        // data.append('text', this.state.text);
        // data.append('file', this.state.file);
        // const myHeaders = new Headers({
        //     'Access-Control-Allow-Origin': '/',
        // });
        // fetch('http://localhost:8000/answer/add', {
        //     method: 'POST',
        //     body: data,
        //     headers: myHeaders,
        // }).then((response) => {
        //     if (response.ok) {
        //         this.setState({ status: 'Успешно загружено!'});
        //     } else {
        //         this.setState({ status: 'Ошибка при загрузке'});
        //     }
        // });
        axios.post('https://voronov.chickenkiller.com/question/add_answer_js/', {
            token: this.props.token,
            question_id: this.state.question_id,
            text: this.state.text
        })
            .then(response => {
                this.props.onAdd(this.state.question_id, this.state.text);
                this.setState({
                    status: response.data.status,
                });
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
                <h2 align="center">Ответить на вопрос</h2>
                <div className="result">
                    Вопрос: { this.state.question_topic } <br/>
                    Текст вопроса: { this.state.question_text } <br/>
                </div>

                <FormInput
                    label="Текст"
                    placeholder="Введите текст ответа"
                    name="answer-text"
                    value={ this.state.text }
                    saveFun={ this.updateText }
                />

                {/*<table className="footer">*/}
                    {/*<tbody>*/}
                    {/*<tr>*/}
                        {/*<td><FileInput saveFun={ this.updateFile } /></td>*/}
                        {/*<td>*/}
                            <div className="status" align="right">{ this.state.status }</div>
                        {/*</td>*/}
                    {/*</tr>*/}
                    {/*</tbody>*/}

                {/*</table>*/}

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

const mapDispatchToProps = dispatch => {
    return {
        onAdd: (question_id, text) => dispatch(actionCreators.add_answer(question_id, text)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AnswerForm);