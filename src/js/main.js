'use strict';
//variables
const listCocktails = document.querySelector('.js-list-cocktails');
const searchButton = document.querySelector('.js-btn-search');
const resetButton = document.querySelector('.js-btn-reset');
const inputCoctailName = document.querySelector('.js-input');
const listFavorites = document.querySelector('.js-list-favorites');
const clearAllFavoritesButton = document.querySelector('.js-btn-clear');

let cocktailUrl='';
let listCocktailsData = [];
let listFavoritesData = [];
const COCKTAIL_NAME= 'margarita';

checkInfoLocalStorage();

//Comprueba si hay datos en el localStorage y los pinta
function checkInfoLocalStorage() {
  const cocktailStored = JSON.parse(localStorage.getItem("cocktails"));
//Si en el localStorage hay datos
if (cocktailStored) 
{
  listFavoritesData = cocktailStored;
  listFavoritesData[0].strDrinkThumb='';
  renderFavoriteList(listFavoritesData);
} else
{
//Fetch obtener los datos por defecto
  cocktailUrl=`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${COCKTAIL_NAME}`;
  fetchToApi(cocktailUrl);
};
}
//Fetch obtener los datos
function fetchToApi(url){
  fetch(url)
    .then(response => response.json())
    .then(data => {
      listCocktailsData = data.drinks;
      renderCocktailList(listCocktailsData);
    })
}
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
        <article class="article--cocktail js-li-cocktail" id=${cocktail.idDrink}>        
        <img class="article--cocktail__img"src="${imgCocktail}" alt="imagen cocktail">
        <h3 class="article--cocktail__title">${cocktail.strDrink}</h3>
        </article> 
    </li> `;
  return html;
}
//Pintar un elemento de la lista de favoritos
function renderFavorite(cocktail) {
  let imgCocktail='';
  if (!cocktail.strDrinkThumb){
    imgCocktail=`https://via.placeholder.com/210x210/1aba3a/ffffff.jpeg?text=COCKTEL ${(cocktail.strDrink).toUpperCase()}`
    
  }
  else imgCocktail=cocktail.strDrinkThumb;

  let html = `<li class="li-list">
        <article class="article--favorite js-li-favorite" id=${cocktail.idDrink}>        
        <img class="article--favorite__img"src="${imgCocktail}" alt="imagen cocktail">
        <h3 class="article--favorite__title">${cocktail.strDrink}</h3>
        <i class="article--favorite__icon fa-solid fa-circle-xmark js-icon-close" id=${cocktail.idDrink}></i>
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
  if (!searchValue) cocktailUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${COCKTAIL_NAME}`;
  else  cocktailUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`;
  
//Fetch obtener los datos y comprobar si está en favoritos
  fetch(cocktailUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      listCocktailsData = data.drinks;
      renderCocktailList(listCocktailsData);
      //comprobar que esta en favoritos
      ckeckInFavorites();
      
    });
}
function handleClickButtonReset(ev) {
  ev.preventDefault();
  localStorage.clear();
  inputCoctailName.value='';
  listFavoritesData = [];
  renderFavoriteList(listFavoritesData);
  cocktailUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${COCKTAIL_NAME}`;
  //Fetch obtener los datos
  fetchToApi(cocktailUrl);
}
function handleClickButtonClearAllFavorites(ev) {
  ev.preventDefault();
  localStorage.clear();
  listFavoritesData = [];
  renderFavoriteList(listFavoritesData);
  ckeckInFavorites();
}

function ckeckInFavorites(){
  //recorre la lista listCocktailsData
  //mirar si esta en la lista de favoritos listFavoritesData
  const arrayListaCocktail=document.querySelectorAll(".js-li-cocktail");
  for (let liCocktail of arrayListaCocktail){
    //por cada li de cocktails buscamos su id en favoritos
    const selectedCocktail = listFavoritesData.find(favoriteCocktail => favoriteCocktail.idDrink === liCocktail.id);
    if (selectedCocktail){
      //si lo encuentra, lo seleciona en la lista
      liCocktail.classList.add('selected');
    }
    //si no lo encuentra, lo desseleciona en la lista
    else{
      liCocktail.classList.remove('selected');
    }
  }
}
function addEventToFavorite() {
  const iconCloseFavorites = document.querySelectorAll(".js-icon-close");
  for (const icon of iconCloseFavorites) {
    icon.addEventListener("click", handleClickIconClose);
  }
   
}
function handleClickIconClose(ev) {
  ev.preventDefault();
  const idSelected = ev.currentTarget.id;
  //findeIndex: la posición donde está el elemento seleccionado
  const indexCocktail = listFavoritesData.findIndex(cocktail => cocktail.idDrink === idSelected);
  console.log('monica');
  console.log(listFavoritesData);
  listFavoritesData.splice(indexCocktail, 1);
  console.log(listFavoritesData);
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
clearAllFavoritesButton.addEventListener("click", handleClickButtonClearAllFavorites);

