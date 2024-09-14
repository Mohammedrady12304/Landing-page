// Create the navigation menu
function creatNavMenu() 
{
	sections.forEach(function creatMenu(element)
    {
	    let navItem = document.createElement("li");
	    navItem.classList.add("navigationItem");
    	let sectionName = element.getAttribute("data-nav");
    	let usingSectionId = element.getAttribute("id");
        navItem.innerHTML = `<a href="#${usingSectionId}" class="navigationLink">${sectionName}</a>`;
        navigationMenu.appendChild(navItem);
    });
}


//Declaring variables that will be used later
let navigationMenu = document.querySelector("#navigationMenu");
let sections = document.querySelectorAll("section");


//Cancel in use sections when transition occurs
function cancelUsingSection() 
{
    sections.forEach(function cancelUse(element)
    {
        element.classList.remove("usingSection");
    });
}

//Function to check if an element is in viewport or not
function checkIfInView(element) 
{
	let current = element.getBoundingClientRect();
	return (current.top >= 0 && current.left >= 0 && current.right <= (window.innerWidth || document.documentElement.clientWidth) 
            && current.bottom <= (window.innerHeight || document.documentElement.clientHeight));
};



//cancel in use links when transition occurs
function cancelUsingLink() 
{
    let links = document.querySelectorAll(".navigationLink");
    links.forEach(function cancelUsage(element)
    {
        element.classList.remove("usingLink");
    });
}

// Adding "usingSection" class to a section after checking if it is in use or not
function makeUsingSection(usingSection) 
{
    usingSection.classList.add("usingSection");
    //Canceling the previous links
    cancelUsingLink();
    //Use  new links
    makeUsingLink(usingSection.getAttribute('id'));
}

// Adding "usingLink" class to a section after checking if it is in use or not
function makeUsingLink(usingSectionId) 
{
    let links = document.querySelectorAll(".navigationLink");
    links.forEach(function addUsing(element)
    {
        if(element.getAttribute('href') == `#${usingSectionId}`) 
        {
            element.classList.add("usingLink");
        }
    });
}
// make sections in use if they are really in use while scrolling
window.addEventListener('scroll', function (event) 
{
	event.preventDefault();
    sections.forEach(function highlight(element) 
    {
        if (checkIfInView(element)) 
        {
            cancelUsingSection();
            makeUsingSection(element);
        } 
        else if(window.scrollY==0) 
        {
            cancelUsingSection();
            cancelUsingLink();
        }
    });
});

// Adding the event scroll as a result to the event click on a navigational link
function goToSection() 
{
    let links = document.querySelectorAll(".navigationLink");
    links.forEach(function goOnClick(element) 
    {
        element.addEventListener("click", function(event) 
        {
            event.preventDefault();
            document.querySelector(element.getAttribute('href')).scrollIntoView(
            {
                behavior: 'smooth', block:'center'
            });
        });
    });
}




// build the menu
creatNavMenu();

// starting the click listeners
goToSection();

