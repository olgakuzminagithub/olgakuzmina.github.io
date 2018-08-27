class EditUser {
    constructor (store) {
        this.store = store;
        this.user = {};
    }

    componentDidMount() {
        api.getAllUsers().then(users => {
            this.store.setState(users);
        });
    }

    constructorUser(user) {
        let newUser = {};
        newUser.id = user._id;
        newUser.name = user.fullName.split(' ')[0];
        newUser.lastName = user.fullName.split(' ')[1] ? user.fullName.split(' ')[1] : ' ';
        newUser.email = user.email;
        newUser.phone = user.phone;
        return newUser;
    }

    render() {
        let store = this.store.getState();
        store.users.forEach(user => {
            if (user._id === store.activeId) {
                this.user = this.constructorUser(user);
            }
        });
        const app = document.querySelector('#app');
        app.innerHTML = this.renderHeader() +this.renderMain();
        this.addEventHandlers();
    }

    renderHeader() {
        return `<header class="header">
                <div class="container top-radius">
                    <nav class="user-top-line">
                        <a class="cansel-btn" href="user.html">Cansel</a>
                        <button  type = "submit" formaction="#" formmethod="get" class = "done-btn">Done</button>
                    </nav>
                </div>
               </header>`
     }

     renderMain () {
        return `<main class="main">
        <div class="container">
            <div class="edit-main-info">
                <div class="edit-foto"><img src="images/user-face-mini.png" alt="#" class=" user-img img-circle center-block"></div>
                <div class="main-info-holder">
                    <div class="edit-field">
                        <button href="#" class="delete-btn"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
                            <span contenteditable="true">${this.user.name ? this.user.name : 'add name'} </span>
                        </button>
                    </div>
                    <div class="edit-field">
                        <button href="#" class="delete-btn"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
                            <span contenteditable="true">${this.user.lastName ? this.user.lastName : 'add LastName'}</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="scroll-holder">
                <div class="edit-info">
                    <div class="edit-field">
                        <button href="#" class="delete-btn"><span class="glyphicon glyphicon-minus-sign" aria-hidden="true"></span>
                            <span contenteditable="true">${this.user.phone ? this.user.phone : 'add phone'}</span>
                        </button>
                    </div>
                    <div class="edit-field">
                        <button href="#" class="delete-btn"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
                            <span contenteditable="true">${this.user.email ? this.user.email : 'add email'}</span> 
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

    addEventHandlers() {
        this.editUser();
        this.deleteUser();
        this.canselEdit();
    }

    /*Изменяем юзера на сервер*/

    serverEditUser (user, id) {
        const url = "https://easycode-js.herokuapp.com/olku/users/" + id;
        fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
    };

    conversionTextContent(text) {
        return text.replace(/\s/g, "");
    }

    /*Изменяем юзера при клике*/

    editUser() {
        const btnDone = document.querySelector('.done-btn');
        const {activeId} = this.store.getState();
        const user = {};


        btnDone.addEventListener('click', () => {
            const fields = document.querySelectorAll('.edit-field');
            if (this.conversionTextContent(fields[0].textContent) !== 'FirstName') {
                user.fullName = this.conversionTextContent(fields[0].textContent)
            }
            if (this.conversionTextContent(fields[1].textContent)!== 'LastName') {
                user.fullName += ' ' + this.conversionTextContent(fields[1].textContent)
            }
            if (this.conversionTextContent(fields[3].textContent) !== 'add phone') {
                user.phone = this.conversionTextContent(fields[3].textContent)
            }
            if (this.conversionTextContent(fields[5].textContent)!== 'add email') {
                user.email = this.conversionTextContent(fields[5].textContent)
            }
            this.serverEditUser(user, activeId);
            this.returnContact();
        });
    }

    serverDeleteUser(id) {
        const url = "https://easycode-js.herokuapp.com/olku/users/" + id;
        fetch(url, {
            method: 'DELETE',
        });
        this.componentDidMount();
    }

    deleteUser() {
        const btnDelete = document.querySelector('.delete-contact');
        const {activeId} = this.store.getState();
        btnDelete.addEventListener('click', () => {
            this.serverDeleteUser(activeId);
            this.componentDidMount();
            this.returnContact();
        })
    }

    canselEdit() {
        const btnCansel = document.querySelector('.cansel-btn');
        btnCansel.addEventListener('click', (event) => {
            event.preventDefault();
            this.returnContact();
        })
    }

    returnContact () {
        const links = document.querySelectorAll('.tab');
        const contacts = document.querySelector('.contacts');
        links.forEach(link => {
            link.classList.remove('active')
        });
        contacts.classList.add('active');
        this.store.setState({activePage : 'contacts'});
    }
}

