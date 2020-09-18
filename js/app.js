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
var timeoutId;
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
		let anchor = document.createElement('a');
		anchor.innerText = `Section ${i}`;
		anchor.style.textDecoration = 'none';
		anchor.setAttribute('href','#');
		anchor.addEventListener('click',SectionCollapse);
		header.appendChild(anchor);
		
		div.appendChild(header);
		
		let innerDiv = document.createElement('div');
		
		let paragraph_1 = document.createElement('p');
		paragraph_1.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.";
		innerDiv.appendChild(paragraph_1);
		
		let paragraph_2 = document.createElement('p');
		paragraph_2.textContent = "Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.";
		innerDiv.appendChild(paragraph_2);
		innerDiv.style.display = 'block';
		
		div.appendChild(innerDiv);
		
		section.appendChild(div);
		section.addEventListener('scroll',SectionScroll);
		
		fragment.appendChild(section);
	}
	document.querySelector('main').appendChild(fragment);
	document.addEventListener('scroll',SectionScroll);
	
	
}

// Build The Scroll Top Button
function AddScrollTopButton()
{
	let btn = document.createElement('button');
	btn.setAttribute('id','myBtn');
	btn.innerText = "Top";
	btn.addEventListener('click',function(){
		document.documentElement.scrollTop = 0;
	});
	
	document.body.appendChild(btn);
}

// Build the nav
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
	AddScrollTopButton();
	PopulateNavBar();
	timeoutId = setTimeout(NavBarDisappear,2*1000);
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
	if(timeoutId)
		clearTimeout(timeoutId);
	timeoutId = setTimeout(NavBarDisappear,2*1000);
	
	for(let section of sections)
	{
		let navBar = document.querySelector('.navbar__menu');
		if(navBar.classList.contains('menu__disappear'))
			navBar.classList.remove('menu__disappear');
		
		let sectionBoundaries = section.getBoundingClientRect();
		if(sectionBoundaries.top > 0 || sectionBoundaries.bottom > window.innerHeight/2 )
		{
			RemoveSectionActiveClass();
			section.classList.add('your-active-class');
			
			const header = section.getAttribute('data-nav');
			
			const members = navBar.getElementsByTagName('li');

			for(let i=0;i<members.length;i++)
			{
				if(header == members[i].textContent)
				{
					members[i].querySelector('a').classList.add('menu__active__member');
					break;
				}
			}
			break;
		}
	}
	
	if(document.documentElement.scrollTop > 30)
		document.getElementById('myBtn').style.display = 'block';
	else
		document.getElementById('myBtn').style.display = 'none';
}

function NavBarDisappear()
{
	let navBar = document.querySelector('.navbar__menu');
	if(!navBar.classList.contains('menu__disappear'))
		navBar.classList.add('menu__disappear');
}

function SectionCollapse(event)
{
	event.preventDefault();
	let element = event.target.parentElement.nextSibling;
	
	if(element.style.display == 'block')
	{
		element.style.display = 'none';
	}
	else
		element.style.display = 'block';
}
document.addEventListener('DOMContentLoaded', BuildDocument);