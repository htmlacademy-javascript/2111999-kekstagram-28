import {showAlert} from './util.js';

const DEFAULT_URL = 'https://28.javascript.pages.academy/kekstagram';
const Routes = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const Methods = {
  GET: 'GET',
  POST: 'POST',
};

const filterElement = document.querySelector('.img-filters');

const getData = (onSuccess) => {
  fetch(`${DEFAULT_URL}${Routes.GET_DATA}`)
    .then((response) => {
      if(response.ok) {
        filterElement.classList.remove('img-filters--inactive');
        return response.json();
      }
      showAlert(`Ошибка! Код:${response.status}`);
    }
    )
    .then((photos) => {
      onSuccess(photos);
    })
    .catch(() => {
      showAlert('Не удалосось загрузить данные. Попробуйте обновить страницу.');
    });
};

const sendData = (onSuccess, onFail, body, finalSubmit) => {
  fetch(`${DEFAULT_URL}${Routes.SEND_DATA}`,
    {
      method: Methods.POST,
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    })
    .finally(() => {
      finalSubmit();
    });
};

export {getData, sendData};
