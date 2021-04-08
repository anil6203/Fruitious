'use-strict';
const toggle = document.querySelector('.toggle');
 const menu = document.querySelector('.menu');
 const navMenu = document.querySelector('.nav__menu');
 const navToggle = document.querySelector('.nav__toggle');
 const items = document.querySelectorAll('.item');
 const body = document.querySelector('body');
 const nav = document.querySelector('.nav');


// ////////////////////// NAVIGATION BAR /////////////////

// Toggle menu

const toggleMenu = function(e){
    e.preventDefault();
    const clicked = e.target.closest('.nav__toggle');
    if(!clicked)
        return;
    if(clicked && navMenu.classList.contains('active')){
        navMenu.classList.remove('active');
        toggle.innerHTML = '<i class="fas fa-bars"></i>';
    }else if(clicked){
        navMenu.classList.add('active');
        toggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
}

// // Drop down List🧮 

const dropDown = function(){
    if(this.classList.contains('submenu-active')){
       this.classList.remove('submenu-active');
    }else if (menu.querySelector(".submenu-active")) {
      menu.querySelector(".submenu-active").classList.remove("submenu-active");
      this.classList.add("submenu-active");
    }
    else {
        this.classList.add('submenu-active');
    }  
}

// // Checking item contain submenu  or not 

const dropDownCheck = function(item){
    if(item.classList.contains('has-submenu')){
        item.addEventListener('click', dropDown, false);
        item.addEventListener('keypress', dropDown, false);
    }
}

/// closing submenu by clicking anywhere 

const closeSubmenu = function(e){
    const isClickedInside = menu.contains(e.target);
    const clicked = menu.querySelector('.submenu-active')
    if(!isClickedInside && clicked ){
        clicked.classList.remove('submenu-active');
    }
}


// navToggle.addEventListener('click', toggleMenu);
toggle.addEventListener('click', toggleMenu);
items.forEach(dropDownCheck);
body.addEventListener('click', closeSubmenu);


///////////// End OF NAVIGATION BAR /////////////////////////


//////////// STICKY NAVIGATION ////////////////////////////

    
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

////////////////// TAB INDEX //////////////////////////
const tabContainer = document.querySelector('.btn-box__plans');
const tabs = document.querySelectorAll('.btn--tab');
const plans = document.querySelectorAll('.display__plan');

tabContainer.addEventListener('click', function(e){
   
    const clicked = e.target.closest('.btn--tab');
    if(!clicked) return;
    e.preventDefault();
    tabs.forEach(t => t.classList.remove('btn--red--active'));
    clicked.classList.add('btn--red--active');

    plans.forEach(function(plan){
        if(clicked.classList.contains('btn--weekly') && plan.classList.contains('display__plan--weekly')){
            plan.classList.add('plan-active');
        }
        else if(clicked.classList.contains('btn--monthly') &&  plan.classList.contains('display__plan--monthly')){
            plan.classList.add('plan-active');
        }
        else if(clicked.classList.contains('btn--yearly') && plan.classList.contains('display__plan--yearly')){
            plan.classList.add('plan-active');
        }else{
            plan.classList.remove('plan-active');
        }
       });
    
  });

  ////////////////////// CARD PREVENT DEFAULT ///////////////////

const containerCard = document.querySelector('.container-card');
containerCard.addEventListener('click', function(e){
    e.preventDefault();
});

////////////////////// IMPLIMANTATION OF SLIDER ////////////////

const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');
const maxSlides = slides.length;
let currentSlide = 0;

const createDots = function(){
    slides.forEach((_, i) => {
        dotContainer.insertAdjacentHTML('beforeend', `<div class="dots__dot" data-slide=${i}></div>`);
    });
}

const dotActive = function(slide){
    document.querySelectorAll('.dots__dot').forEach((dot, i) => {
            dot.classList.remove('dots__dot--active');
    });
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
}

const goToSlide = function(slide){
    slides.forEach((s, i) => {
        s.style.transform = `translate(${100 * (i - slide)}%)`;
    });
}


const moveToLeft = function(){
    if(currentSlide === maxSlides - 1){
        currentSlide = 0;
    }else{
        currentSlide++;
    }
    goToSlide(currentSlide);
    dotActive(currentSlide);
}

const moveToRight = function(){
    if(currentSlide === 0){
        currentSlide = maxSlides - 1;
    }else{
        currentSlide--;
    }
    goToSlide(currentSlide);
    dotActive(currentSlide);
}

const resposiveDot = function(e){
    if(e.target.classList.contains('dots__dot')){
        // taking data-slide value with the use of dataset attribute
        const slide = e.target.dataset.slide;
        goToSlide(slide);
        dotActive(slide);
    }
}

const reponsiveToKeywordButton = function(e){
    if(e.key === 'ArrowLeft') moveToRight();
    if(e.key === 'ArrowRight') moveToLeft();
}

createDots();
goToSlide(currentSlide);

btnRight.addEventListener('click', moveToLeft);
btnLeft.addEventListener('click', moveToRight);
dotContainer.addEventListener('click', resposiveDot);

document.addEventListener('keydown', reponsiveToKeywordButton);
// You can call keyboard event on document object only.

///////// SMOOTH SCROLLING OF NAV_LINKS ////

navMenu.addEventListener('click', function(e){
    e.preventDefault();
    if(e.target.classList.contains('nav__link')){
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({behavior: 'smooth'});
    }
});

///////////// FADE OUT EFFECT OF NAV ////////////

const handleHover = function(e, opacity){
    if(e.target.classList.contains('hover')){
        const link = e.target;
        const siblings = link.closest('.nav').querySelectorAll('.hover');
        siblings.forEach(function(el){
            if(el !== link)
                el.style.opacity = opacity;
        })
    }
}
nav.addEventListener('mouseover', function(e){
   handleHover(e, 0.7);
});

nav.addEventListener('mouseout', function(e){
    handleHover(e, 1);
});

//////////// MODEL WINDOW //////////////////

const btnSignUp = document.querySelector('.button--sign-up');
const btnCloseModal = document.querySelector('.btn--close-modal');
const modalWindow = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
btnSignUp.addEventListener('click', function(e){
     modalWindow.classList.remove('hidden');
     overlay.classList.remove('hidden');
});

btnCloseModal.addEventListener('click', function(e){
    modalWindow.classList.add('hidden');
    overlay.classList.add('hidden');
});

//////////////// BTN EXPLORE AND LOAD MORE ////////

const btnScrollFromExplore = document.querySelector('.btn--explore');
const btnScrollFromLoadMore = document.querySelector('.btn--load');
const sectionAbout = document.querySelector('#about');
const sectionFeature = document.querySelector('#feature');

btnScrollFromExplore.addEventListener('click', function(e){
    e.preventDefault();
    sectionAbout.scrollIntoView({behavior:'smooth'});
});

btnScrollFromLoadMore.addEventListener('click', function(e){
    e.preventDefault();
    sectionFeature.scrollIntoView({behavior:'smooth'});
})

