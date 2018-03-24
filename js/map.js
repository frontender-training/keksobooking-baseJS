'use strict';

var DATA_ADS = {
  COUNT_USERS: 8,
  MIN_GUEST: 1,         // Количество гостец
  MAX_GUEST: 20,
  MIN_ROOMS: 1,         // Количество комнат
  MAX_ROOMS: 5,
  MIN_PRICE: 1000,      // Диапазон цен
  MAX_PRICE: 1000000,
  PIN_HEIGHT: 75,       // Размеры маркера
  PIN_WIDTH: 56,
  MIN_AXIS_X: 300,        // Координаты маркера на карте
  MAX_AXIS_X: 900,
  MIN_AXIS_Y: 100,
  MAX_AXIS_Y: 500,
  TITLE_ADS: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
  TYPE_OF_ROOMS: ['flat', 'house', 'bungalo'],
  TIME: ['12:00', '13:00', '14:00'],
  FACILITY: ['wifi', 'dishwasher', 'parking', 'elevator', 'conditioner']
}

// Код клавиш для обработки событий
var KEY_CODE = {
  ENTER: 13,
  ESC: 27
};

var listAds = generateAds();
insertPins();

var pinElements = document.querySelectorAll('.pin');
var clickedPin = null;
var dialog = document.querySelector('.dialog');
var dialogClose = dialog.querySelector('.dialog__close');

// Функция закрытия оффера по клику
function onOfferCloseClick() {
  hideOffer();
  deactivatePin();

  dialogClose.removeEventListener('click', onOfferCloseClick);
  dialogClose.removeEventListener('keydown', onOfferCloseKeyDown);
  document.removeEventListener('keydown', onOfferCloseKeyDown);
}

// Функция закрытия окна редактирования фото по клику на ESC
function onOfferCloseKeyDown(evt) {
  if (evt.keyCode === KEY_CODE.ESC && KEY_CODE.ENTER) {
    hideOffer();
    deactivatePin();
  }
}

function showOffer() {
  dialog.classList.remove('hidden');
}

function hideOffer() {
  dialog.classList.add('hidden');
}

function activatePin(evt) {
  if (clickedPin) {
    clickedPin.classList.remove('pin--active');
  }
  clickedPin = evt.currentTarget;
  clickedPin.classList.add('pin--active');
}

function deactivatePin() {
  clickedPin.classList.remove('pin--active');
}

function activateOffer(evt) {
  activatePin(evt);                        // активируем метку на карте
  generateOffer(listAds[clickedPin.data]); // генерируем объявление
  showOffer();                             // показываем объявление

  dialogClose.addEventListener('click', onOfferCloseClick);
  dialogClose.addEventListener('keydown', onOfferCloseKeyDown);
  document.addEventListener('keydown', onOfferCloseKeyDown);
}

// Генерируем шаблон объявления
function generateOffer(advertisement) {
  var offer = advertisement.offer;
  var author = advertisement.author;

  var offerDialog = document.querySelector('#offer-dialog');              // Берем элемент, в который будем вставлять наш шаблон
  var userAds = offerDialog.querySelector('.dialog__panel');              // Берем элемент, в который будем вставлять текст объявления
  var dialogIcon = offerDialog.querySelector('.dialog__title > img');     // Берем элемент, в который будем аватарку юзера

  var adsList = userAds.cloneNode(true);

  dialogIcon.src = author.avatar;

  adsList.querySelector('.lodge__title').textContent = offer.title;
  adsList.querySelector('.lodge__address').textContent = offer.adress;
  adsList.querySelector('.lodge__price').innerHTML = getPrice(offer.price);
  adsList.querySelector('.lodge__type').textContent = translateType(offer.type);
  adsList.querySelector('.lodge__rooms-and-guests').textContent = getGuestsAndRooms(offer.guests, offer.rooms);
  adsList.querySelector('.lodge__checkin-time').textContent = getTime(offer.checkin, offer.checkout);
  removeChilds(adsList.querySelector('.lodge__features'));                // Удаляем иконки удобств, выведенные по умолчанию
  adsList.querySelector('.lodge__features').appendChild(generateIconsFeatures(offer.features));
  adsList.querySelector('.lodge__description').textContent = offer.description;

  offerDialog.removeChild(userAds);
  offerDialog.appendChild(adsList);

  function removeChilds(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }
}

// Создаем иконку удобств
function createIconFeature(feature) {
  var iconFeature = document.createElement('span');
  iconFeature.classList.add('feature__image');
  iconFeature.classList.add('feature__image--' + feature);
  return iconFeature;
}

// Проходим по всему массиву
function generateIconsFeatures(arrayFeatures) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arrayFeatures.length; i++) {
    var feature = createIconFeature(arrayFeatures[i]);
    fragment.appendChild(feature);
  }
  return fragment;
}

