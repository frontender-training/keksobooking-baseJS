'use strict';

var uploadOffer = document.querySelector('.notice__form');
var uploadOfferTitle = uploadOffer.querySelector('#title');
var uploadOfferPrice = uploadOffer.querySelector('#price');

var uploadOfferTimeIn = uploadOffer.querySelector('#time');
var uploadOfferTimeOut = uploadOffer.querySelector('#timeout');
var uploadOfferTypeAccomond = uploadOffer.querySelector('#type');
var uploadOfferRoomNumber = uploadOffer.querySelector('#room_number');
var uploadOfferSeatsNumber = uploadOffer.querySelector('#capacity');

// Добавление обработчиков валидации формы
uploadOfferTitle.addEventListener('invalid', validationTitle);
uploadOfferPrice.addEventListener('invalid', validationPrice);

// Добавление обработчиков синхронизации полей формы
uploadOfferTimeIn.addEventListener('change', onChangeTime);
uploadOfferTypeAccomond.addEventListener('change', onChangePrice);
uploadOfferRoomNumber.addEventListener('change', onChangeRooms);

// Добавление обработчика валидации формы
// uploadOfferComment.addEventListener('input', showError);

function onChangeRooms(evt) {
  var element = evt.target.value;
  if (element === '1 комната') {
    uploadOfferSeatsNumber.value = 'не для гостей';
  } else if (element !== '1 комната') {
    uploadOfferSeatsNumber.value = 'для 3 гостей';
  }
}

function onChangePrice(evt) {
  var element = evt.target.value;
  if (element === 'flat') {
    uploadOfferPrice.value = 1000;
  } else if (element === 'hovel') {
    uploadOfferPrice.value = 0;
  } else if (element === 'palace') {
    uploadOfferPrice.value = 10000;
  }
}

function onChangeTime(evt) {
  uploadOfferTimeOut.value = evt.target.value;
}

function validationPrice(evt) {
  var element = evt.target;
  if (element.value.length === 0) {
    element.setCustomValidity('Введите, пожалуйста, цену. Это обязательно поле для заполнения');
  } else if (element.value < 1000) {
    element.setCustomValidity('Цена должна быть не менее 1000 руб.');
  } else if (element.value > 1000000) {
    element.setCustomValidity('Цена должна быть не более 1 000 000 руб.');
  } else {
    element.setCustomValidity('');
  }
}

function validationTitle(evt) {
  var element = evt.target;
  if (element.validity.tooShort) {
    element.setCustomValidity('Заголовок должен быть не меньше 30-ти символов');
  } else if (element.validity.tooLong) {
    element.setCustomValidity('Заголовок не должен превышать 100 символов');
  } else if (element.validity.valueMissing) {
    element.setCustomValidity('Введите, пожалуйста, заголовок объявления. Это обязательно поле для заполнения');
  } else {
    element.setCustomValidity('');
  }
}

