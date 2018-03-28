'use strict';

var uploadOffer = document.querySelector('.notice__form');
var uploadOfferTitle = uploadOffer.querySelector('#title');
var uploadOfferPrice = uploadOffer.querySelector('#price');

// Добавление обработчиков валидации формы
uploadOfferTitle.addEventListener('invalid', validationTitle);
uploadOfferPrice.addEventListener('invalid', validationPrice);

// Добавление обработчика валидации формы
// uploadOfferComment.addEventListener('input', showError);

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

// Валидация формы
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

