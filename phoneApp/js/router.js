class Router {
    /*Ренедеим футер*/
    constructor (store) {
        this.store = store;
    }

    render () {
        const mountNode = document.querySelector('#mountNode');
        mountNode.innerHTML = `
        <div id="app"></div>
        <footer class="footer">
            <div class="container bottom-radius">
                <nav class="main-nav">
                    ${this.renderLink({ url: 'contacts', content:'Contacts', className:'active contacts', icon:'search'})}
                    ${this.renderLink({ url: 'keypad', content:'Keypad',  icon:'th'})}
                    ${this.renderLink({ url: 'edit-contact', content:'Edit contact', className:'edituser', icon:'pencil'})}
                    ${this.renderLink({ url: 'user', content:'User', className: 'user', icon:'user'})}
                    ${this.renderLink({ url: 'add-user', content:'Add user', icon:'plus'})}
                 </nav>
             </div>
         </footer>
        `
        this.switchRouter();
    }
    /*Ренедеим ссылки в футере*/

    renderLink (linkProperties) {
        return `
        <a href="${linkProperties.url}.html" class="tab ${linkProperties.className}">
                <span class="glyphicon glyphicon-${linkProperties.icon}" aria-hidden="true"></span>
                <span class = "tab-text">${linkProperties.content}</span>
         </a>`

    }

    /*Преобразуем контент в сыылке в нужный формат */

    conversionActiveLink(text) {
        return text.replace(/-/g, "").replace(/.html/, "");
    }

    /*Переключатель вкладок в футере*/

    switchRouter() {
        const links = document.querySelectorAll('.tab');
        for (let i = 0; i < links.length; i++) {
            let href = this.conversionActiveLink(links[i].getAttribute('href'));
            links[i].addEventListener('click', (event) => {
                event.preventDefault();
                this.store.setState({activePage : href});
                for (let j = 0; j < links.length; j ++) {
                    if (i !== j) {
                        links[j].classList.remove('active')
                    }
                }
            })
        }
    }
}