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

const sectionsNumber = 4;
var sections;
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function RemoveSectionActiveClass()
{
	let section = document.querySelector('.your-active-class');
	if(section != null)	section.classList.remove('your-active-class');
	let member = document.querySelector('.menu__active__member');
	if(member != null) member.classList.remove('menu__active__member');
}

/**
 * End Helper Functions
 * 
*/


// Build Sections
function BuildSections()
{
	const fragment = document.createDocumentFragment();
	for(let i = 1; i <= sectionsNumber; i++)
	{
		let section = document.createElement('section');
		section.setAttribute('id',`section${i}`);
		section.setAttribute('data-nav',`Section ${i}`);
		if(i == 1)	section.classList.add('your-active-class');
		
		let div = document.createElement('div');
		div.classList.add('landing__container');
		
		let header = document.createElement('h2');
		header.textContent = `Section ${i}`;
		div.appendChild(header);
		
		let paragraph_1 = document.createElement('p');
		paragraph_1.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.";
		div.appendChild(paragraph_1);
		
		let paragraph_2 = document.createElement('p');
		paragraph_2.textContent = "Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.";
		div.appendChild(paragraph_2);
		
		section.appendChild(div);
		section.addEventListener('scroll',SectionScroll);
		
		fragment.appendChild(section);
	}
	document.querySelector('main').appendChild(fragment);
	document.addEventListener('scroll',SectionScroll);
}

// build the nav
function PopulateNavBar()
{
	sections = document.getElementsByTagName('section');
	const tempNavBar = document.createDocumentFragment();
	for(let section of sections)
	{
		let child = document.createElement('li');
		let innerChild = document.createElement('a');
		let value = section.getAttribute('data-nav');
		innerChild.textContent = value;
		innerChild.setAttribute('href',`#${value.split(' ').join('').toLowerCase()}`);
		innerChild.classList.add('menu__link');
		if(value == "Section 1")
			innerChild.classList.add('menu__active__member');
		
		child.appendChild(innerChild);
		tempNavBar.appendChild(child);
	}
	const navBar = document.getElementById('navbar__list');
	navBar.appendChild(tempNavBar);
	navBar.addEventListener('click',NavBarClick);
}


//Event Handlers
function BuildDocument()
{
	BuildSections();
	PopulateNavBar();
}

function NavBarClick(event)
{
	event.preventDefault();
	
	let tagValue = event.target.getAttribute('href');
	if(tagValue == null) return;
	
	RemoveSectionActiveClass();
	
	section = document.querySelector(tagValue);
	section.classList.add('your-active-class');
	
	event.target.classList.add('menu__active__member');
	
	section.scrollIntoView();
}

function SectionScroll(event)
{	
	for(let section of sections)
	{
		
		let sectionBoundaries = section.getBoundingClientRect();
		if(sectionBoundaries.top > 0 || sectionBoundaries.bottom > window.innerHeight/2 )
		{
			RemoveSectionActiveClass();
			section.classList.add('your-active-class');
			
			const header = section.getAttribute('data-nav');
			
			const members = document.querySelector('#navbar__list').getElementsByTagName('li');

			for(let i=0;i<members.length;i++)
			{
				if(header == members[i].textContent)
				{
					members[i].classList.add('menu__active__member');
					break;
				}
			}
			break;
		}
	}
}


document.addEventListener('DOMContentLoaded', BuildDocument);