(function () {
  restoreSession();

  const videoLibraryContainer = document.getElementById('video-library');
  const API = 'http://localhost:9000/api';
  const videoLibraryURL = `${API}/videos`;
  const coursesURL = `${API}/courses`;

  let library = [];

  function getCourses() {
    return axios.get(coursesURL);
  }

  function getVideos(courseId) {
    return axios.get(`${videoLibraryURL}/${courseId}`);
  }

  function loadVideos(courseId) {
    getVideos(courseId).then(response => {
      library = response.data.videos;

      videoLibraryContainer.innerHTML = '';
      makeVideosThumbnails();
    });
  }

  function init() {
    $(document).ready(() => {
      $("#myModal").on("hidden.bs.modal", () => {
        $("#iframeYoutube").attr("src","#");
      });
    });

    getCourses().then(({ data: { courses } }) => {
      courses.forEach(course => {
        const menuCourses = document.getElementById('menu-courses');
        const menuItem = document.createElement('li');
        const link = document.createElement('a');
        link.href='#';
        link.innerText = course.title;

        menuItem.appendChild(link);
        menuCourses.appendChild(menuItem);
        menuItem.addEventListener('click', loadVideos.bind(null, course.id));
      });
    });
  }

  function makeVideosThumbnails() {
    library.forEach(video => {
      const thumbnail = document.createElement('img');
      thumbnail.src = `http://img.youtube.com/vi/${video.videoCode}/mqdefault.jpg`;

      const thumbnailTitle = document.createElement('h4');
      thumbnailTitle.className = 'thumbnail-video-title';
      thumbnailTitle.innerHTML = video.title;

      const thumbnailButton = document.createElement('div');
      thumbnailButton.className = 'thumbnail-video-button';

      const thumbnailContainer = document.createElement('div');
      thumbnailContainer.className = 'thumbnail-video-container';
      thumbnailContainer.addEventListener('click', showVideo.bind(null, video.videoCode));

      thumbnailContainer.appendChild(thumbnail);
      thumbnailContainer.appendChild(thumbnailTitle);
      thumbnailContainer.appendChild(thumbnailButton);

      videoLibraryContainer.appendChild(thumbnailContainer);
    });
  }

  function showVideo(videoCode) {
    const iframe = document.getElementById('iframeYoutube');

    iframe.src = `https://www.youtube.com/embed/${videoCode}?autoplay=1`;

    $("#myModal").modal("show");
  }

  init();
})();
