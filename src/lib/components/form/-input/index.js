import React, { Component } from 'react';
import './shadow.css'

export class FormInput extends Component {
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
    }, () => {
      this.state.saveFun(this.state.value);
    });
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
          />
        </label>
        <slot name="icon"/>
      </div>
    );
  }
}
