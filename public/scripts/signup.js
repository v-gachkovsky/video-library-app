const submitButton = document.getElementById('submit-button');
submitButton.addEventListener('click', e => {
  e.preventDefault();

  const firstName = document.getElementById('user-firstName').value;
  const lastName = document.getElementById('user-lastName').value;
  const email = document.getElementById('user-email').value;
  const password = document.getElementById('user-password').value;

  if (email.trim().length === 0) return;
  if (password.trim().length < 6) return;

  Axios.post('/signup', {
      firstName,
      lastName,
      email,
      password
  }).then(({ data: { success } }) => {
    if (!success) return;
    location.replace('/signin.html');
  }).catch(error => {
    console.log('error', error);
  })
});