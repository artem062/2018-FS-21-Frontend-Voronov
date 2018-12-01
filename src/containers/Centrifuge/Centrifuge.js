import Centrifuge from 'centrifuge';
import jwt from 'jsonwebtoken';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actionCreators from "../../store/actions/questionCollector";

const SECRET = 'c74900d9-462a-4244-80ef-8c30ec8692ad';

class CentrifugeClass extends Component {

    componentDidMount() {
        const token = jwt.sign({sub: null}, SECRET, {
            expiresIn: 86400,
        });
        const centrifuge = new Centrifuge('wss://voronov.chickenkiller.com/connection/websocket');
        centrifuge.setToken(token);
        centrifuge.subscribe('add_question', message => {
            this.props.onAddQuestion(message.data.id, message.data.name, message.data.text);
        });
        centrifuge.subscribe('add_answer', message => {
            this.props.onAddAnswer(message.data.question_id, message.data.name);
        });
        centrifuge.connect();
    }

    render() {
        return (
            <div></div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddQuestion: (id, topic, text) => dispatch(actionCreators.add_question(id, topic, text)),
        onAddAnswer: (id, text) => dispatch(actionCreators.add_answer(id, text)),
    }
};

export default connect(null ,mapDispatchToProps)(CentrifugeClass);