// Переводим название типов жилья на русский
function translateType(type) {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalo':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    default:
      return type;
  }
}

// Получаем шаблон вывода информации о комнатах
function getGuestsAndRooms(guests, rooms) {
  return 'Для ' + guests + ' гостей в ' + rooms + ' комнатах';
}

// Получаем шаблон вывода информации о времени заезда и выезда
function getTime(checkin, checkout) {
  return 'Заезд после ' + checkin + ', выезд ' + checkout;
}

// Получаем шаблон вывода информации о цене комнате за ночь
function getPrice(price) {
  return price + ' &#x20bd;/ночь';
}

// Вставляем полученные метки в карту
function insertPins() {
  var tokyoPinMap = document.querySelector('.tokyo__pin-map');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < listAds.length; i++) {
    fragment.appendChild(createPin(listAds[i], i));          // Создаем и клонируем метки
  }
  tokyoPinMap.appendChild(fragment);
}

// Создаем шаблон по которому будут собираться все меткм для карты
function createPin(marker, index) {
  var userLocation = document.createElement('div');
  var userAvatar = document.createElement('img');
  userLocation.className = 'pin';
  userLocation.tabIndex = 0;
  userLocation.style.left = (marker.location.x - DATA_ADS.PIN_HEIGHT) + 'px';
  userLocation.style.top = marker.location.y - (DATA_ADS.PIN_WIDTH / 2) + 'px';
  userAvatar.className = 'rounded';
  userAvatar.width = 40;
  userAvatar.height = 40;
  userAvatar.src = marker.author.avatar;
  userLocation.appendChild(userAvatar);
  userLocation.data = index;

  // Добавляем обработчик события при клике на метку
  userLocation.addEventListener('click', activateOffer);

  // Добавляем обработчик события при нажатаии на клавишу ENTER на метке
  userLocation.addEventListener('keydown', function(evt) {
    if (evt.keyCode === KEY_CODE.ENTER) {
      activateOffer(evt);
    }
  });
  return userLocation;
}


// Функция, возвращающаая массив объектов объявлений
function generateAds() {
  var ads = [];
  var userAvatars = shuffleArray(generateAvatars());
  var adHeadlines = shuffleArray(DATA_ADS.TITLE_ADS);

  for (var i = 0; i < DATA_ADS.COUNT_USERS; i++) {
    var locationX = getRandomNumber(DATA_ADS.MIN_AXIS_X, DATA_ADS.MAX_AXIS_X);
    var locationY = getRandomNumber(DATA_ADS.MIN_AXIS_Y, DATA_ADS.MAX_AXIS_Y);

    ads.push({
      'author': {
        'avatar': userAvatars[i]                           // Перебираем массив и ставим первое значение обновленного массива
      },
      'offer': {
        'title': adHeadlines[i],                           // Перебираем массив и ставим первое значение обновленного массива
        'adress': (locationX + ', ' + locationY),
        'price': getRandomNumber(DATA_ADS.MAX_PRICE, DATA_ADS.MAX_PRICE),    // Случайная цена от 1000 до 1 000 000
        'type': getRandomElement(DATA_ADS.TYPE_OF_ROOMS),           // Выбираем случайное число из массива типа комнат
        'rooms': getRandomNumber(DATA_ADS.MIN_ROOMS, DATA_ADS.MAX_ROOMS),    // Выбираем случайное число из массива количества комнат
        'guests': getRandomNumber(DATA_ADS.MIN_GUEST, DATA_ADS.MAX_GUEST),   // Случайное количество гостей, которое можно разместить
        'checkin': getRandomElement(DATA_ADS.TIME),                 // Выбираем случайное число из массива времени заезда
        'checkout': getRandomElement(DATA_ADS.TIME),                // Выбираем случайное число из массива времени выезда
        'features': getArrayLength(DATA_ADS.FACILITY),              // Выбираем случайное число из массива удобств
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

// Генерируем массив аватарок
function generateAvatars() {
  var listAvatars = [];

  for (var i = 1; i < DATA_ADS.COUNT_USERS + 1; i++) {
    if (i < 10) {
      i = '0' + i;
    }
    var avatars = 'img/avatars/user' + i + '.png';
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

// Функция, возвращающая новый массив из старого в случайном порядке
function shuffleArray(array) {
  var mixedArray = array.slice();
  for (var i = mixedArray.length - 1; i > 0; i--) {
    var randomIndex = Math.floor(Math.random() * (i + 1));
    var tempValue = mixedArray[i];
    mixedArray[i] = mixedArray[randomIndex];
    mixedArray[randomIndex] = tempValue;
  }
  return mixedArray;
}
