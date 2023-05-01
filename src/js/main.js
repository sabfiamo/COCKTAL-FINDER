"use strict";
//variables
const listCocktails = document.querySelector(".js-list-cocktails");
const searchButton = document.querySelector(".js-btn-search");
const resetButton = document.querySelector(".js-btn-reset");
const inputCoctailName = document.querySelector(".js-input");
const listFavorites = document.querySelector(".js-list-favorites");
const clearAllFavoritesButton = document.querySelector(".js-btn-clear");

let cocktailUrl = "";
let listCocktailsData = [];
let listFavoritesData = [];
const COCKTAIL_NAME = "margarita";

checkInfoLocalStorage();

//Comprueba si hay datos en el localStorage y los pinta
function checkInfoLocalStorage() {
  const cocktailStored = JSON.parse(localStorage.getItem("cocktails"));
  //Si en el localStorage hay datos
  if (cocktailStored) {
    listFavoritesData = cocktailStored;
    renderFavoriteList(listFavoritesData);
  }
  //Fetch para obtener los datos por defecto de la lista de cócteles
  cocktailUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${COCKTAIL_NAME}`;
  fetchToApi(cocktailUrl);
}
//Fetch obtener los datos de la api y comprobar si está en favoritos
function fetchToApi(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      listCocktailsData = data.drinks;
      renderCocktailList(listCocktailsData);
      ckeckInFavorites();
    });
}
//Pinta todos los elementos de la lista
function renderCocktailList(listCocktailsData) {
  listCocktails.innerHTML = "";
  for (const cocktail of listCocktailsData) {
    renderCocktail(cocktail);
  }
  addEventToCocktail();
}
//Pinta todos los elementos de la lista en favoritos
function renderFavoriteList(listFavoritesData) {
  listFavorites.innerHTML = "";
  for (const cocktail of listFavoritesData) {
    renderFavorite(cocktail);
  }
  addEventToFavorite();
}
//Pintar un elemento de la lista
function renderCocktail(cocktail) {
  let imgCocktail = "";
  if (!cocktail.strDrinkThumb) {
    imgCocktail = `https://via.placeholder.com/210x210/1aba3a/ffffff.jpeg?text=Cocktail ${cocktail.strDrink.toUpperCase()}`;
  } else imgCocktail = cocktail.strDrinkThumb;

  const newItemLi = document.createElement("li");

  const newItemArticle = document.createElement("article");
  newItemArticle.setAttribute("class", "article--cocktail js-li-cocktail");
  newItemArticle.setAttribute("id", cocktail.idDrink);

  const newItemImg = document.createElement("img");
  newItemImg.setAttribute("class", "article--cocktail__img");
  newItemImg.src = imgCocktail;

  const newItemContainer = document.createElement("div");
  newItemContainer.setAttribute("class", "article--cocktail__container");

  const newItemH3 = document.createElement("h3");
  newItemH3.setAttribute("class", "article--cocktail__title");
  const newContentH3 = document.createTextNode(cocktail.strDrink);
  newItemH3.appendChild(newContentH3);

  listCocktails.appendChild(newItemLi);
  newItemLi.appendChild(newItemArticle);
  newItemArticle.appendChild(newItemContainer);
  newItemContainer.appendChild(newItemImg);
  newItemArticle.appendChild(newItemH3);
}
//Pintar un elemento de la lista de favoritos
function renderFavorite(cocktail) {
  let imgCocktail = "";
  if (!cocktail.strDrinkThumb) {
    imgCocktail = `https://via.placeholder.com/210x210/1aba3a/ffffff.jpeg?text=COCKTEL ${cocktail.strDrink.toUpperCase()}`;
  } else imgCocktail = cocktail.strDrinkThumb;

  const newItemLi = document.createElement("li");

  const newItemArticle = document.createElement("article");
  newItemArticle.setAttribute("class", "article--favorite js-li-favorite");
  newItemArticle.setAttribute("id", cocktail.idDrink);

  const newItemImg = document.createElement("img");
  newItemImg.setAttribute("class", "article--favorite__img");
  newItemImg.src = imgCocktail;

  const newItemH3 = document.createElement("h3");
  newItemH3.setAttribute("class", "article--favorite__title");
  const newContentH3 = document.createTextNode(cocktail.strDrink);
  newItemH3.appendChild(newContentH3);

  const newItemIcon = document.createElement("i");
  newItemIcon.setAttribute(
    "class",
    "article--favorite__icon fa-solid fa-circle-xmark js-icon-close"
  );
  newItemIcon.setAttribute("id", cocktail.idDrink);

  listFavorites.appendChild(newItemLi);
  newItemLi.appendChild(newItemArticle);
  newItemArticle.appendChild(newItemImg);
  newItemArticle.appendChild(newItemH3);
  newItemArticle.appendChild(newItemIcon);

  clearAllFavoritesButton.classList.remove("hidden");
}
//Handle sobre cada elemento de la lista de cócteles
function handleClick(ev) {
  ev.currentTarget.classList.toggle("selected");
  const idSelected = ev.currentTarget.id;
  // //find : devuelve el primer elemento que cumpla una condición
  const selectedCocktail = listCocktailsData.find(
    (cocktail) => cocktail.idDrink === idSelected
  );

  // //findeIndex: la posición donde está el elemento, o -1 sino está en el listado
  const indexCocktail = listFavoritesData.findIndex(
    (cocktail) => cocktail.idDrink === idSelected
  );
  // //Comprobar si ya existe el favorite

  if (indexCocktail === -1) {
    //no está en el listado de favoritos
    //La guardo en el listado de favoritos: push
    listFavoritesData.push(selectedCocktail);
  } else {
    //si está en el listado de favoritos eliminarlo
    //splice: elimina un elemento a partir de una posición
    listFavoritesData.splice(indexCocktail, 1);
  }
  //Pintar en el listado HTML de favoritos:
  renderFavoriteList(listFavoritesData);
  //si el listado está vacío limpiamos el localstorage
  if (!(listFavoritesData.length === 0))
    localStorage.setItem("cocktails", JSON.stringify(listFavoritesData));
  else {
    localStorage.clear();
    clearAllFavoritesButton.classList.add("hidden");
  }
}
//Añade un listener al evento click sobre los li de los cócteles
function addEventToCocktail() {
  const liElementsList = document.querySelectorAll(".js-li-cocktail");
  for (const li of liElementsList) {
    li.addEventListener("click", handleClick);
  }
}
//Handle sobre el botón buscar
function handleClickButtonSearch(ev) {
  ev.preventDefault();
  const searchValue = inputCoctailName.value;
  if (!searchValue)
    cocktailUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${COCKTAIL_NAME}`;
  else
    cocktailUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`;

  //Fetch obtener los datos y comprobar si está en favoritos
  fetchToApi(cocktailUrl);
}
//Handle sobre el botón reset
function handleClickButtonReset(ev) {
  ev.preventDefault();
  localStorage.clear();
  inputCoctailName.value = "";
  listFavoritesData = [];
  renderFavoriteList(listFavoritesData);
  clearAllFavoritesButton.classList.add("hidden");
  cocktailUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${COCKTAIL_NAME}`;
  //Fetch obtener los datos por defecto
  fetchToApi(cocktailUrl);
}
//Handle sobre el botón borrar todos los favoritos
function handleClickButtonClearAllFavorites(ev) {
  ev.preventDefault();
  localStorage.clear();
  listFavoritesData = [];
  renderFavoriteList(listFavoritesData);
  ckeckInFavorites();
  clearAllFavoritesButton.classList.add("hidden");
}
//Comprobar si el favorito está en la lista de cócteles para marcarlo como seleccionado o no
function ckeckInFavorites() {
  //Recorrer la lista de cócteles
  //mirar si esta en la lista de favoritos
  const arrayListaCocktail = document.querySelectorAll(".js-li-cocktail");
  for (let liCocktail of arrayListaCocktail) {
    //por cada li de cocktails buscamos su id en favoritos
    const selectedCocktail = listFavoritesData.find(
      (favoriteCocktail) => favoriteCocktail.idDrink === liCocktail.id
    );
    if (selectedCocktail) {
      //si lo encuentra, lo selecciona en la lista
      liCocktail.classList.add("selected");
    }
    //si no lo encuentra, lo deselecciona en la lista
    else {
      liCocktail.classList.remove("selected");
    }
  }
}
//Añade un listener al evento click sobre los iconos x
function addEventToFavorite() {
  const iconCloseFavorites = document.querySelectorAll(".js-icon-close");
  for (const icon of iconCloseFavorites) {
    icon.addEventListener("click", handleClickIconClose);
  }
}
//Cuando hacemos click sobre el icono x
function handleClickIconClose(ev) {
  ev.preventDefault();
  //id del elemento seleccionado
  const idSelected = ev.currentTarget.id;
  //findeIndex: la posición de la lista de favoritos donde está el elemento seleccionado
  const indexCocktail = listFavoritesData.findIndex(
    (cocktail) => cocktail.idDrink === idSelected
  );
  //Borrar de la lista de favoritos el elemento seleccionado
  listFavoritesData.splice(indexCocktail, 1);

  //Pintar en el listado HTML de favoritos
  renderFavoriteList(listFavoritesData);
  //Comprobar si el favorito está en la lista de cócteles
  ckeckInFavorites();
  //Si el listado de favoritos está vacío limpiamos el localstorage
  if (!(listFavoritesData.length === 0))
    localStorage.setItem("cocktails", JSON.stringify(listFavoritesData));
  else {
    localStorage.clear();
    //Ocultar el botón de borrar todos los favoritos
    clearAllFavoritesButton.classList.add("hidden");
  }
}

searchButton.addEventListener("click", handleClickButtonSearch);
resetButton.addEventListener("click", handleClickButtonReset);
clearAllFavoritesButton.addEventListener(
  "click",
  handleClickButtonClearAllFavorites
);
