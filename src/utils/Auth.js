class Auth {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
    this._urlReg = config.endpoints.reg;
    this._urlLogin = config.endpoints.login;
    this._urlCheck = config.endpoints.check;
    this._post = config.methods.post;
    this._get = config.methods.get;
  }

  _checkResponse = (res) =>
    res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);


  _makeRequest(url, method, body, token) {
    if (token !== undefined) {
      this._headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
      method,
      headers: this._headers,
    };

    if (body !== undefined) {
      config.body = JSON.stringify(body);
    }

    return fetch(`${this._baseUrl}${url}`, config).then(this._checkResponse);
  }

  // Регистрация
  register = ({ email, password }) => {
    return this._makeRequest(
      this._urlReg,
      this._post,
      { email, password },
      undefined
    );
  };

  // Авторизация
  authorize = ({ email, password }) => {
    return this._makeRequest(
      this._urlLogin,
      this._post,
      { email, password },
      undefined
    );
  };

  // Чекаем токен
  getContent = (token) => {
    return this._makeRequest(this._urlCheck, this._get, undefined, token);
  };
}

const config = {
  baseUrl: 'https://auth.nomoreparties.co',
  headers: { 'Content-Type': 'application/json' },
  methods: { post: 'POST', get: 'GET' },
  endpoints: {
    reg: '/signup',
    login: '/signin',
    check: '/users/me',
  },
};

const auth = new Auth(config);

export default auth;
