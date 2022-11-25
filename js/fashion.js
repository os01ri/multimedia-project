function scrollup() {
  const scrollup = document.getElementById('scroll-up');

  if (this.scrollY >= 200) scrollup.classList.add('show-scroll');
  else scrollup.classList.remove('show-scroll');

}

window.addEventListener('scroll', scrollup)

/*---swiper---*/
var swiper = new Swiper(".discover-container", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  loop: true,
  spaceBetween: 32,
  coverflowEffect: {
    rotate: 0,
  },

});