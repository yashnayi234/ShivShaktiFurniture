const menuBtn = document.querySelector('.menu-btn');
const navbar = document.querySelector('.navbar');


let menuOpen = false;

menuBtn.addEventListener('click',()=>{
	if (!menuOpen) {
		menuBtn.classList.add('open');
		navbar.classList.add('open');
		menuOpen = true;
	}else{
		menuBtn.classList.remove('open');
		navbar.classList.remove('open');
		menuOpen = false;
	}
});// JavaScript Document

var prevScrollpos = window.pageYOffset;
window.onscroll = function(){
    var currentScrollPos = window.pageYOffset;
    if(prevScrollpos > currentScrollPos){
        document.getElementsByClassName("header-bar")[0].style.top = "0px";
    }else{
        document.getElementsByClassName("header-bar")[0].style.top = "-120px";
    }
    prevScrollpos = currentScrollPos;
}
