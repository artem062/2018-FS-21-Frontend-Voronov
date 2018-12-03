/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';

import Layout from './components/Layout/Layout'
import QuestionList from "./containers/question_list/questionList";
import MainPage from './containers/mainPage/MainPage'
import QuestionForm from './components/forms/question-form/questionForm';
import AnswerList from './containers/answer_list/answerList'
import Profile from "./components/forms/Profile/Profile";

class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Layout>
                        <Route exact path='/' component={ MainPage } />
                        <Route exact path='/profile' component={ Profile } />
                        <Route exact path='/question' component={ QuestionList } />
                        <Route path='/question/add' component={ QuestionForm } />
                        <Route path='/answer/add' component={ AnswerList } />
                    </Layout>
                </Router>
            </div>
        );
    }
}

export default App;