import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import refs from './refs';
import onFormSubmit from './index';

export default function renderImages(array) {
  if (array.hits.length === 0) {
    refs.loadMoreBtnEl.style.display = 'none';
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  array.hits.forEach(img => {
    refs.galleryContainerEl.innerHTML += `<div class="photo-card">
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

  let newModal = new SimpleLightbox('.gallery a');
}
