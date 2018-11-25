import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

class Header extends Component {
    render() {
        let hiddenLinks;
        if (this.props.isLogin) {
            let unread;
            if(this.props.questions !== 0) {
                unread = ` (${this.props.questions})`
            }
            hiddenLinks = <div>
                <li>
                    <Link to='/question'>Список вопросов{ unread }</Link>
                </li>
                <li>
                    <Link to='/question/add'>Задать вопрос</Link>
                </li>
                <li>
                    <Link to='/answer/add'>Ответить</Link>
                </li>
            </div>
        }

        return (
            <ul>
                <li>
                    <Link to='/'>Главная</Link>
                </li>
                { hiddenLinks }
            </ul>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLogin: state.auth.isAuthorized,
        questions: state.quest.new_questions,
    }
};

export default connect(mapStateToProps)(Header);