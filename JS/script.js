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

// cards = document.querySelectorAll('.cards');
// cards.forEach(card => {
//     card.addEventListener('click', e => e.preventDefault())});

const containerCard = document.querySelector('.container-card');
containerCard.addEventListener('click', function(e){
    e.preventDefault();
});