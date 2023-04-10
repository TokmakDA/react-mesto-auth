class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse = (res) =>
    res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

  _makeRequest(url, method, body) {
    const config = {
      method,
      headers: this._headers,
    };

    if (body !== undefined) {
      config.body = JSON.stringify(body);
    }

    return fetch(`${this._baseUrl}${url}`, config).then(this._checkResponse);
  }

  //Загрузка информации о пользователе с сервера
  // запрос GET
  getUserInfo() {
    return this._makeRequest('/users/me', 'GET');
  }

  // Загрузка карточек с сервера
  // запрос GET
  getInitialCards() {
    return this._makeRequest('/cards', 'GET');
  }

  // Редактирование профиля (Данные уходят на сервер)
  patchUserInfo(user) {
    return this._makeRequest('/users/me', 'PATCH', {
      name: user.name,
      about: user.about,
    });
  }

  // Добавление новой карточки. полученный ответ нужно отрендерить на страницу
  // запрос POST
  postNewCard(card) {
    return this._makeRequest('/cards', 'POST', {
      name: `${card.name}`,
      link: `${card.link}`,
    });
  }

  // Удаление карточки
  // DELETE-запрос:
  deleteCard(cardID) {
    return this._makeRequest(`/cards/${cardID}`, 'DELETE');
  }

  // Постановка  лайка
  // Чтобы лайкнуть карточку, отправьте PUT-запрос:
  addLikeCard(cardID) {
    return this._makeRequest(`/cards/${cardID}/likes`, 'PUT');
  }

  // Cнятие лайка
  // Чтобы убрать лайк, нужно отправить DELETE-запрос:
  deleteLikeCard(cardID) {
    return this._makeRequest(`/cards/${cardID}/likes`, 'DELETE');
  }

  // Обновление аватара пользователя (Данные уходят на сервер)
  // Запрос PATCH
  patchUserAvatar(linkAvatar) {
    return this._makeRequest(`/users/me/avatar`, 'PATCH', {
      avatar: linkAvatar,
    });
  }

  // закгружаем первичную информацию с сервера
  getInitialsData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: '0fac7cb1-5a97-4e4b-9bc6-bcf4a65057a3',
    'Content-Type': 'application/json',
  },
});

export default api;
