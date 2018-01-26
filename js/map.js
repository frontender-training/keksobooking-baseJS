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

// Функция, возвращающая случайное число в диапазоне
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция, возвращающая случайный элемемент массива
function getRandomElement(array) {
  for (var i = 0; i < array.length; i++) {
    var randomIndex = Math.floor(Math.random() * array.length);
  }
  var randomElement = array[randomIndex];
  return randomElement;
}

// Функция, создающая массив произвольной длины
function getArrayLength(array) {
  var clone = array.slice();
  clone.length = getRandomNumber(1, array.length);
  return clone;
}

// Функция, возвращающая массив в случайном порядке
 function shuffleArray(array) {
   for (var i = array.length - 1; i > 0; i--) {
     var randomIndex = Math.floor(Math.random() * (i + 1));
     var tempValue = array[i];
     array[i] = array[randomIndex];
     array[randomIndex] = tempValue;
   }
   return array;
 }
