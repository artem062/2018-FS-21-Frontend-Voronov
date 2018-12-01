/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';

import Layout from './components/Layout/Layout'
import QuestionList from "./containers/question_list/questionList";
import MainPage from './containers/mainPage/MainPage'
import QuestionForm from './components/forms/question-form/questionForm';
import AnswerList from './containers/answer_list/answerList'

class App extends Component {
    render() {
        return (
            <Router>
                <Layout>
                    <Route exact path='/' component={ MainPage } />
                    <Route exact path='/question' component={ QuestionList } />
                    <Route path='/question/add' component={ QuestionForm } />
                    <Route path='/answer/add' component={ AnswerList } />
                </Layout>
            </Router>
        );
    }
}

export default App;