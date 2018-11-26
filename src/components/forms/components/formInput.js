import React, { Component } from 'react';
import './index.css'

class FormInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: props.label,
      placeholder: props.placeholder,
      name: props.name,
      value: props.value,
      saveFun: props.saveFun
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });

    if (this.state.saveFun) {
      this.state.saveFun(event.target.value);
    }
  }

  handleClick(event) {}

  render() {
    return (
      <div onClick={ this.handleClick }>
        <label>
          { this.state.label }
          <input
              className='myInput'
              value={ this.state.value }
              onChange={ this.handleChange }
              placeholder={ this.state.placeholder }
          />
        </label>
        <slot name="icon"/>
      </div>
    );
  }
}

export default FormInput;
