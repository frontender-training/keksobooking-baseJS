'use strict';

var COUNT_USERS = 8;
// Количество гостей
var MIN_GUEST = 1;
var MAX_GUEST = 20;

// Количество комнат
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;

// Диапазон цен
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;

// Размеры маркера
var PIN_HEIGHT = 75;
var PIN_WIDTH = 56;

// Координаты маркера на карте
var minAxisX = 300;
var maxAxisX = 900;
var minAxisY = 100;
var maxAxisY = 500;

var TITLE_ADS = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPE_OF_ROOMS = ['flat', 'house', 'bungalo'];
var TIME = ['12:00', '13:00', '14:00'];
var FACILITY = ['wifi', 'dishwasher', 'parking', 'elevator', 'conditioner'];

// Функция, возвращающаая массив объектов объявлений
function generateAds() {
  var ads = [];
  var userAvatars = shuffleArray(generateAvatars());
  var adHeadlines = shuffleArray(TITLE_ADS);

  for (var i = 0; i < COUNT_USERS; i++) {
    var locationX = getRandomNumber(minAxisX, maxAxisX);
    var locationY = getRandomNumber(minAxisY, maxAxisY);

    ads.push({
      'author': {
        'avatar': userAvatars[i]                           // Перебираем массив и ставим первое значение обновленного массива
      },
      'offer': {
        'title': adHeadlines[i],                           // Перебираем массив и ставим первое значение обновленного массива
        'adress': (locationX + ', ' + locationY),
        'price': getRandomNumber(MIN_PRICE, MAX_PRICE),    // Случайная цена от 1000 до 1 000 000
        'type': getRandomElement(TYPE_OF_ROOMS),           // Выбираем случайное число из массива типа комнат
        'rooms': getRandomNumber(MIN_ROOMS, MAX_ROOMS),    // Выбираем случайное число из массива количества комнат
        'guests': getRandomNumber(MIN_GUEST, MAX_GUEST),   // Случайное количество гостей, которое можно разместить
        'checkin': getRandomElement(TIME),                 // Выбираем случайное число из массива времени заезда
        'checkout': getRandomElement(TIME),                // Выбираем случайное число из массива времени выезда
        'features': getArrayLength(FACILITY),              // Выбираем случайное число из массива удобств
        'description': '',
        'photos': []
      },
      'location': {
        'x': locationX,                                    // Случайное число, координата x метки на карте в блоке .tokyo__pin-map от 300 до 900
        'y': locationY                                     // Случайное число, координата y метки на карте в блоке .tokyo__pin-map от 100 до 500
      }
    });
  }
  return ads;
}

var listAds = generateAds();
insertPins();

// Вставляем полученные метки в карту
function insertPins() {
  var tokyoPinMap = document.querySelector('.tokyo__pin-map');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < listAds.length; i++) {
    fragment.appendChild(createPin(listAds[i]));          // Создаем и клонируем метки
  }
  tokyoPinMap.appendChild(fragment);
}

// Создаем шаблон по которому будут собираться все меткм для карты
function createPin(marker) {
  var userLocation = document.createElement('div');
  var userAvatar = document.createElement('img');
  userLocation.className = 'pin';
  userLocation.style.left = (marker.location.x - PIN_HEIGHT) + 'px';
  userLocation.style.top = marker.location.y - (PIN_WIDTH / 2) + 'px';
  userAvatar.className = 'rounded';
  userAvatar.width = 40;
  userAvatar.height = 40;
  userAvatar.src = marker.author.avatar;
  userLocation.appendChild(userAvatar);
  return userLocation;
}

// Генерируем массив аватарок
function generateAvatars() {
  var listAvatars = [];
  for (var i = 1; i < COUNT_USERS + 1; i++) {
    if (i < 10) {
      var avatars = 'img/avatars/user' + '0' + i + '.png';
    } else {
      var avatars = 'img/avatars/user' + i + '.png';
    }
    listAvatars.push(avatars);
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
