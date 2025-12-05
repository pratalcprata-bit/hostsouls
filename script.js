"use strict";

//NAV;

const disableBodyScroll = () => {
  document.body.classList.add("overflow-hidden");
  document.documentElement.classList.add("overflow-hidden");
};

const enableBodyScroll = () => {
  document.body.classList.remove("overflow-hidden");
  document.documentElement.classList.remove("overflow-hidden");
};

const nav = document.getElementById("mainMenu");
const burger = document.getElementById("burger");
const menuItems = document.querySelectorAll(".nav-link");
let isOpen = false;

const openMenu = () => {
  nav.classList.add("active");
  burger.classList.add("active");
  disableBodyScroll();
};

const closeMenu = () => {
  nav.classList.remove("active");
  burger.classList.remove("active");
  enableBodyScroll();
};

burger.addEventListener("click", function () {
  if (!isOpen) {
    openMenu();
  } else {
    closeMenu();
  }
  isOpen = !isOpen;
});

nav.addEventListener("click", () => {
  closeMenu();
});

menuItems.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.stopPropagation();
    closeMenu();
  });
});

// ANIMATIONS

function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

const release = document.getElementById("release");
const releaseBg = document.getElementById("releaseBg");
let isRelVisible = false;

function animateRelease() {
  if (isRelVisible) return;
  if (!isInViewport(release)) return;
  releaseBg.classList.add("visible");
  isRelVisible = true;
}

document.onscroll = function () {
  animateRelease();
};

// SCROLL MAGIC
if (window.innerWidth > 991) {
  const scrollBg = document.getElementById("scrollBg");
  const aboutWrapper = document.getElementById("aboutWrapper");
  const animatedTitle = document.getElementById("animatedTitle");

  const controller = new ScrollMagic.Controller();

  const scene = new ScrollMagic.Scene({
    duration: 750,
    triggerElement: aboutWrapper,
    triggerHook: 0,
  })
    // .addIndicators(aboutWrapper)
    .setPin(aboutWrapper)
    .addTo(controller);

  // let accelamount = 0.1;
  let scrollpos = 0;
  // let delay = 0;

  let offset =
    document.getElementById("scrollContent").getBoundingClientRect().top / 2;

  scene.on("update", (e) => {
    scrollpos = (e.scrollPos - offset) / 1000;
  });

  setInterval(() => {
    // delay += (scrollpos - delay) * accelamount;
    scrollBg.style.opacity = scrollpos;
  }, 33.3);
}

// COUNTER

const countdownWrap = document.getElementById("countdown");
const releasedWrap = document.getElementById("released");
const confetti = document.getElementById("confetti");

const enableCountDown = () => {
  countdownWrap.classList.add("enabled");
  countdownWrap.classList.remove("disabled");
};

const disableCountDown = () => {
  countdownWrap.classList.add("disabled");
  countdownWrap.classList.remove("enabled");
};

const enableRelease = () => {
  releasedWrap.classList.remove("disabled");
  releasedWrap.classList.add("enabled");
  confetti.classList.add("enabled");
  confetti.classList.remove("disabled");
};

const releaseDate = new Date("Apr 28, 2022 20:00:00").getTime();
let countdown = setInterval(function () {
  let now = new Date().getTime();
  let timeLeft = releaseDate - now;
  let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  if (minutes < 0 && seconds < 0) {
    disableCountDown();
    enableRelease();
  } else {
    enableCountDown();
    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
  }
}, 1000);

// SLICK

$(document).ready(function () {
  $(".gallery-wrapper").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    // prevArrow: $(".prev"),
    // nextArrow: $(".next"),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
    ],
  });
});

// POPUP CLOSE

const closeBtns = document.querySelectorAll(".popup-close");
closeBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    btn.parentElement.classList.remove("active");
    enableBodyScroll();
  });
});

// CONTACT POPUP

const openBtn = document.getElementById("popupTrigger");
const popup = document.getElementById("contactPopup");
let isContactOpen = false;

function hideContact() {
  popup.classList.remove("active");
  isContactOpen = false;
  enableBodyScroll();
}

openBtn.addEventListener("click", function () {
  popup.classList.add("active");
  isContactOpen = true;
  disableBodyScroll();
});

// SYSTEM REQ POPUP

const sysBtn = document.getElementById("systemReq");
const sysPopup = document.getElementById("systemReqPopup");
let isSysReqOpen = false;

function hideSysReq() {
  sysPopup.classList.remove("active");
  isSysReqOpen = false;
  enableBodyScroll();
}

sysBtn.addEventListener("click", () => {
  sysPopup.classList.add("active");
  isSysReqOpen = true;
  disableBodyScroll();
});

// LIGHTBOX

const galleryImgs = document.querySelectorAll(".lightbox-sm");
const lightboxImg = document.querySelector(".lightbox-img");
const lightbox = document.getElementById("lightbox");
let isLightboxOpen = false;
let activeImage = null
let images = []

lightbox.querySelector('.fa-arrow-right').addEventListener('click',e=>{
     const selectedImage = images.find(image=>image.url == activeImage.url)
     const nextImage = images.find(image=>image.index == selectedImage.index + 1)
     if(nextImage){
       lightboxImg.src = nextImage.url
       activeImage=nextImage
   }
})

lightbox.querySelector('.fa-arrow-left').addEventListener('click',e=>{
    const selectedImage = images.find(image=>image.url == activeImage.url)
    const prevImage = images.find(image=>image.index == selectedImage.index - 1)
    if(prevImage){
       lightboxImg.src = prevImage.url
       activeImage=prevImage
    }
})

galleryImgs.forEach((image,index) => {
  images.push({
    url:image.dataset.imagesrc,
    index:index
  })
  image.addEventListener("click", (e) => {
    activeImage = {
      url:image.dataset.imagesrc,
      index:index
    }
    lightbox.classList.add("active");
    isLightboxOpen = true;
    lightboxImg.src = e.target.dataset.imagesrc;
    disableBodyScroll();
  });

  function hideLightbox() {
    lightbox.classList.remove("active");
    isLightboxOpen = false;
    document.body.classList.remove("overflow-hidden");
    enableBodyScroll();
  }

  lightbox.addEventListener("click", () => {
    //hideLightbox();
  });

  // CLOSING ALL POPUPS

  const keyDispatcher = (e) => {
    if (isLightboxOpen && e.keyCode == 27) {
      hideLightbox();
      return;
    }

    if (isSysReqOpen && e.keyCode == 27) {
      hideSysReq();
      return;
    }

    if (isContactOpen && e.keyCode == 27) {
      hideContact();
      return;
    }
  };

  document.body.addEventListener("keydown", keyDispatcher);
});
 
// VIDEO

const video = document.querySelector("video");
const playBtn = document.getElementById("playBtn");
const videoBg = document.querySelector(".videoBg");
let isPlaying = false;

playBtn.addEventListener("click", () => {
  if (!isPlaying) {
    videoBg.style.opacity = "0";
    video.play();
    video.setAttribute("controls", null);
  }
});
