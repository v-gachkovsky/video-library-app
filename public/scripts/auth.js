const API = 'http://localhost:9000/api';

const Axios = axios.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  responseType: 'json'
});

function restoreSession() {
  const auth = JSON.parse(localStorage.getItem('auth'));
  if (!auth) {
    location.replace('/signin.html');
    return;
  }

  setAuthHeaders(auth.token, auth.email);
}

function setAuthHeaders(token, email) {
  Axios.defaults.headers.common['X-User-Token'] = token;
  Axios.defaults.headers.common['X-User-Email'] = email;
}

function resetAuthHeaders() {
  delete Axios.defaults.headers.common['X-User-Token'];
  delete Axios.defaults.headers.common['X-User-Email'];
}
