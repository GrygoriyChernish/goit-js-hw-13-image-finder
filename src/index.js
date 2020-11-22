import "regenerator-runtime/runtime.js";
import animateScrollTo from 'animated-scroll-to';
import FindImageApiSevice from './js/apiService';
import imageCardTpl from './templates/image-card.hbs';
import debounce from 'lodash.debounce';

const findImageApiSevice = new FindImageApiSevice();

const refs = {
  searchForm: document.querySelector('.search-form'),
  imageGallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.button')
};

refs.searchForm.addEventListener('input', debounce(onSearchFormInput, 500));
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

async function onSearchFormInput(e) {
  e.preventDefault();

  findImageApiSevice.query = refs.searchForm.elements.query.value;
  findImageApiSevice.resetPage();

  try {
    const images = await findImageApiSevice.fetchImages();
    clearImagesGalery();
    apendImagesMarkup(images);
  
  } catch (error) {
    console('Нужно что-то придумать с этой ошибкой ))')
  }
}

async function onLoadMoreBtnClick() {
  
  try {
    const images = await findImageApiSevice.fetchImages()

    apendImagesMarkup(images);
    scrollToElement()

  } catch (error) {
    console('Нужно что-то придумать с этой ошибкой ))')
  }
}

function apendImagesMarkup(images) {
  refs.imageGallery.insertAdjacentHTML('beforeend', imageCardTpl(images))
}

function clearImagesGalery() {
  refs.imageGallery.innerHTML = '';
}

function scrollToElement() {
  const indexToScroll = 12 * (findImageApiSevice.page - 1) - 11;
  const itemToScroll = refs.imageGallery.children[indexToScroll];
  const options = {
    speed: 500,
    verticalOffset: -10,
  };

  animateScrollTo(itemToScroll, options);
}
  