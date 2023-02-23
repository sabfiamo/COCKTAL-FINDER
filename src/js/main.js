'use strict';

console.log('>> Ready :)');
//variables


const listCocktails = document.querySelector('.js-list-cocktails');
const searchButton = document.querySelector('.js-btn-search');
const inputCoctailName = document.querySelector('.js-input');
const listFavorites = document.querySelector('.js-list-favorites');


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
  addEventToCocktail();
}
//Pinta todos los elementos de la lista en favoritos
function renderFavoriteList(listFavoritesData) {
  listFavorites.innerHTML = "";
  for (const cocktail of listFavoritesData) {
    listFavorites.innerHTML += renderCocktail(cocktail);
  }
}
//Pintar un elemento de la lista
function renderCocktail(cocktail) {
  let imgCocktail='';
  if (!cocktail.strDrinkThumb){
    imgCocktail='https://via.placeholder.com/210x295/ffffff/666666/?text=Cocktail'
  }
  else imgCocktail=cocktail.strDrinkThumb;

  let html = `<li class="li-list">
        <article class="cocktail js-li-cocktail" id=${cocktail.idDrink}>        
        <img src="${imgCocktail}" alt="imagen cocktail">
        <h3 class="cocktail_title">${cocktail.strDrink}</h3>
        </article> 
    </li> `;
  return html;
}


function handleClick(ev) {

  ev.currentTarget.classList.toggle('selected');
  const idSelected = ev.currentTarget.id;
  // //find : devuelve el primer elemento que cumpla una condición 
  const selectedCocktail = listCocktailsData.find(cocktail => cocktail.idDrink === idSelected);

  // //findeIndex: la posición donde está el elemento, o -1 sino está en el listado
  const indexCocktail = listFavoritesData.findIndex(cocktail => cocktail.idDrink === idSelected)
  // //Comprobar si ya existe el favorite

  if (indexCocktail === -1) { //no está en el listado de favoritos
//     //     //La guardo en el listado de favoritos: push
    listFavoritesData.push(selectedCocktail);
  } else { //si está en el listado de favoritos eliminarlo
//         //splice: elimina un elemento a partir de una posición
    listFavoritesData.splice(indexCocktail, 1);
  }
//Pintar en el listado HTML de favoritos:
  renderFavoriteList(listFavoritesData);
 }

function addEventToCocktail() {
  const liElementsList = document.querySelectorAll(".js-li-cocktail");
  for (const li of liElementsList) {
    li.addEventListener("click", handleClick);
  }
}

function handleClickButtonSearch(ev) {
  ev.preventDefault();
  const searchValue = inputCoctailName.value;
  COCKTAIL_URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`;

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