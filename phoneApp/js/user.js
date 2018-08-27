class User {
    constructor (store) {
        this.store = store;
        this.user = {};
    }

    componentDidMount() {
        api.getAllUsers().then(users => {
            this.store.setState(users);
        });
    }

    render () {
        let store = this.store.getState();
        store.users.forEach(user => {
            if (user._id === store.activeId) {
                this.user = user;
            }
        });
        const app = document.querySelector('#app');
        app.innerHTML = this.renderHeader() +this.renderMain();
        this.editUser();

    }

    renderHeader () {
        return`<header class="header">
                    <div class="container top-radius">
                        <div class="user-top-line">
                            <a href="index.html">
                                <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                                Contacts</a>
                            <a id="edit-contact-top" href="edit-contact.html">Edit</a>
                        </div>
                    </div>
               </header>`

    }
    renderMain () {
        return `
        <main class="main">
			<div class="container">
				<img src="images/user-face.png" alt="#" class=" user-img img-circle center-block">
				<div class="user-name">${this.user.fullName}</div>
				<div class="options-line">
					<div class="message">
						<div class= "options-icon"><span class="icon glyphicon glyphicon-comment" aria-hidden="true"></span></div>
						<span class = "options-text">message</span>
					</div>
					<div class="call">
						<div class= "options-icon"><span class="icon glyphicon glyphicon-earphone" aria-hidden="true"></span></div>
						<span class = "options-text">call</span>
					</div>
					<div class="video">
						<div class= "options-icon"><span class="icon glyphicon glyphicon-facetime-video" aria-hidden="true"></span></div>
						<span class = "options-text">video</span>
					</div>
					<div class="mail">
						<div class= "options-icon"><span class="icon glyphicon glyphicon-envelope" aria-hidden="true"></span></div>
						<span class = "options-text">mail</span>
					</div>
				</div>
				<div class="tel-number">
					<h3>mobile</h3>
					<div>${this.user.phone}</div>
				</div>
				<div class="tel-number">
					<h3>email</h3>
					<div>${this.user.email}<div>
				</div>
				<div class="options-table">
					<div class ="options-item"><a href="#">Notes</a></div>
					<div class ="options-item"><a href="#">Send message</a></div>
					<div class ="options-item"><a href="#">Share contact</a></div>
					<div class ="options-item"><a href="#">Add to favorites</a></div>
					<div class ="options-item"><a href="#">Share my location</a></div>
					<div class ="options-item"><a href="#">Block this caller</a></div>
				</div>
			</div>
		</main>
        `
    }
    editUser () {
        const editContact = document.querySelector('#edit-contact-top');
        const links = document.querySelectorAll('.tab');
        const editUser = document.querySelector('.edituser');
        editContact.addEventListener('click', (event) => {
            event.preventDefault();
            links.forEach(link => {
                link.classList.remove('active')
            });
            editUser.classList.add('active');
            this.store.setState({activePage : 'editcontact'});
        })
    }

}
