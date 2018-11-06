/* eslint no-underscore-dangle: 0 */
/* eslint-env browser */
// import styles from './index.css';
import shadowStyles from './shadow.css';

const template = `
    <style>${shadowStyles.toString()}</style>
    <input />
    <slot name="icon"></slot>
`;

class FormInput extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = template;
    this._initElements();
    this._addHandlers();
  }

  static get observedAttributes() {
    return [
      'name',
      'placeholder',
      'value',
      'disabled',
    ];
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    this.elements.input[attrName] = newVal;
  }

  _initElements() {
    const hiddenInput = document.createElement('input');
    const input = this.shadowRoot.querySelector('input');
    this.appendChild(hiddenInput);
    this.elements = {
      input,
      hiddenInput,
    };
  }

  _addHandlers() {
    this.elements.input.addEventListener('input', this._onInput.bind(this));
  }

  _onInput() {
    this.elements.hiddenInput.value = this.elements.input.value;
  }
}

customElements.define('form-input', FormInput);
