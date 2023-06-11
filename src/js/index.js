import Notiflix from 'notiflix';
import { fetchImages } from './fetchImages';
import 'simplelightbox/dist/simple-lightbox.min.css';
import refs from './refs';
import onLoadMoreClick from './loadMoreBtn';
import renderImages from './renderImagesFunc';

refs.formEl.addEventListener('submit', onFormSubmit);
refs.loadMoreBtnEl.addEventListener('click', onLoadMoreClick);

async function onFormSubmit(event) {
  event.preventDefault();
  refs.galleryContainerEl.style.visibility = 'visible';

  try {
    let q = refs.inputEl.value;
    if (q.trim() === '') {
      return;
    }
    const result = await fetchImages({ page: 1, q }, false);

    refs.galleryContainerEl.innerHTML = '';

    renderImages(result);

    if (result.totalHits >= 1) {
      Notiflix.Notify.success(`Hooray! We found ${result.totalHits} images.`);
    }

    if (result.totalHits < 40) {
      refs.loadMoreBtnEl.style.display = 'none';
    }

    if (result.totalHits >= 40) {
      refs.loadMoreBtnEl.style.display = 'block';
    }
  } catch (error) {
    console.log(error);
  }
}
