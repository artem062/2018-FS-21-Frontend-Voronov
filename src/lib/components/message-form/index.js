/* eslint no-underscore-dangle: 0 */
/* eslint-env browser */
import shadowStyles from './shadow.css';

const slotName = 'message-input';

const template = `
    <style>${shadowStyles.toString()}</style>
    <form class="dropbox">
        <div class="result"></div>
        <label>Тема</label>
        <form-input name="question_topic" placeholder="Введите тему вопроса" slot="${slotName}">
            <span slot="icon"></span>
        </form-input>
        <label>Текст</label>
        <form-input name="question_text" placeholder="Введите текст вопроса" slot="${slotName}">
            <span slot="icon"></span>
        </form-input>
        <label>Геолокация</label>
        <form-input class="shareGeo" placeholder="Ввести геопозицию" slot="${slotName}">
            <span slot="icon"></span>
        </form-input>
        <img src="" class="image" height="100px">
        <input type="file" class="fileInput">
        <input type="submit" value="Отправить">
    </form>
`;

class MessageForm extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = template;
    this._initElements();
    this._addHandlers();
    if (!localStorage.getItem('topic')) {
      localStorage.setItem('topic', '');
    }
    if (!localStorage.getItem('text')) {
      localStorage.setItem('text', '');
    }
    this._elements.message.innerText = `Тема: ${localStorage.getItem('topic')}\nТекст: ${localStorage.getItem('text')}`;
  }

  _initElements() {
    const form = this.shadowRoot.querySelector('form');
    const message = this.shadowRoot.querySelector('.result');
    const geoButton = this.shadowRoot.querySelector('.shareGeo');
    const fileInput = this.shadowRoot.querySelector('.fileInput');
    const dropbox = this.shadowRoot.querySelector('.dropbox');
    this._elements = {
      form,
      message,
      geoButton,
      fileInput,
      dropbox,
    };
  }

  _addHandlers() {
    this._elements.form.addEventListener('submit', this._onSubmit.bind(this));
    this._elements.form.addEventListener('keypress', this._onKeyPress.bind(this));
    this._elements.fileInput.addEventListener('change', this._onFileLoad.bind(this));
    this._elements.geoButton.addEventListener('click', this._onShareGeo.bind(this));
    this._elements.dropbox.addEventListener('dragenter', MessageForm._onDrag.bind(this));
    this._elements.dropbox.addEventListener('dragover', MessageForm._onDrag.bind(this));
    this._elements.dropbox.addEventListener('drop', this._onDrop.bind(this));
  }

  static _onDrag(event) {
    event.stopPropagation();
    event.preventDefault();
    return false;
  }

  _onDrop(event) {
    const image = this.shadowRoot.querySelector('.image');
    const url = URL.createObjectURL(event.dataTransfer.files[0]);
    document.imageurl = url;
    image.onload = () => URL.revokeObjectURL(url);
    image.src = url;
    event.stopPropagation();
    event.preventDefault();
    return false;
  }

  _onFileLoad(event) {
    const image = this.shadowRoot.querySelector('.image');
    const url = URL.createObjectURL(this.shadowRoot.querySelector('input[type=file]').files[0]);
    document.imageurl = url;
    image.onload = () => URL.revokeObjectURL(url);
    image.src = url;
    event.preventDefault();
    return false;
  }

  _onShareGeo(event) {
    navigator.geolocation.getCurrentPosition((position) => {
      this._elements.geoButton.setAttribute('value', `${position.coords.latitude}; ${position.coords.longitude}`);
    });
    event.preventDefault();
    return false;
  }

  _onSubmit(event) {
    const result = Array.from(this._elements.form.elements).map(
      el => el.value,
    );
    this._elements.message.innerText = `Тема: ${result[0]}\nТекст: ${result[1]}`;
    localStorage.setItem('topic', result[0]);
    localStorage.setItem('text', result[1]);
    event.preventDefault();
    return false;
  }

  _onKeyPress(event) {
    if (event.keyCode === 13) {
      this._elements.form.dispatchEvent(new Event('submit'));
    }
  }
}

customElements.define('message-form', MessageForm);
