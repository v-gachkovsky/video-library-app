(function () {
  const API = 'http://localhost:9000/api';
  const videoLibraryURL = `${API}/videos`;

  let library = [];

  function init() {
    $(document).ready(() => {
      $("#myModal").on("hidden.bs.modal", () => {
        $("#iframeYoutube").attr("src","#");
      });
    });

    const ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        library = JSON.parse(this.responseText);
        makeVideosThumbnails();
      }
    };

    ajax.open('GET', videoLibraryURL, true);
    ajax.send();
  }

  function makeVideosThumbnails() {
    library.forEach(video => {
      const thumbnail = document.createElement('img');
      thumbnail.src = `http://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`;

      const thumbnailTitle = document.createElement('h4');
      thumbnailTitle.className = 'thumbnail-video-title';
      thumbnailTitle.innerHTML = video.title;

      const thumbnailContainer = document.createElement('div');
      thumbnailContainer.className = 'thumbnail-video-container';
      thumbnailContainer.addEventListener('click', showVideo.bind(null, video.videoId));

      thumbnailContainer.appendChild(thumbnail);
      thumbnailContainer.appendChild(thumbnailTitle);

      const videoLibraryContainer = document.getElementById('video-library');
      videoLibraryContainer.appendChild(thumbnailContainer);
    });
  }

  function showVideo(videoId) {
    const iframe = document.getElementById('iframeYoutube');

    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

    $("#myModal").modal("show");
  }

  init();
})();
