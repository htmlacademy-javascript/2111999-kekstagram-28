import {isEscapeKey} from './util.js';
import {resetValueScale} from './scale.js';
import {resetEffects} from './effect.js';
import {pristine} from './validation.js';

const FORMATS = ['jpeg', 'png', 'jpg'];

const bodyElement = document.querySelector('body');
const inputPictureElement = document.querySelector('.img-upload__input');
const uploadPopupPictureElement = document.querySelector('.img-upload__overlay');
const cancelButtonElement = document.querySelector('.img-upload__cancel');
const hashtagFieldElement = document.querySelector('.text__hashtags');
const commentFieldElement = document.querySelector('.text__description');
const formElement = document.querySelector('.img-upload__form');
const previewPictureElement = document.querySelector('.img-upload__preview');
const miniaturePreviewPicturesElement = document.querySelectorAll('.effects__preview');


const isFieldFocused = () =>
  document.activeElement === hashtagFieldElement || document.activeElement === commentFieldElement;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !isFieldFocused()) {
    evt.preventDefault();
    closePopupForm();
  }
};

function openPopupForm() {
  uploadPopupPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

function closePopupForm() {
  formElement.reset();
  resetValueScale();
  resetEffects();
  pristine.reset();
  inputPictureElement.value = '';
  uploadPopupPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

const onFileUploadClick = () => {
  openPopupForm();
};

const onCloseButtonClick = () => {
  closePopupForm();
};

const displayPicture = (picture) => {
  const img = URL.createObjectURL(picture);
  previewPictureElement.children[0].src = img;
  miniaturePreviewPicturesElement.forEach((child) => {
    child.style.backgroundImage = `url(${img})`;
  });
};

inputPictureElement.addEventListener('change',() => {
  onFileUploadClick();
  const file = inputPictureElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FORMATS.some((it) => fileName.endsWith(it));

  if (matches) {
    displayPicture(file);
  }
});

cancelButtonElement.addEventListener('click', onCloseButtonClick);


export {closePopupForm, onDocumentKeydown};

