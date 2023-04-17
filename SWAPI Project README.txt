README for StarWars API Project from David Greenslade

SW API project uses the SWAPI.dev API to populate character information for a small selection of Star Wars Characters
Built with HTML, CSS, and JavaScript, with some components from BootStrap 5 library (https://getbootstrap.com/) and 
google font Anton (https://fonts.google.com/specimen/Anton).

Format is slide show, clicking either forward or previous slide-show button should trigger new call to API to load data.
Format is a single page with all updates occuring via javascript DOM manipulation.

JS uses fetch API and async functions to load API data, more notes in JS code.  Most styling was with CSS or built 
in bootstrap classes.  Format is Grid to accomodate Bootstrap.

JS uses the bootstrap ACTIVE class assigned by Bootstrap "carousel" to determine character that is on display. 
 THIS IS A GLITCHY SYSTEM.  Don't have enough expertise about what is going on under the hood with the bootstrap 
elements when ACTIVE class changes, but it is not 100% reliable that the data will match the active picture. 
Brainstorming other ways to determine active element, but short of coding a new slideshow function from scratch, 
I don't have any great ideas just yet.

Hope you enjoy!