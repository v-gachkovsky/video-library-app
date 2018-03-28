const submitButton = document.getElementById('submit-button');
submitButton.addEventListener('click', (e) => {
  e.preventDefault();

  const email = document.getElementById('user-email').value;
  const password = document.getElementById('user-password').value;

  if (email.trim().length === 0) return;
  if (password.trim().length < 6) return;

  Axios.post('/signin', { email, password }).then(({ data: { success, email, token } }) => {
    if (!success) return;

    localStorage.setItem('auth', JSON.stringify({ email, token }));
    setAuthHeaders(token, email);

    location.replace('/');
  }).catch(error => {
    console.log('error', error);
  })
});
