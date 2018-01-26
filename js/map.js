'use strict';

var COUNT_USERS = 8;
var MIN_GUEST = 1;
var MAX_GUEST = 20;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var PIN_HEIGHT = 75;
var PIN_WIDTH = 56;

var TITLE_ADS = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPE_OF_ROOMS = ['flat', 'house', 'bungalo'];
var TIME = ['12:00', '13:00', '14:00'];
var FACILITY = ['wifi', 'dishwasher', 'parking', 'elevator', 'conditioner'];

// Генерируем массив аватарок
function generateAvatars() {
  var listAvatars = [];
  for (var i=1; i < COUNT_USERS + 1; i++) {
    if (i < 10) {
      var Avatars = 'img/avatars/user' + '0' + i + '.png';
    } else {
      var Avatars = 'img/avatars/user' + i + '.png';
    }
    listAvatars.push(Avatars);
  }
  return listAvatars;
}
