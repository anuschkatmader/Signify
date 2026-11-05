/* Each photo tries images/<name>.jpg first, then the Pexels URL, then the drawn SVG. */
window.nextImage = function (img) {
  if (img.dataset.remote) {
    var remote = img.dataset.remote;
    delete img.dataset.remote;
    img.src = remote;
  } else if (img.dataset.fallback) {
    var svg = img.dataset.fallback;
    delete img.dataset.fallback;
    img.src = svg;
  } else {
    img.onerror = null;
  }
};
