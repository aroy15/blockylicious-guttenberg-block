/******/ (() => { // webpackBootstrap
/*!*****************************************!*\
  !*** ./src/blocks/piccyGallery/view.js ***!
  \*****************************************/
window.onload = function () {
  const galleries = Array.from(document.getElementsByClassName("wp-block-blockylicious-piccy-gallery"));
  galleries.forEach(gallery => {
    const thumbnails = Array.from(gallery.getElementsByClassName("thumb"));
    if (thumbnails?.[0]) {
      thumbnails[0].classList.add("selected");
    }
    ;
    thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener("click", () => {
        const selected = Array.from(gallery.getElementsByClassName("thumb selected"));
        selected.forEach(image => {
          image.classList.remove("selected");
        });
        thumbnail.classList.add("selected");
      });
    });
  });
};
/******/ })()
;
//# sourceMappingURL=view.js.map