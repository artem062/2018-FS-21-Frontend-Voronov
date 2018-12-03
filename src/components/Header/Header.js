import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import Centrifuge from "../../containers/Centrifuge/Centrifuge";

class Header extends Component {
    render() {
        let hiddenLinks;
        if (this.props.isLogin) {
            let unread;
            if(this.props.questions !== 0) {
                unread = ` (${this.props.questions})`
            }
            hiddenLinks = <div>
                <ul>
                    <li>
                        <Link to='/profile'>Профиль</Link>
                    </li>
                    <li>
                        <Link to='/question'>Список вопросов{ unread }</Link>
                    </li>
                    <li>
                        <Link to='/question/add'>Задать вопрос</Link>
                    </li>
                </ul>
                <Centrifuge/>
            </div>
        } else {
            hiddenLinks =
                <ul>
                    <li>
                        <Link to='/'>Вход</Link>
                    </li>
                </ul>
        }

        return hiddenLinks;
    }
}

const mapStateToProps = state => {
    return {
        isLogin: state.auth.token !== null,
        questions: state.quest.new_questions,
    }
};

export default connect(mapStateToProps)(Header);