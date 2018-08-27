class App {
    constructor() {
        const store = this.createStore();

        this.pages = {
            contacts: new ContactPage(store),
            keypad: new KeypadPage(store),
            editcontact: new EditUser(store),
            user: new User(store),
            adduser: new AddUser(store),
        };

        this.state = store.getState();

        this.router =  new Router(store);

        this.render();
    }


    createStore() {
        let state = {
            users: [],
            activePage: 'contacts',
            activeId: '',
        };

        const getState = () => {
            return state;
        };

        const setState = (newState) => {
            state = {
                ...state,
                ...newState,
            };
           this.pages[state.activePage].render();
        };

        return {
            getState,
            setState
        }
    }

    updateView() {
        const activePage = this.state.activePage;
        this.pages[activePage].componentDidMount();
    }

    render() {
        this.router.render();
        this.updateView();
    }


    static initialize() {
        const app  = new App();
        app.render();
    }
}




App.initialize();




