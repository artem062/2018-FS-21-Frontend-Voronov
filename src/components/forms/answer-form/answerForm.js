import React, { Component } from 'react';
import FormInput from '../components/formInput';
import FileInput from '../components/fileInput';
import './index.css'

class AnswerForm extends Component {
    constructor(props) {
        super(props);
        if (!localStorage.getItem('question_topic')) {
            localStorage.setItem('question_topic', '');
        }
        if (!localStorage.getItem('answer_text')) {
            localStorage.setItem('answer_text', '');
        }
        this.state = {
            question_topic: localStorage.getItem('question_topic'),
            text: localStorage.getItem('answer_text'),
            status: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateText = this.updateText.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateFile = this.updateFile.bind(this);
    }

    updateText (value) {
        this.setState({
            text: value
        })
    }

    updateFile (value) {
        this.setState({
            file: value
        })
    }

    handleSubmit (event) {
        localStorage.setItem('text', this.state.text);
        this.setState({ status: 'Загрузка...' });
        const data = new FormData();
        data.append('topic', this.state.topic);
        data.append('text', this.state.text);
        data.append('geo', this.state.geo);
        data.append('file', this.state.file);
        const myHeaders = new Headers({
            'Access-Control-Allow-Origin': '/',
        });
        fetch('http://localhost:8000/answer/add', {
            method: 'POST',
            body: data,
            headers: myHeaders,
        }).then((response) => {
            if (response.ok) {
                this.setState({ status: 'Успешно загружено!'});
            } else {
                this.setState({ status: 'Ошибка при загрузке'});
            }
        });
        event.preventDefault();
    }

    handleKeyPress(event) {
        if (event.keyCode === 13) {
            this.dispatchEvent(new Event('submit'));
        }
    }

    render() {
        return (
            <form
                onSubmit={ this.handleSubmit }
                onKeyPress={ this.handleKeyPress }
            >
                <h2 align="center">Ответить на вопрос</h2>
                <div className="result">
                    Вопрос: { this.state.question_topic } <br/>
                    Ответ: { this.state.text } <br/>
                </div>

                <FormInput
                    label="Текст"
                    placeholder="Введите текст ответа"
                    name="answer-text"
                    value={ this.state.text }
                    saveFun={ this.updateText }
                />

                <table className="footer">
                    <tbody>
                    <tr>
                        <td><FileInput saveFun={ this.updateFile } /></td>
                        <td><div className="status" align="right">{ this.state.status }</div></td>
                    </tr>
                    </tbody>

                </table>

                <input type="submit" value="Отправить"/>
            </form>
        )
    }
}

export default AnswerForm;