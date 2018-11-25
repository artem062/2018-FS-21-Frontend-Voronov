import React, { Component } from 'react'
import { connect } from 'react-redux';
import FormInput from "../forms/components/formInput";
import * as actionCreators from '../../store/actions/userData';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
        };

        this.changeName = this.changeName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    changeName(value) {
        this.setState({
            name: value,
        });
    }

    handleSubmit(event) {
        if (this.state.name.length === 0) {
            this.props.onLogout();
        } else {
            this.props.onLogin(this.state.name);
        }
        event.preventDefault();
    }

    handleKeyPress(event) {
        if (event.keyCode === 13) {
            this.dispatchEvent(new Event('submit'));
        }
    }

    render() {
        let info;
        if (this.props.isLogin) {
            info = <h4>Текущий пользователь: {this.props.name}</h4>;
        } else {
            info = <h4>Авторизация (введите имя и подтвердите его)</h4>;
        }

        return (
            <form
                onSubmit={ this.handleSubmit }
                onKeyPress={ this.handleKeyPress }
            >
                <h2 align="center">Главная страница</h2>
                { info }
                <FormInput
                    label="Имя"
                    placeholder="Введите ваше имя"
                    value={this.state.name}
                    saveFun={this.changeName}
                />
                <input
                    type="submit"
                    value="Подтвердить"
                />
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        name: state.auth.name,
        isLogin: state.auth.isAuthorized,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (name) => dispatch(actionCreators.login(name)),
        onLogout: () => dispatch(actionCreators.logout()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);