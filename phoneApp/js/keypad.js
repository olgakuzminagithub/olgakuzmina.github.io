class KeypadPage {
    constructor(store) {
        this.store = store;
    }
    componentDidMount() {
        api.getAllUsers().then(users => {
            this.store.setState(users);
        });
    }
    render() {
        const app = document.querySelector('#app');
        app.innerHTML = this.renderHeader() +this.renderMain();
        this.dialingNumber();
    }
    renderHeader() {
        return `<header class="header">
            <div class="container top-radius">
                <h2>Keypad</h2>
        </div>
        </header>`
    }
    renderMain() {
        return `<main class="main">
        <div class="container">
        <div class="number">
            <span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
            <span class ="numbers"></span>
            <span class="glyphicon glyphicon-circle-arrow-left" aria-hidden="true"></span>
        </div>
        <div class="keypad-holder">
            <button class="key">1</button>
            <button class="key">2</button>
            <button class="key">3</button>
            <button class="key">4</button>
            <button class="key">5</button>
            <button class="key">6</button>
            <button class="key">7</button>
            <button class="key">8</button>
            <button class="key">9</button>
            <button class="key">*</button>
            <button class="key">0</button>
            <button class="key">#</button>
            <button class="key"><span class="glyphicon glyphicon-earphone" aria-hidden="true"></span></button>
        </div>
        </div>
        </main>`
    }

    /*Приведение к единому фомату номера*/

    conversionPhoneFormat(phoneNumber) {
        switch(phoneNumber.length) {
            case 1: return phoneNumber.replace(/([0-9]{1})/, '($1)');
            case 2: return phoneNumber.replace(/([0-9]{2})/, '($1)');
            case 3: return phoneNumber.replace(/([0-9]{3})/, '($1)');
            case 4: return phoneNumber.replace(/([0-9]{3})([0-9]{1})/, '($1) $2'); break;
            case 5: return phoneNumber.replace(/([0-9]{3})([0-9]{2})/, '($1) $2'); break;
            case 6: return phoneNumber.replace(/([0-9]{3})([0-9]{2})([0-9]{1})/, '($1) $2-$3'); break;
            case 7: return phoneNumber.replace(/([0-9]{3})([0-9]{2})([0-9]{2})/, '($1) $2-$3'); break;
            case 8: return phoneNumber.replace(/([0-9]{3})([0-9]{2})([0-9]{2})([0-9]{1})/, '($1) $2-$3-$4'); break;
            case 9: return phoneNumber.replace(/([0-9]{3})([0-9]{2})([0-9]{2})([0-9]{2})/, '($1) $2-$3-$4'); break;
            case 10: return phoneNumber.replace(/([0-9]{3})([0-9]{2})([0-9]{2})([0-9]{3})/, '($1) $2-$3-$4'); break;
            default: break;
        }
    }

    /*Удаляем пробелы и символы из номера*/

    deleteSimbol(phoneNumber) {
        return phoneNumber.replace(/\D/g, "");
    }

    /*Преобразовнаие символов при вводе с клавиатуры */

    getChar(event) {
        console.log(event.which);
        if (event.which == null) { // IE
            if (event.keyCode < 32) return null; // спец. символ
            return String.fromCharCode(event.keyCode)
        }

        if (event.which != 0 && event.charCode != 0) { // все кроме IE
            if (event.which < 32) return null; // спец. символ
            return String.fromCharCode(event.which); // остальные
        }

        return null; // спец. символ
    }

    /*Набор и удаление номера*/

    dialingNumber() {
        const entryField = document.querySelector('.numbers');

        const buttons = document.querySelectorAll('button');

        for (let i = 0; i < buttons.length; i++) {
            buttons[i].onclick = () => {
                if (this.deleteSimbol(entryField.textContent).length < 10) {
                    entryField.textContent = this.deleteSimbol(entryField.textContent) +`${buttons[i].textContent}`;
                    entryField.innerHTML = this.conversionPhoneFormat(entryField.textContent);
                }
            }
        }

        /*Удалить цифру */

        const buttonDelete = document.querySelector('.glyphicon-circle-arrow-left');

        buttonDelete.onclick = () => {
            entryField.innerHTML = `${entryField.textContent.slice(0, -1)}`;
        };

        /*Набор номера с клавиатуры */

        document.onkeypress = (event) => {
            if ( this.deleteSimbol(entryField.textContent).length < 10) {
                entryField.textContent = this.deleteSimbol(entryField.textContent) + this.getChar(event);
                entryField.innerHTML = this.conversionPhoneFormat(entryField.textContent);
            }
        };

    }

}


