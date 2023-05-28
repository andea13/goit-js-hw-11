// import { fetchPictures } from './fetchPictures';
import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const BASE_URL = 'https://pixabay.com/api';
const key = '36804541-6df310b69146ced50149f1ae2';
const imageType = 'photo';
const orientation = 'horizontal';
const safesearch = 'true';
let page = 1;

const formEl = document.querySelector('#search-form');
const inputEl = document.querySelector('input');
const galleryContainerEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');

formEl.addEventListener('submit', onFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreClick);

async function onFormSubmit(event) {
  event.preventDefault();
  loadMoreBtnEl.style.display = 'block';
  let q = inputEl.value;
  page = 1;
  try {
    const response = await axios.get(
      `${BASE_URL}?key=${key}&q=${q}&imageType=${imageType}&orientation=${orientation}&safesearch=${safesearch}&page=1&per_page=40`
    );

    // if (!response.ok) {
    //   throw new Error(response.statusText);
    // }

    galleryContainerEl.innerHTML = '';

    const result = await response.data;
    renderImages(result);
  } catch (error) {
    console.log(error);
  }
}

function renderImages(array) {
  if (array.hits.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  array.hits.forEach(img => {
    galleryContainerEl.innerHTML += `<div class="photo-card">
  <a class="gallery__link" href= "${img.largeImageURL}"><img class="gallery__image" src="${img.largeImageURL}" alt="${img.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${img.likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${img.views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${img.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${img.downloads}
    </p>
  </div>
  </a>
</div>`;
  });

  let newModal = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
  });
}

async function onLoadMoreClick(event) {
  page++;
  loadMoreBtnEl.style.display = 'none';
  loadMoreBtnEl.style.display = 'block';
  let q = inputEl.value;
  try {
    const response = await axios.get(
      `${BASE_URL}?key=${key}&q=${q}&imageType=${imageType}&orientation=${orientation}&safesearch=${safesearch}&page=${page}&per_page=40`
    );

    const result = await response.data;
    renderImages(result);
  } catch (error) {
    console.log(error);
  }
}
