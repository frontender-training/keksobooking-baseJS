'use strict';

var addOfferForm = document.querySelector('.notice__form');
var offerTitle = addOfferForm.querySelector('#title');
var offerPrice = addOfferForm.querySelector('#price');

var offerArrival = addOfferForm.querySelector('#time');
var offerDeparture = addOfferForm.querySelector('#timeout');
var offerPropertyType = addOfferForm.querySelector('#type');
var offerRoomNumber = addOfferForm.querySelector('#room_number');
var offerCapacity = addOfferForm.querySelector('#capacity');
var offerSubmit = addOfferForm.querySelector('.form__submit');
console.log(addOfferForm.elements);

// Обработка валидации формы при нажатии на кнопку Опубликовать
offerSubmit.addEventListener('click', function () {
  for (var i = 0; i < addOfferForm.elements.length; i++) {
    addOfferForm.elements[i].style.borderColor = '#d9d9d3';
    if (!addOfferForm.elements[i].checkValidity()) {
      addOfferForm.elements[i].style.borderColor = 'red';
    }
  }
});

// Добавление обработчиков валидации формы
offerTitle.addEventListener('invalid', validationTitle);
offerPrice.addEventListener('invalid', validationPrice);

// Добавление обработчиков синхронизации полей формы
offerArrival.addEventListener('change', function(evt) {
  offerDeparture.value = evt.target.value;
});

offerDeparture.addEventListener('change', function(evt) {
  offerArrival.value = evt.target.value;
});

offerPropertyType.addEventListener('change', function(evt) {
  switch (evt.target.value) {
    case 'flat':
      changeAttributePrice(1000);
      break;
    case 'hovel':
      changeAttributePrice(0);
      break;
    case 'palace':
      changeAttributePrice(10000);
      break;
    default:
      changeAttributePrice(1000);
      break;
  }
});

offerRoomNumber.addEventListener('change', function (evt) {
  switch (evt.target.value) {
    case '1':
      syncFields(offerCapacity, 1);
      break;
    case '0':
      syncFields(offerCapacity, 0);
      break;
    default:
      syncFields(offerCapacity, 0);
      break;
  }
});

offerCapacity.addEventListener('change', function (evt) {
  switch (evt.target.value) {
    case '1':
      syncFields(offerRoomNumber, 1);
      break;
    case '0':
      syncFields(offerRoomNumber, 0);
      break;
    default:
      syncFields(offerRoomNumber, 0);
      break;
  }
});

function syncFields(field, syncField) {
  field.value = syncField.toString();
}

function changeAttributePrice(price) {
  offerPrice.placeholder = price.toString();
  offerPrice.setAttribute('min', price);
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

