/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import './App.css';
import QuestionForm from './components/forms/question-form/questionForm';
import AnswerForm from './components/forms/answer-form/answerForm'
import Layout from './components/Layout/Layout'
import { BrowserRouter as Router, Route} from 'react-router-dom';
import QuestionList from "./components/lists/question_list/questionList";

const MainPage = () => (
    <div>
        <h2 align="center">Главная страница</h2>
    </div>
);

class App extends Component {
    render() {
        return (
            <Router>
                <Layout>
                    <Route exact path='/' component={ MainPage } />
                    <Route exact path='/question' component={ QuestionList } />
                    <Route path='/question/add' component={ QuestionForm } />
                    <Route path='/answer/add' component={ AnswerForm } />
                </Layout>
            </Router>
        );
    }
}

export default App;