(function () {
  const API = 'http://localhost:9000/api';
  const videoLibraryURL = `${API}/videos`;

  let library = [];

  function init() {
    const ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        library = JSON.parse(this.responseText);
        makeVideosThumbnails();
        console.log('library', library);
      }
    };

    ajax.open('GET', videoLibraryURL, true);
    ajax.send();
  }

  function makeVideosThumbnails() {

  }

  init();
})();
