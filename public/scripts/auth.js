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

  Axios.get('/user').then(({ data: { user } }) => {
    const userNameField = document.getElementById('user-name');
    let userName;

    if (user.firstName && user.lastName) {
      userName = `${user.firstName} ${user.lastName}`;
    } else if (user.firstName && !user.lastName) {
      userName = `${user.firstName}`;
    } else {
      userName = `${user.email}`;
    }

    userNameField.innerHTML = userName;
  }).catch(error => {
    console.log(error);
  })
}

function setAuthHeaders(token, email) {
  Axios.defaults.headers.common['X-User-Token'] = token;
  Axios.defaults.headers.common['X-User-Email'] = email;
}

function resetAuthHeaders() {
  delete Axios.defaults.headers.common['X-User-Token'];
  delete Axios.defaults.headers.common['X-User-Email'];
}
