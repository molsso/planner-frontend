import axios from "axios";

export default {
    login,
    signup,
    logout,
    isAuthenticated,
    getCurrentUser
};

function login(username, password) {
    return axios.post('/api/auth/login', {username, password})
        .then(response => createSession(response.data));
}

function logout() {
    localStorage.removeItem('currentUser');
}

function signup(user) {
    return axios.post('/api/auth/singup', user);
}

function isAuthenticated() {
    return 'currentUser' in localStorage;
}

function createSession(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

