import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router";
import FormInput from '../components/formInput';
import FileInput from '../components/fileInput';
import './index.css'
// import axios from "axios";
import * as actionCreators from "../../../store/actions/auth";

class Profile extends Component {
    constructor(props) {
        super(props);
        let imageUrl = '';
        if (this.props.avatar) {
            imageUrl = URL.createObjectURL(this.props.avatar);
        }
        this.state = {
            login: this.props.login || '',
            email: this.props.email || '',
            avatar: this.props.avatar,
            avatarSrc: imageUrl,
            status: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateUsername = this.updateUsername.bind(this);
        this.updateEmail = this.updateEmail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateFile = this.updateFile.bind(this);
    }

    updateUsername (value) {
        this.setState({
            login: value
        })
    }

    updateEmail (value) {
        this.setState({
            email: value
        })
    }

    updateFile (value) {
        this.setState({
            avatar: value,
        })
    }

    handleSubmit (event) {
        if (this.state.login.length === 0 || this.state.email.length === 0) {
            this.setState({
                status: 'Введите логин и почту',
            });
            event.preventDefault();
            return
        }

        this.setState({
            status: 'Загрузка...',
        });

        //TODO send to backend

        this.setState({
            status: 'Сохранено',
        });

        const imageUrl = URL.createObjectURL(this.state.avatar);
        this.setState({
            avatarSrc: imageUrl
        });

        this.props.onSave(
            this.state.login,
            this.state.email,
            this.state.avatar
        );
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

        let status;
        if (this.state.status) {
            setTimeout(() => {
                this.setState({
                    status: ''
                }
            )}, 1000);
            status = <div className="status" align="center">{ this.state.status }</div>
        }

        return (
            <form
                onSubmit={ this.handleSubmit }
                onKeyPress={ this.handleKeyPress }
            >
                <h2 align="center">Профиль</h2>
                <div className="result">
                    Логин: { this.props.login } <br/>
                    Email: { this.props.email } <br/>
                    <img
                        alt=''
                        height="100px"
                        src={ this.state.avatarSrc }
                    />
                </div>

                <FormInput
                    label="Логин"
                    placeholder="Введите логин"
                    name="login"
                    value={ this.state.login }
                    saveFun={ this.updateUsername }
                />

                <FormInput
                    label="Почта"
                    placeholder="Введите почту"
                    name="email"
                    value={ this.state.email }
                    saveFun={ this.updateEmail }
                />

                <FileInput
                    saveFun={ this.updateFile }
                />

                {status}

                <input type="submit" value="Сохранить"/>
            </form>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLogin: state.auth.token !== null,
        login: state.auth.token,
        email: state.auth.email,
        avatar: state.auth.avatar,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSave: (login, email, avatar) => dispatch(actionCreators.updateProfile(login, email, avatar)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);