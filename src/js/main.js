'use strict';

console.log('>> Ready :)');
//variables


const listCocktails = document.querySelector('.js-list-cocktails');
const searchButton = document.querySelector('.js-btn-search');
const resetButton = document.querySelector('.js-btn-reset');
const inputCoctailName = document.querySelector('.js-input');
const listFavorites = document.querySelector('.js-list-favorites');



const COCKTAIL_NAME= 'margarita';
let COCKTAIL_URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${COCKTAIL_NAME}`;


let listCocktailsData = [];
let listFavoritesData = [];
//Buscar en el ls
const cocktailStored = JSON.parse(localStorage.getItem("cocktails"));
if (cocktailStored) { 
  console.log('vamos a lista de favoritos desde el local storage');
  console.log(cocktailStored);
    listFavoritesData = cocktailStored;
    // listFavoritesData[0].strDrinkThumb='';
    renderFavoriteList(listFavoritesData);
} else {
//Fetch obtener los datos
fetch(COCKTAIL_URL)
.then(response => response.json())
.then(data => {
    console.log(data);
    listCocktailsData = data.drinks;
    renderCocktailList(listCocktailsData);
})};

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
    listFavorites.innerHTML += renderFavorite(cocktail);
  }
  addEventToFavorite();
}
//Pintar un elemento de la lista
function renderCocktail(cocktail) {
  let imgCocktail='';
  if (!cocktail.strDrinkThumb){
    imgCocktail=`https://via.placeholder.com/210x295/ffffff/666666/?text=Cocktail ${cocktail.strDrink}`
  }
  else imgCocktail=cocktail.strDrinkThumb;

  let html = `<li class="li-list">
        <article class="cocktail js-li-cocktail js-cocktail-${cocktail.idDrink}" id=${cocktail.idDrink}>        
        <img class="cocktail_img"src="${imgCocktail}" alt="imagen cocktail">
        <h3 class="cocktail_title">${cocktail.strDrink}</h3>
        </article> 
    </li> `;
  
  return html;
}
//Pintar un elemento de la lista de favoritos
function renderFavorite(cocktail) {
  let imgCocktail='';
  if (!cocktail.strDrinkThumb){
    imgCocktail=`https://via.placeholder.com/210x295/ffffff/666666/?text=Cocktail ${cocktail.strDrink}`
  }
  else imgCocktail=cocktail.strDrinkThumb;

  let html = `<li class="li-list">
        <article class="cocktail js-li-favorite" id=${cocktail.idDrink}>        
        <img class="cocktail_img"src="${imgCocktail}" alt="imagen cocktail">
        <h3 class="cocktail_title">${cocktail.strDrink}</h3>
        <i class="fa-solid fa-circle-xmark js-icon-close" id=${cocktail.idDrink}></i>
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
        //La guardo en el listado de favoritos: push
        listFavoritesData.push(selectedCocktail);
    } else { //si está en el listado de favoritos eliminarlo
        //splice: elimina un elemento a partir de una posición
        listFavoritesData.splice(indexCocktail, 1);
    }
 
//Pintar en el listado HTML de favoritos:
  renderFavoriteList(listFavoritesData);
  localStorage.setItem("cocktails", JSON.stringify(listFavoritesData));
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
  if (!searchValue) COCKTAIL_URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${COCKTAIL_NAME}`;
  else  COCKTAIL_URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`;
  
//Fetch obtener los datos
  fetch(COCKTAIL_URL)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      listCocktailsData = data.drinks;
      renderCocktailList(listCocktailsData);
      ckeckInFavorites();
      //comprobar que esta en favoritos
    });
}
function handleClickButtonReset(ev) {
  ev.preventDefault();
  localStorage.clear();
  listFavoritesData = [];
  renderFavoriteList(listFavoritesData);
  COCKTAIL_URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${COCKTAIL_NAME}`;
  //Fetch obtener los datos
  fetch(COCKTAIL_URL)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      listCocktailsData = data.drinks;
      renderCocktailList(listCocktailsData);
  });

}
function ckeckInFavorites(){
  //recorre la lista listCocktailsData
  //mirar si esta en la lista de favoritos listFavoritesData
  for (let cocktail of listCocktailsData){
    //por cada cocktail de la lista lo busca en favoritos
    const selectedCocktail = listFavoritesData.find(favoriteCocktail => favoriteCocktail.idDrink === cocktail.idDrink);
    const className=`js-cocktail-${cocktail.idDrink}`;
    const liElementsList = document.getElementsByClassName(className);
    if (selectedCocktail){
      //si lo encuentra, añade la clase "selected"
      liElementsList[0].classList.add('selected');
    }
    else{
      liElementsList[0].classList.remove('selected');
    }
  }
}
function addEventToFavorite() {
  const iconCloseFavorites = document.querySelectorAll(".js-icon-close");
  console.log('entro');
  console.log(iconCloseFavorites);
  for (const icon of iconCloseFavorites) {
    icon.addEventListener("click", handleClickIconClose);
  }
   
}
function handleClickIconClose(ev) {
  ev.preventDefault();
  const idSelected = ev.currentTarget.id;
  console.log('monica');
  console.log(ev.currentTarget.id);

  //findeIndex: la posición donde está el elemento seleccionado
  const indexCocktail = listFavoritesData.findIndex(cocktail => cocktail.idDrink === idSelected)
  listFavoritesData.splice(indexCocktail, 1);
  console.log(indexCocktail);
  //Pintar en el listado HTML de favoritos:
  renderFavoriteList(listFavoritesData);
  ckeckInFavorites();
  //si el listado está vacío limpiamos el localstorage
  if (!(listFavoritesData.length===0))
    localStorage.setItem("cocktails", JSON.stringify(listFavoritesData));
  else localStorage.clear();
 }

searchButton.addEventListener("click", handleClickButtonSearch);
resetButton.addEventListener("click", handleClickButtonReset);
