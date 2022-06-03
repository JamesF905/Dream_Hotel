// Reference: https://www.w3schools.com/w3css/w3css_slideshow.asp
let slideIndex = 0;

function carousel() {
  let x = document.querySelectorAll(".autoSlides");
  for (let i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > x.length) {
    slideIndex = 1
  }
  x[slideIndex - 1].style.display = "block";
  setTimeout(carousel, 3000);
}

carousel();
