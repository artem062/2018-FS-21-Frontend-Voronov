import shadowStyles from './shadow.css';

const slotName = 'message-input';

const template = `
	<style>${shadowStyles.toString()}</style>
	<form>
		<div class="result"></div>
		<label>Тема</label>
		<form-input name="question_topic" placeholder="Введите тему вопроса" slot="${slotName}">
			<span slot="icon"></span>
		</form-input>
		<label>Текст</label>
		<form-input name="question_text" placeholder="Введите текст вопроса" slot="${slotName}">
			<span slot="icon"></span>
		</form-input>
		<input type="submit" value="Отправить">
	</form>
`;

class MessageForm extends HTMLElement {
	constructor () {
		super();
		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.innerHTML = template;
		this._initElements();
		this._addHandlers();
		if(!localStorage.getItem('topic')) {
            localStorage.setItem('topic', '');
        }
        if(!localStorage.getItem('text')) {
            localStorage.setItem('text', '');    
        }
        this._elements.message.innerText = 'Тема: ' + localStorage.getItem('topic') +  '\nТекст: ' + localStorage.getItem('text');
	}

	static get observedAttributes() {
		return [
			"action",
			"method"
		]
	}

	attributeChangedCallback(attrName, oldVal, newVal) {
		this._elements.form[attrName] = newVal;
	}

	_initElements () {
		var form = this.shadowRoot.querySelector('form');
		var message = this.shadowRoot.querySelector('.result');
		this._elements = {
			form: form,
			message: message
		};
	}

	_addHandlers () {
		this._elements.form.addEventListener('submit', this._onSubmit.bind(this));
		this._elements.form.addEventListener('keypress', this._onKeyPress.bind(this));
	}

	_onSubmit (event) {
	    var result = Array.from(this._elements.form.elements).map(
			el => el.value
		)
		this._elements.message.innerText = 'Тема: ' + result[0] + '\nТекст: ' + result[1];
		localStorage.setItem('topic', result[0]);
		localStorage.setItem('text', result[1]);
		event.preventDefault();
		return false;
	}
	
	_onKeyPress (event) {
		if (event.keyCode == 13) {
			this._elements.form.dispatchEvent(new Event('submit'));
		}
	}
}

customElements.define('message-form', MessageForm);
