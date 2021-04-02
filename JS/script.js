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
// const sectionAbout = document.querySelector('.section-about');
// const initialCoords = sectionAbout.getBoundingClientRect();
// window.addEventListener('scroll', function(){
//     if(window.scroll.top < initialCoords.top){
//         console.log(nav.classList);
//         nav.classList.add('sticky');
//     }else{
//         nav.classList.remove('sticky');
//     }
    
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



// if(navMenu.classList.contains('active')){
    //     navMenu.classList.remove('active');
    //     toggle.innerHTML = '<i class="fas fa-bars"></i>';
    // }else{
    //     navMenu.classList.add('active');
    //     toggle.innerHTML = '<i class="fas fa-bars"></i>';
    //     // toggle.innerHTML = `<i class="fas fa-times"></i>`;
    // }