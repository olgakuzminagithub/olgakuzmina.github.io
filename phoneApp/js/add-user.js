class AddUser {
    constructor (store) {
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
        this.addUser();
    }
    renderHeader() {
        return `<header class="header">
                <div class="container top-radius">
                    <nav class="user-top-line">
                        <a href="user.html">Cansel</a>
                        <button  type = "submit" formaction="#" formmethod="get" class = "done-btn">Done</button>
                    </nav>
                </div>
               </header>`
    }
    renderMain () {
        return `<main class="main">
        <div class="container">
            <div class="edit-main-info">
                <div class="edit-foto">
                    <button class="add-foto-btn"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
                        <span contenteditable="true">add foto</span></button>
                 </div>
                <div class="main-info-holder">
                    <div class="edit-field">
                        <button href="#" class="add-btn"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
                            <span contenteditable="true">First Name</span>
                        </button>
                    </div>
                    <div class="edit-field">
                        <button href="#" class="add-btn"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
                            <span contenteditable="true">Last Name</span>
                        </button>
                    </div>
                    <div class="edit-field">
                        <button href="#" class="add-btn"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
                            <span contenteditable="true">Company</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="scroll-holder">
                <div class="edit-info">
                    <div class="edit-field">
                        <button href="#" class="add-btn"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
                            <span contenteditable="true">phone</span>
                        </button>
                    </div>
                    <div class="edit-field">
                        <button href="#" class="add-btn"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
                            <span contenteditable="true">add  home phone</span>
                        </button>
                    </div>
                    <div class="edit-field">
                        <button href="#" class="add-btn"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
                            <span contenteditable="true">add email</span>
                        </button>
                    </div>
                    <div class="edit-field">
                        <button href="#" class="add-btn"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
                            <span contenteditable="true">add address</span>
                        </button>
                    </div>
                    <div class="edit-field">
                        <button href="#" class="add-btn"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
                            <span contenteditable="true">add birthday</span>
                        </button>
                    </div>
                    <div class="edit-field">
                        <button href="#" class="add-btn"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
                            <span contenteditable="true">add social profile</span>
                        </button>
                    </div>
                    <div class="edit-field">
                        <button href="#" class="add-btn"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
                            <span contenteditable="true">add field</span>
                        </button>
                    </div>
                    <div class="edit-field">
                        <button href="#" class="delete-contact">delete contact</button>
                    </div>
                </div>
            </div>
        </div>
    </main>`
    }

    /*Добавляем юзера на сервер*/

    serverAddUser (user) {
        const url = 'http://easycode-js.herokuapp.com/olku/users';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        this.componentDidMount();
    };

    conversionTextContent(text) {
        return text.replace(/\s/g, "");
    }

    /*Добавляем юзера при клике*/

    addUser() {
        const btnDone = document.querySelector('.done-btn');
        const user = {};


        btnDone.addEventListener('click', () => {
            const fields = document.querySelectorAll('.edit-field');
            if (this.conversionTextContent(fields[0].textContent) !== 'FirstName') {
                user.fullName = this.conversionTextContent(fields[0].textContent)
            }
            if (this.conversionTextContent(fields[1].textContent)!== 'LastName') {
                user.fullName += ' ' + this.conversionTextContent(fields[1].textContent)
            }
            if (this.conversionTextContent(fields[3].textContent) !== 'phone') {
                user.phone = this.conversionTextContent(fields[3].textContent)
            }
            if (this.conversionTextContent(fields[5].textContent)!== 'email') {
                user.email = this.conversionTextContent(fields[5].textContent)
            }
            this.serverAddUser(user);
            this.activeLink();
            this.store.setState({activePage : 'contacts'});
        });

    }
    activeLink () {
        const links = document.querySelectorAll('.tab');
        const contacts = document.querySelector('.contacts');
        links.forEach(link => {
            link.classList.remove('active')
        });
        contacts.classList.add('active');
    }

}
