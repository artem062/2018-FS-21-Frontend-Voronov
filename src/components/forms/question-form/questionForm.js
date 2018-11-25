import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Redirect} from "react-router";
import FormInput from '../components/formInput';
import FileInput from '../components/fileInput';
import ShareGeo from '../components/shareGeo';
import './index.css'
import * as actionCreators from '../../../store/actions/questionCollector';

class QuestionForm extends Component {
    constructor(props) {
        super(props);
        let i = 1;
        while (localStorage.getItem(`question_topic${i}`)) {
            ++i;
        }
        if (!localStorage.getItem(`question_topic${i}`)) {
            localStorage.setItem(`question_topic${i}`, '');
        }
        if (!localStorage.getItem(`question_text${i}`)) {
            localStorage.setItem(`question_text${i}`, '');
        }
        if (!localStorage.getItem(`geo${i}`)) {
            localStorage.setItem(`geo${i}`, '');
        }
        this.state = {
            topic: localStorage.getItem(`question_topic${i}`),
            text: localStorage.getItem(`question_text${i}`),
            geo: localStorage.getItem(`geo${i}`),
            i:i,
            status: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateTopic = this.updateTopic.bind(this);
        this.updateText = this.updateText.bind(this);
        this.updateGeo = this.updateGeo.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateFile = this.updateFile.bind(this);
    }

    updateTopic (value) {
        this.setState({
            topic: value
        })
    }

    updateText (value) {
        this.setState({
            text: value
        })
    }

    updateGeo (value) {
        this.setState({
            geo: value
        })
    }

    updateFile (value) {
        this.setState({
            file: value
        })
    }

    handleSubmit (event) {
        if (this.state.topic.length === 0 && this.state.text.length === 0) {
            this.setState({
                status: 'Введите тему или текст',
            });
            event.preventDefault();
            return
        }

        const i = this.state.i;
        localStorage.setItem(`question_topic${i}`, this.state.topic);
        localStorage.setItem(`question_text${i}`, this.state.text);
        localStorage.setItem(`geo${i}`, this.state.geo);

        this.props.onAdd(this.state.topic, this.state.text);

        this.setState({
            status: 'Загрузка...',
            i: i + 1
        });

        const data = new FormData();
        data.append('topic', this.state.topic);
        data.append('text', this.state.text);
        data.append('geo', this.state.geo);
        data.append('file', this.state.file);
        const myHeaders = new Headers({
            'Access-Control-Allow-Origin': '/',
        });
        fetch('http://localhost:8000/question/add', {
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
        if (!this.props.isLogin) {
            return <Redirect push to="/" />;
        }

        return (
            <form
                onSubmit={ this.handleSubmit }
                onKeyPress={ this.handleKeyPress }
            >
                <h2 align="center">Задать вопрос</h2>
                <div className="result">
                    Тема: { this.state.topic } <br/>
                    Текст: { this.state.text } <br/>
                    Геопозиция: { this.state.geo }
                </div>

                <FormInput
                    label="Тема"
                    placeholder="Введите тему вопроса"
                    name="question-topic"
                    value={ this.state.topic }
                    saveFun={ this.updateTopic }
                />

                <FormInput
                    label="Текст"
                    placeholder="Введите текст вопроса"
                    name="question-text"
                    value={ this.state.text }
                    saveFun={ this.updateText }
                />

                <ShareGeo
                    label="Геопозиция"
                    placeholder="Введите геопозицию"
                    value={ this.state.geo }
                    saveFun={ this.updateGeo }
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

const mapStateToProps = state => {
    return {
        isLogin: state.auth.token !== null,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAdd: (topic, text) => dispatch(actionCreators.add_question(topic, text)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionForm);