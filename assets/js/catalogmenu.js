const menuCatalogBtn = document.querySelector('.menu-btn-catalog');
const catalogTab = document.querySelector('.catalog-tab');


let menuCatalogClose = false;

menuCatalogBtn.addEventListener('click',()=>{
	if (!menuCatalogClose) {
        document.getElementsByClassName("catalog-tab")[0].style.left = "-300px";
        // catalogTab.classList.add('close');
		menuCatalogClose = true;
	}else{
        document.getElementsByClassName("catalog-tab")[0].style.left = "0px";
		// catalogTab.classList.remove('close');
		menuCatalogClose = false;
	}
});// JavaScript Document

var width = window.innerWidth;
var height = window.innerHeight;

menuCatalogBtn.addEventListener('click',()=>{
	if(width <= 468 && width >= 768){
		if (!menuCatalogClose) {
			document.getElementsByClassName("catalog-tab")[0].style.left = "-300px";
			// catalogTab.classList.add('close');
			menuCatalogClose = true;
		}else{
			document.getElementsByClassName("catalog-tab")[0].style.left = "0px";
			// catalogTab.classList.remove('close');
			menuCatalogClose = false;
		}
	}
});