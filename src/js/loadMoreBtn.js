import Notiflix from 'notiflix';
import 'simplelightbox/dist/simple-lightbox.min.css';
import refs from './refs';
import renderImages from './renderImagesFunc';
import { fetchImages } from './fetchImages';

export default async function onLoadMoreClick(event) {
  refs.loadMoreBtnEl.style.display = 'none';

  try {
    const result = await fetchImages({}, true);

    renderImages(result);

    refs.loadMoreBtnEl.style.display = 'block';

    if (result.hits.length < 40) {
      refs.loadMoreBtnEl.style.display = 'none';
      Notiflix.Notify.failure(
        'We are sorry, but you have reached the end of search results.'
      );
    }

    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
}
