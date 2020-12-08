import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createUserProfileTemtlate} from "./view/user-profile.js";
import {createFilmsListTemplate} from "./view/films-list.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createFilmsListExtraTemplate} from "./view/films-list-extra.js";

const FILM_COUNT = 5;
const FILM_EXTRA_COUNT = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeader = document.querySelector(`header`);

render(siteHeader, createUserProfileTemtlate(), `beforeend`);

const siteMainElement = document.querySelector(`.main`);

render(siteMainElement, createSiteMenuTemplate(), `beforeend`);

render(siteMainElement, createFilmsListTemplate(), `beforeend`);

const filmList = document.querySelector(`.films-list__container`);

for (let i = 0; i < FILM_COUNT; i++) {
  render(filmList, createFilmCardTemplate(), `beforeend`);
}

const films = siteMainElement.querySelector(`.films`);

render(films, createFilmsListExtraTemplate(), `beforeend`);

const filmListExtra = document.querySelectorAll(`.films-list--extra .films-list__container`);

for (let i = 0; i < filmListExtra.length; i++) {
  for (let j = 0; j < FILM_EXTRA_COUNT; j++) {
    render(filmListExtra[i], createFilmCardTemplate(), `beforeend`);
  }
}

