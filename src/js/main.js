'use strict';

console.log('>> Ready :)');
//variables


const listCocktails = document.querySelector('.js-list-cocktails');
const searchButton = document.querySelector('.js-btn-search');
const inputCoctailName = document.querySelector('.js-input');


let COCKTAIL_NAME= 'margarita';
let COCKTAIL_URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${COCKTAIL_NAME}`;


let listCocktailsData = [];
let listFavoritesData = [];

//Fetch obtener los datos
fetch(COCKTAIL_URL)
.then(response => response.json())
.then(data => {
    console.log(data);
    listCocktailsData = data.drinks;
    renderCocktailList(listCocktailsData);
});

//Pinta todos los elementos de la lista
function renderCocktailList(listCocktailsData) {
    listCocktails.innerHTML = "";
    for (const cocktail of listCocktailsData) {
    listCocktails.innerHTML += renderCocktail(cocktail);
    }
    // addEventToPalette();
}
//Pintar un elemento de la lista
function renderCocktail(cocktail) {
    let html = `<li class="li-list">
        <article class="cocktail js-li-cocktail" id=${cocktail.idDrink}>        
        <img src="${cocktail.strDrinkThumb}" alt="imagen cocktail">
        <h3 class="cocktail_title">${cocktail.strDrink}</h3>
        </article> 
    </li> `;
    return html;
}

function handleClickButtonSearch(ev) {
    ev.preventDefault();
    const searchValue = inputCoctailName.value;
    COCKTAIL_URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`;
    console.log(COCKTAIL_URL);
//Fetch obtener los datos
fetch(COCKTAIL_URL)
.then(response => response.json())
.then(data => {
    console.log(data);
    listCocktailsData = data.drinks;
    renderCocktailList(listCocktailsData);
});
}

searchButton.addEventListener("click", handleClickButtonSearch);