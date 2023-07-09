'use strict';

// IMP VARIABLES
const section1 = document.querySelector('#section--1');
const section2 = document.querySelector('#section--2');
const header = document.querySelector('.header');
const nav = document.querySelector('.nav');

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnstoggleModal = document.querySelectorAll('.btn--show-modal');

const toggleModal = function () {
  modal.classList.toggle('hidden');
  overlay.classList.toggle('hidden');
};

btnstoggleModal.forEach(btn => btn.addEventListener('click', toggleModal));

btnCloseModal.addEventListener('click', toggleModal);
overlay.addEventListener('click', toggleModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    toggleModal();
  }
});

const btnScroll = document.querySelector('.btn--scroll-to');

btnScroll.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

const navEventHandler = document.querySelector('.nav__links');

navEventHandler.addEventListener('click', function (e) {
  e.preventDefault();
  const id = e.target.getAttribute('href');
  e.target.className === 'nav__link'
    ? document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
    : null;
});

const operationsTab = document.querySelectorAll('.operations__tab');
const tabContent = document.querySelectorAll('.operations__content');

const dynamicNav = function (opacity) {
  return function (e) {
    const allLinks = e.target.closest('.nav').querySelectorAll('.nav__link');
    const logo = e.target.closest('.nav').querySelector('.nav__logo');

    if (e.target.classList.contains('nav__link')) {
      allLinks.forEach(child => {
        if (child != e.target) {
          child.style.opacity = opacity;
        }
      });
      e.target.classList.contains('nav__link');
    }
  };
};

nav.addEventListener('mouseover', dynamicNav('0.5'));
nav.addEventListener('mouseout', dynamicNav('1'));

//BETTER WAY --
//INTERSECTION OBSERVER API --
const obsCallback = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      nav.classList.add('sticky');
    } else {
      nav.classList.remove('sticky');
    }
  });
};

const navHeight = nav.getBoundingClientRect().height;
const obsObject = {
  root: null,
  threshold: 0,
  rootMargin: -navHeight + 'px',
};

const observer = new IntersectionObserver(obsCallback, obsObject);
observer.observe(header);

// SECTION APPEAR ON SCROLL
const allSection = document.querySelectorAll('.section');
const sectionCallback = function (entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('section--hidden');
      observer.unobserve(entry.target);
    }
  });
};
const sectionObj = {
  root: null,
  threshold: 0.15,
};
const obsSection = new IntersectionObserver(sectionCallback, sectionObj);
allSection.forEach(section => {
  section.classList.add('section--hidden');
  obsSection.observe(section);
});

const clearForm = function () {
  modal.querySelectorAll('input').forEach(inputField => {
    inputField.value = '';
  });
  modal.querySelector('.submit__feedback').value = 'Submit';
  modal.querySelector('textarea').value = '';

  toggleModal();
};

const feedbackSubmit = document.querySelector('.submit__feedback');
feedbackSubmit.addEventListener('click', function (e) {
  setTimeout(clearForm, 300);
});
