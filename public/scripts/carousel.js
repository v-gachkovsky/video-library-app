(function () {
  const slides = [];
  const sliderField = document.getElementById("slider");
  const duration = 4000;
  const firstSlideIndex = 0;
  let lastSlideIndex = null;

  let slider = setInterval(function() {
    showSlide(getNextIndex())
  }, duration);

  let index = 0;

// Initial code for slider
  function init() {
    [
      'img/train.jpg',
      'img/lake.jpg',
      'img/winter.jpg',
      'img/dark.jpg',
      'img/sold.jpg'
    ].forEach(function (imageSrc) {
      const img = document.createElement('img');
      img.src = imageSrc;
      slides.push(img);
    });

    lastSlideIndex = slides.length - 1;

    // Initial dots
    slides.forEach(function (notUsed, index) {
      const dotsField = document.getElementById('dots');
      const dot = document.createElement('span');

      dot.className = 'dot';
      dot.onclick = function () {
        showSlide(index);
      };
      dotsField.appendChild(dot);
    });

    // Show first slide immediately
    showSlide(firstSlideIndex);

    // Next button init
    const nextButton = document.getElementById('next');
    nextButton.addEventListener('click', function() {
      showSlide(getNextIndex());
      resetInterval()
    })

    // Prev button init
    const prevButton = document.getElementById('prev');
    prevButton.addEventListener('click', function() {
      showSlide(getPrevIndex());
      resetInterval()
    })
  }

// Show next slide
  function showSlide(index) {
    const slidesField = document.getElementById('slides');
    const slide = slides[index];

    slidesField.innerHTML = '';
    slidesField.appendChild(slide);
  }

  function getNextIndex() {
    index >= slides.length - 1
      ? index = 0
      : index++;

    return index;
  }

  function getPrevIndex() {
    index <= firstSlideIndex
      ? index = lastSlideIndex
      : index--;

    return index;
  }

  function resetInterval() {
    clearInterval(slider);
    slider = setInterval(function() {
      showSlide(getNextIndex());
    }, duration)
  }

  init();
})();
