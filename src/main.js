import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createUserProfileTemtlate} from "./view/user-profile.js";
import {createFilmsListTemplate} from "./view/films-list.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createFilmsListExtraTemplate} from "./view/films-list-extra.js";
import {createPopupTemtlate} from "./view/popup.js";
import {generateFilm} from "./mock/film.js";
import {generateFilter} from "./mock/filter.js";

const FILM_COUNT = 20;
const FILM_EXTRA_COUNT = 2;
const FILM_COUNT_PER_STEP = 5;

const filmsElements = new Array(FILM_COUNT).fill().map(generateFilm);
const filmsExtraElements = new Array(FILM_EXTRA_COUNT).fill().map(generateFilm);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeader = document.querySelector(`header`);

render(siteHeader, createUserProfileTemtlate(), `beforeend`);

const siteMainElement = document.querySelector(`.main`);
const filters = generateFilter(filmsElements);

render(siteMainElement, createSiteMenuTemplate(filters), `beforeend`);

render(siteMainElement, createFilmsListTemplate(), `beforeend`);

const filmList = document.querySelector(`.films-list__container`);

for (let i = 0; i < Math.min(filmsElements.length, FILM_COUNT_PER_STEP); i++) {
  render(filmList, createFilmCardTemplate(filmsElements[i]), `beforeend`);
}

if (filmsElements.length > FILM_COUNT_PER_STEP) {
  const showMoreButton = document.querySelector(`.films-list__show-more`);
  let renderedFilmCount = FILM_COUNT_PER_STEP;

  showMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    filmsElements
    .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
    .forEach((film) => render(filmList, createFilmCardTemplate(film), `beforeend`));

    renderedFilmCount += FILM_COUNT_PER_STEP;

    if (renderedFilmCount >= filmsElements) {
      showMoreButton.remove();
    }
  });
}

const films = siteMainElement.querySelector(`.films`);


render(films, createFilmsListExtraTemplate(), `beforeend`);

const filmListExtra = document.querySelectorAll(`.films-list--extra .films-list__container`);

for (let i = 0; i < filmListExtra.length; i++) {
  for (let j = 0; j < FILM_EXTRA_COUNT; j++) {
    render(filmListExtra[i], createFilmCardTemplate(filmsExtraElements[j]), `beforeend`);
  }
}

render(siteMainElement, createPopupTemtlate(filmsElements[0]), `beforeend`);
