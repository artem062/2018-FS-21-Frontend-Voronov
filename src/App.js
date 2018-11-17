/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import './App.css';
import { MessageForm } from './lib/components/message-form';


class App extends Component {
    render() {
        return (
            <div>
                <h2 align="center">Задать вопрос</h2>
                <div className="App">
                    <MessageForm />
                </div>
            </div>
        );
    }
}

export default App;