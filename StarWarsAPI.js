//define variable for part of document where text-data will load
let apiTextArea = document.querySelector("#API-text")
const charNameElem = document.querySelector("#character-name");
const charHeightElem = document.querySelector("#character-height");
const charSpeciesElem = document.querySelector("#character-species");
const charHomeworldElem = document.querySelector("#character-homeworld");
const charFilmsElem = document.querySelector("#character-films");
const charShipsElem = document.querySelector("#character-ships");

//function to get specific character data from API=[-;'/.]
function getSWCharData(url, name) {
  if (name !== undefined) {
    url = url + "?search=" + name;
  } else {
    url = url;
  }
  return fetch(url)
    .then((response) => {
      //throw error if no response
      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}`);
      }
      //convert data into object
      return response.json();
    })
    .then((data) => {
      //checks if character data exists
      let results = data.results;
      if (results && results.length > 0) {
        return results[0];
      //if it is not a search, just returns the direct object
      } else if (!results) {
        return data;
      } else {
        results = "Nothing Found";
      }
    })
    .catch((error) => {
      throw new Error(`${error}`);
    });
}

//function to fetch data when entries contain multiple other API calls 
async function multipleEntries(multEntries) {
  try{
    const promises = multEntries.map(entry => getSWCharData(entry));
    const results = await Promise.all(promises);
    return results;
  } catch (error){
    console.error(error);
  }
}

//async function to push data from API into <p> elements
async function chngCharWthUIChng(peopleURL = `https://swapi.dev/api/people/`) {
  let charName;
  const activeElement = Array.from(document.querySelectorAll('.carousel-item')).find(element => element.classList.contains('active'));
  if (activeElement) {
    charName = activeElement.id.split('+').join(' ');
  }
  console.log(charName);
  //creates promises for all info so "Promise.all" can be used to load all information at the same time 
  try {
    let characterInfo = await getSWCharData(peopleURL, charName);
    let namePromise = await getSWCharData(peopleURL, charName);
    let heightPromise = await getSWCharData(peopleURL, charName);
    let homeworldPromise = getSWCharData(characterInfo.homeworld);
    let speciesPromise;
    if (characterInfo.species.length === 0) {
      speciesPromise = getSWCharData('https://swapi.dev/api/species/1/');
    } else {
      speciesPromise = getSWCharData(characterInfo.species);
    }
    let filmsPromise = multipleEntries(characterInfo.films);
    let shipsPromise = multipleEntries(characterInfo.starships);
    //Promise.all assigns new variable names to promises to wait for all information to be loaded before populating text fields
    let [name, height, homeworld, species, films, ships] = await Promise.all([namePromise, heightPromise, homeworldPromise, speciesPromise, filmsPromise, shipsPromise]);
    //actual functionality for adding text to text elements
    charNameElem.textContent = `Name: ${name.name}`;
    charHeightElem.textContent = `Height: ${height.height} cm`;
    charHomeworldElem.textContent = `Homeworld: ${homeworld.name}`;
    charSpeciesElem.textContent = `Species: ${species.name}`;
    let filmText;
    if(films.length ===0) {
      filmText = "No films found"
    } else{
      filmText = films.map(film => film.title).join(', ');
    }
    charFilmsElem.textContent = `Films: ${filmText}`;
    let shipText;
    if (ships.length === 0) {
      shipText = "No ships found"
    } else {
      shipText = ships.map(starship => starship.name).join(', ');
    }
    charShipsElem.textContent = `Ships: ${shipText}`;
  } catch (error) {
    console.error(error.message);
  }
}

//loads first entry when page is opened
window.onload = chngCharWthUIChng();

//functionality to change API data as slideshow progresses **Note because this uses bootstrap ACTIVE class as identifier, this is a little buggy**
const slideShowBtns = document.querySelectorAll("button.carousel-button");
for(let n = 0; n < slideShowBtns.length; n++){
    slideShowBtns[n].addEventListener('click', () => {
        charNameElem.textContent = `Name: `;
        charHeightElem.textContent = `Height: `;
        charHomeworldElem.textContent = `Homeworld: `;
        charSpeciesElem.textContent = `Species: `;
        charFilmsElem.textContent = `Films: `;
        charShipsElem.textContent = `Ships: `;
        //attempt to wait for new ACTIVE class to be set before calling API
        const slideShowElement = Array.from(document.querySelectorAll('.carousel-item')).find(element => element.classList.contains('active'));
        slideShowElement.addEventListener("transitionend", () => chngCharWthUIChng(`https://swapi.dev/api/people/`));
       
    });
}

/*async function getHomeworld () {
    try {
        let charInf = await getSWCharData(`https://swapi.dev/api/people/`, 'Luke');
        console.log(charInf.homeworld);
        let charHomeworld = await getSWCharData(charInf.homeworld);
        console.log(charHomeworld.name);
    } catch (error) {
        alert(error.message);
    }
}

getHomeworld ();*/