import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import refs from './refs';
import onLoadMoreClick from './loadMoreBtn';
import renderImages from './renderImagesFunc';

refs.formEl.addEventListener('submit', onFormSubmit);
refs.loadMoreBtnEl.addEventListener('click', onLoadMoreClick);

export default async function onFormSubmit(event) {
  event.preventDefault();

  let q = refs.inputEl.value;
  refs.page = 1;
  try {
    const response = await axios.get(
      `${refs.BASE_URL}?key=${refs.key}&q=${q}&imageType=${refs.imageType}&orientation=${refs.orientation}&safesearch=${refs.safesearch}&page=1&per_page=40`
    );

    refs.galleryContainerEl.innerHTML = '';

    const result = await response.data;
    console.log(result);
    renderImages(result);

    if (result.totalHits >= 1) {
      Notiflix.Notify.success(`Hooray! We found ${result.totalHits} images.`);
    }
    if (result.totalHits >= 40) {
      refs.loadMoreBtnEl.style.display = 'block';
    }
  } catch (error) {
    console.log(error);
  }
}

renderImages();
onLoadMoreClick();
