import React, { Component } from 'react';
import Input from '../../components/forms/Input/Input';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/auth'
import { Redirect } from 'react-router-dom';
import './Auth.css'

class Auth extends Component {
    state = {
        loginForm: {
            login: {
                label: 'Введите логин',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Логин'
                },
                value: '',
                valid: false,
                touched: false,
                validation: {
                    isRequired: true,
                    minLength: 4,
                }
            },
            password: {
                elementType: 'input',
                value: '',
                label: 'Введите пароль',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Пароль'
                },
                touched: false,
                valid: false,
                validation: {
                    isRequired: true,
                    minLength: 8,
                }
            }
        },
        valid: false,
        hint: false,
    };

    handleFormConfirm = (event) => {
        event.preventDefault();

        if(!this.state.valid) {
            this.setState({
                hint: true
            });
            return
        }

        this.setState({
            hint: false
        });

        const result = Object
            .keys(this.state.loginForm)
            .reduce((res, key) => {
                res[key] = this.state.loginForm[key].value;
                return res
            }, {});
        this.props.onAuth(result.login, result.password);
    };

    checkValidity = (value, rule) => {
        let isValid = true;
        if (rule.isRequired) {
            isValid = value.trim()!== '';
        }
        if (rule.minLength) {
            isValid = value.trim().length >= rule.minLength && isValid;
        }
        return isValid;
    };

    handleInput = (event, key) => {
        const newFormData = {
            ...this.state.loginForm
        };
        const inputData = {
            ...this.state.loginForm[key],
        };

        inputData.touched = true;
        inputData.value = event.target.value;
        inputData.valid = this.checkValidity(inputData.value, inputData.validation);

        const invalid = Object.keys(newFormData).some(inputs => {
            if (key === inputs) {
                return !inputData.valid
            }
            return !newFormData[inputs].valid;
        });

        newFormData[key] = inputData;
        this.setState({
            loginForm: newFormData,
            valid: !invalid,
        });
    };

    render() {
        if(this.props.isLogin) {
            return <Redirect to='/question/add'/>
        }

        const inputs = Object
            .keys(this.state.loginForm)
            .map(key => {
                const element = this.state.loginForm[key];
                return <Input
                    key={key}
                    elementType={element.elementType}
                    elementConfig={element.elementConfig}
                    value={element.value}
                    valid={element.valid}
                    label={element.label}
                    touched={element.touched}
                    invalid={!element.valid}
                    changed={(event) => this.handleInput(event, key)}
                />
            });

        let error;
        if(this.props.error && !this.state.hint) {
            if (this.props.error.response && this.props.error.response.data) {
                error = <h4 className="error">Проблема со входом: { this.props.error.response.data }</h4>;
            } else {
                error = <h4 className="error">Проблема со входом: { this.props.error.message }</h4>;
            }
        }

        let hint;
        if (this.state.hint) {
            hint = <div className="error">
                Логин должен содержать минимум 4 символа <br/>
                Пароль должен содержать минимум 8 символов <br/>
            </div>
        }

        return (
            <form onSubmit={this.handleFormConfirm}>
                {inputs}
                {error}
                {hint}
                <button type='submit'>Войти</button>
                {this.props.token}
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLogin: state.auth.token !== null,
        error: state.auth.error,
    }
};

const mapDispatchToProps = (dispatch) => {
    return  {
        onAuth: (login, password) => dispatch(actions.auth(login, password))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);