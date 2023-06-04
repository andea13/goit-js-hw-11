import Notiflix from 'notiflix';
import 'simplelightbox/dist/simple-lightbox.min.css';
import refs from './refs';
import renderImages from './renderImagesFunc';
import { getNextPage } from './fetchImages';

export default async function onLoadMoreClick(event) {
  refs.loadMoreBtnEl.style.display = 'none';

  try {
    const response = await getNextPage();

    const result = await response.data;
    renderImages(result);
    console.log(result);
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
