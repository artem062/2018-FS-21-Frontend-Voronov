import React, { Component } from 'react';
import { FormInput } from '../form/-input';

class ShareGeo extends FormInput {
  constructor(props) {
    super(props);

    this.takeGeo = this.takeGeo.bind(this);
  }

  takeGeo() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        value: `${position.coords.latitude}, ${position.coords.longitude}`
      }, () => {
        this.state.saveFun(this.state.value);
      });
    });
    event.preventDefault();
  }

  handleClick(event) {
    this.takeGeo();
  }

  handleChange(event) {
    this.takeGeo();
  }
}

class FileInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: '',
      saveFun: props.saveFun
    };

    this.handleChange = this.handleChange.bind(this);
    FileInput.handleDrag = FileInput.handleDrag.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  handleChange (files) {
    this.state.saveFun(files[0]);
    const url = URL.createObjectURL(files[0]);
    this.setState({
      imageUrl: url
    });
    event.preventDefault();
  }

  static handleDrag (event) {
    event.stopPropagation();
    event.preventDefault();
  }

  handleDrop (event) {
    this.handleChange(event.dataTransfer.files);
    event.preventDefault();
  }

  render() {
    return (
      <div
        onDrag={ FileInput.handleDrag }
        onDrop={ this.handleDrop }
      >
        <img
          src={ this.state.imageUrl }
          className="image"
          height="100px"
        />
          <input
            type="file"
            onChange={ (event) => this.handleChange(event.target.files) }
            onLoad={ () => URL.revokeObjectURL(this.state.imageIrl) }
          />
      </div>
    )
  }
}

export class MessageForm extends Component {
  constructor(props) {
    super(props);
    if (!localStorage.getItem('topic')) {
      localStorage.setItem('topic', '');
    }
    if (!localStorage.getItem('text')) {
      localStorage.setItem('text', '');
    }
    if (!localStorage.getItem('geo')) {
      localStorage.setItem('geo', '');
    }
    this.state = {
      topic: localStorage.getItem('topic'),
      text: localStorage.getItem('text'),
      geo: localStorage.getItem('geo'),
      status: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateTopic = this.updateTopic.bind(this);
    this.updateText = this.updateText.bind(this);
    this.updateGeo = this.updateGeo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateFile = this.updateFile.bind(this);
  }

  updateTopic (value) {
    this.setState({
      topic: value
    })
  }

  updateText (value) {
    this.setState({
      text: value
    })
  }

  updateGeo (value) {
    this.setState({
      geo: value
    })
  }

  updateFile (value) {
    this.setState({
      file: value
    })
  }

  handleSubmit (event) {
    localStorage.setItem('topic', this.state.topic);
    localStorage.setItem('text', this.state.text);
    localStorage.setItem('geo', this.state.geo);
    this.setState({ status: 'Загрузка...' });
    const data = new FormData();
    data.append('topic', this.state.topic);
    data.append('text', this.state.text);
    data.append('geo', this.state.geo);
    data.append('file', this.state.file);
    const myHeaders = new Headers({
      'Access-Control-Allow-Origin': '/',
    });
    fetch('http://localhost:8000/question/add', {
      method: 'POST',
      body: data,
      headers: myHeaders,
    }).then((response) => {
      if (response.ok) {
        this.setState({ status: 'Успешно загружено!'});
      } else {
        this.setState({ status: 'Ошибка при загрузке'});
      }
    });
    event.preventDefault();
  }

  handleKeyPress(event) {
    if (event.keyCode === 13) {
      this.dispatchEvent(new Event('submit'));
    }
  }

  render() {
    return (
      <form
        onSubmit={ this.handleSubmit }
        onKeyPress={ this.handleKeyPress }
      >
        <div className="result">
          Тема: { this.state.topic } <br/>
          Текст: { this.state.text } <br/>
          Геопозиция: { this.state.geo }
        </div>

        <FormInput
          label="Тема"
          placeholder="Введите тему вопроса"
          name="question-topic"
          value={ this.state.topic }
          saveFun={ this.updateTopic }
        />

        <FormInput
          label="Текст"
          placeholder="Введите текст вопроса"
          name="question-text"
          value={ this.state.text }
          saveFun={ this.updateText }
        />

        <ShareGeo
          label="Геопозиция"
          placeholder="Введите геопозицию"
          value={ this.state.geo }
          saveFun={ this.updateGeo }
        />

        <table className="footer">
          <tbody>
            <tr>
              <td><FileInput saveFun={ this.updateFile } /></td>
              <td><div className="status" align="right">{ this.state.status }</div></td>
            </tr>
          </tbody>

        </table>

        <input type="submit" value="Отправить"/>
      </form>
    )
  }
}
