const refs = {
  BASE_URL: 'https://pixabay.com/api',
  key: '36804541-6df310b69146ced50149f1ae2',
  imageType: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
  page: 1,

  formEl: document.querySelector('#search-form'),
  inputEl: document.querySelector('input'),
  galleryContainerEl: document.querySelector('.gallery'),
  loadMoreBtnEl: document.querySelector('.load-more'),
};

export default refs;
