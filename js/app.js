/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function PopulateNavBar()
{
	const sections = document.getElementsByTagName('section');
	const tempNavBar = document.createDocumentFragment();
	for(let section of sections)
	{
		let child = document.createElement('li');
		let innerChild = document.createElement('a');
		let value = section.getAttribute('data-nav');
		innerChild.textContent = value;
		innerChild.setAttribute('href',`#${value.split(' ').join('').toLowerCase()}`);
		
		child.appendChild(innerChild);
		tempNavBar.appendChild(child);
	}
	const navBar = document.getElementById('navbar__list');
	navBar.appendChild(tempNavBar);
	navBar.addEventListener('click',NavBarClick);
}

// Add class 'active' to section when near top of viewport
function NavBarClick(event)
{
	let tagValue = event.target.textContent.split(' ').join('').toLowerCase();
	if(tagValue.length > 8) return;
	let section = document.querySelector('.your-active-class');
	if(section != null)	section.classList.toggle('your-active-class');
	section = document.querySelector('#'+tagValue);
	section.classList.toggle('your-active-class');
}

// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active

PopulateNavBar();