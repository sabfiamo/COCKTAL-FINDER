"use strict";const listCocktails=document.querySelector(".js-list-cocktails"),searchButton=document.querySelector(".js-btn-search"),resetButton=document.querySelector(".js-btn-reset"),inputCoctailName=document.querySelector(".js-input"),listFavorites=document.querySelector(".js-list-favorites"),clearAllFavoritesButton=document.querySelector(".js-btn-clear");let cocktailUrl="",listCocktailsData=[],listFavoritesData=[];const COCKTAIL_NAME="margarita";function checkInfoLocalStorage(){const t=JSON.parse(localStorage.getItem("cocktails"));t&&(listFavoritesData=t,renderFavoriteList(listFavoritesData)),cocktailUrl="https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita",fetchToApi(cocktailUrl)}function fetchToApi(t){fetch(t).then(t=>t.json()).then(t=>{listCocktailsData=t.drinks,renderCocktailList(listCocktailsData),ckeckInFavorites()})}function renderCocktailList(t){listCocktails.innerHTML="";for(const e of t)renderCocktail(e);addEventToCocktail()}function renderFavoriteList(t){listFavorites.innerHTML="";for(const e of t)renderFavorite(e);addEventToFavorite()}function renderCocktail(t){let e="";e=t.strDrinkThumb?t.strDrinkThumb:"https://via.placeholder.com/210x210/1aba3a/ffffff.jpeg?text=Cocktail "+t.strDrink.toUpperCase();const a=document.createElement("li"),i=document.createElement("article");i.setAttribute("class","article--cocktail js-li-cocktail"),i.setAttribute("id",t.idDrink);const c=document.createElement("img");c.setAttribute("class","article--cocktail__img"),c.src=e;const l=document.createElement("div");l.setAttribute("class","article--cocktail__container");const o=document.createElement("h3");o.setAttribute("class","article--cocktail__title");const r=document.createTextNode(t.strDrink);o.appendChild(r),listCocktails.appendChild(a),a.appendChild(i),i.appendChild(l),l.appendChild(c),i.appendChild(o)}function renderFavorite(t){let e="";e=t.strDrinkThumb?t.strDrinkThumb:"https://via.placeholder.com/210x210/1aba3a/ffffff.jpeg?text=COCKTEL "+t.strDrink.toUpperCase();const a=document.createElement("li"),i=document.createElement("article");i.setAttribute("class","article--favorite js-li-favorite"),i.setAttribute("id",t.idDrink);const c=document.createElement("img");c.setAttribute("class","article--favorite__img"),c.src=e;const l=document.createElement("h3");l.setAttribute("class","article--favorite__title");const o=document.createTextNode(t.strDrink);l.appendChild(o);const r=document.createElement("i");r.setAttribute("class","article--favorite__icon fa-solid fa-circle-xmark js-icon-close"),r.setAttribute("id",t.idDrink),listFavorites.appendChild(a),a.appendChild(i),i.appendChild(c),i.appendChild(l),i.appendChild(r),clearAllFavoritesButton.classList.remove("hidden")}function handleClick(t){t.currentTarget.classList.toggle("selected");const e=t.currentTarget.id,a=listCocktailsData.find(t=>t.idDrink===e),i=listFavoritesData.findIndex(t=>t.idDrink===e);-1===i?listFavoritesData.push(a):listFavoritesData.splice(i,1),renderFavoriteList(listFavoritesData),0!==listFavoritesData.length?localStorage.setItem("cocktails",JSON.stringify(listFavoritesData)):(localStorage.clear(),clearAllFavoritesButton.classList.add("hidden"))}function addEventToCocktail(){const t=document.querySelectorAll(".js-li-cocktail");for(const e of t)e.addEventListener("click",handleClick)}function handleClickButtonSearch(t){t.preventDefault();const e=inputCoctailName.value;cocktailUrl=e?"https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+e:"https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita",fetchToApi(cocktailUrl)}function handleClickButtonReset(t){t.preventDefault(),localStorage.clear(),inputCoctailName.value="",listFavoritesData=[],renderFavoriteList(listFavoritesData),clearAllFavoritesButton.classList.add("hidden"),cocktailUrl="https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita",fetchToApi(cocktailUrl)}function handleClickButtonClearAllFavorites(t){t.preventDefault(),localStorage.clear(),listFavoritesData=[],renderFavoriteList(listFavoritesData),ckeckInFavorites(),clearAllFavoritesButton.classList.add("hidden")}function ckeckInFavorites(){const t=document.querySelectorAll(".js-li-cocktail");for(let e of t){listFavoritesData.find(t=>t.idDrink===e.id)?e.classList.add("selected"):e.classList.remove("selected")}}function addEventToFavorite(){const t=document.querySelectorAll(".js-icon-close");for(const e of t)e.addEventListener("click",handleClickIconClose)}function handleClickIconClose(t){t.preventDefault();const e=t.currentTarget.id,a=listFavoritesData.findIndex(t=>t.idDrink===e);listFavoritesData.splice(a,1),renderFavoriteList(listFavoritesData),ckeckInFavorites(),0!==listFavoritesData.length?localStorage.setItem("cocktails",JSON.stringify(listFavoritesData)):(localStorage.clear(),clearAllFavoritesButton.classList.add("hidden"))}checkInfoLocalStorage(),searchButton.addEventListener("click",handleClickButtonSearch),resetButton.addEventListener("click",handleClickButtonReset),clearAllFavoritesButton.addEventListener("click",handleClickButtonClearAllFavorites);