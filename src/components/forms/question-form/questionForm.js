import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Redirect} from "react-router";
import FormInput from '../components/formInput';
// import FileInput from '../components/fileInput';
// import ShareGeo from '../components/shareGeo';
import './index.css'
import * as actionCreators from '../../../store/actions/questionCollector';
import axios from "axios";

class QuestionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topic: '',
            text: '',
            // geo: '',
            status: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateTopic = this.updateTopic.bind(this);
        this.updateText = this.updateText.bind(this);
        // this.updateGeo = this.updateGeo.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.updateFile = this.updateFile.bind(this);
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

    // updateGeo (value) {
    //     this.setState({
    //         geo: value
    //     })
    // }
    //
    // updateFile (value) {
    //     this.setState({
    //         file: value
    //     })
    // }

    handleSubmit (event) {
        if (this.state.topic.length === 0 && this.state.text.length === 0) {
            this.setState({
                status: 'Введите тему или текст',
            });
            event.preventDefault();
            return
        }

        this.setState({
            status: 'Загрузка...',
        });

        axios.post('https://voronov.chickenkiller.com/question/add_js/', {
            token: this.props.token,
            topic: this.state.topic,
            text: this.state.text
        })
            .then(response => {
                this.props.onAdd(response.data.id, this.state.topic, this.state.text);
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
                <h2 align="center">Задать вопрос</h2>
                <div className="result">
                    Тема: { this.state.topic } <br/>
                    Текст: { this.state.text } <br/>
                    {/*Геопозиция: { this.state.geo }*/}
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

                {/*<ShareGeo*/}
                    {/*label="Геопозиция"*/}
                    {/*placeholder="Введите геопозицию"*/}
                    {/*value={ this.state.geo }*/}
                    {/*saveFun={ this.updateGeo }*/}
                {/*/>*/}

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
        token: state.auth.token
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAdd: (id, topic, text) => dispatch(actionCreators.add_question(id, topic, text)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionForm);