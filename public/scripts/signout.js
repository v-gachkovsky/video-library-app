function signout() {
  resetAuthHeaders();
  localStorage.removeItem('auth');

  location.replace('/signin.html');
}

const exit = document.getElementById('exit');
exit.addEventListener('click', () => signout());