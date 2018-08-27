class Api {
    getAllUsers() {
        const url = 'https://easycode-js.herokuapp.com/olku/users';
        return fetch(url)
            .then(users => {
                return users.json()
            })
    }
}
const api = new Api();
