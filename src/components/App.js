import React, { useCallback, useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import '../index.css';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
// import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import CardDeletePopup from './DeleteCardPopup';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import auth from '../utils/Auth';
import InfoTooltip from './InfoTooltip';
import Loading from './Loading';

function App() {
  // Стейты состояния открытия попапов
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [isCardDeletePopupOpen, setCardDeletePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);

  // Стейт результат обработки api Auth: OK=true, error=false
  const [isInfoTooltip, setInfoTooltip] = useState(false);

  // Стейт массива карточек
  const [currentCards, setCurrentCards] = useState([]);
  // Стейт карточки для удаления
  const [currentCard, setCurrentCard] = useState(null);
  // Стейт данных пользователя
  const [currentUser, setCurrentUser] = useState(null);
  // Стейт ожидания загрузки
  const [isLoading, setLoading] = useState(false);

  // Стейт авторизации на сайте
  const [isLoggedIn, setLoggedIn] = useState(false);

  // Стейт информация об аккаунте
  const [account, setAccount] = useState('');

  const navigate = useNavigate();

  // Получаем первичные данные
  useEffect(() => {
    api
      .getInitialsData()
      .then(([UserInfo, initialCards]) => {
        setCurrentUser(UserInfo);
        setCurrentCards(initialCards);
      })
      .catch((err) => console.log(err));
  }, []);

  // Обработчики открытия попапов
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }
  function handleCardDeleteClick(card) {
    setCurrentCard(card);
    setCardDeletePopupOpen(true);
  }

  // обработчик открытия попапа с картинкой карточки
  function handleCardClick(card) {
    setCurrentCard(card);
    setImagePopupOpen(true);
  }
  // обработчик открытия попапа с картинкой карточки
  function closseImagepopup() {
    setCurrentCard(null);
    setImagePopupOpen(false);
  }

  // Отбработчик закрытия попапов
  const closeAllPopups = useCallback(() => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    closseImagepopup();
    setCardDeletePopupOpen(false);
    setInfoTooltipOpen(false);
  }, []);

  // Закрытие попапов нажатием на Escape
  useEffect(() => {
    if (
      isEditAvatarPopupOpen ||
      isEditProfilePopupOpen ||
      isAddPlacePopupOpen ||
      isImagePopupOpen ||
      isCardDeletePopupOpen ||
      isInfoTooltipOpen
    ) {
      document.addEventListener('keydown', handleEscapeKey);
    }
    function handleEscapeKey(e) {
      if (e.code === 'Escape') {
        closeAllPopups();
        console.log('Escape');
      }
    }

    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [
    isEditAvatarPopupOpen,
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    isImagePopupOpen,
    isCardDeletePopupOpen,
    isInfoTooltipOpen,
    closeAllPopups,
  ]);

  // сохраняем введенные данные пользователя в Api
  function handleUpdateUser(dataUser) {
    setLoading(true);
    api
      .patchUserInfo(dataUser)
      .then((resUser) => {
        setCurrentUser(resUser);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  // сохраняем новый аватар пользователя в Api
  function handleUpdateAvatar(linkAvatar) {
    setLoading(true);
    api
      .patchUserAvatar(linkAvatar)
      .then((resUser) => {
        setCurrentUser(resUser);
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  // добавляем новую карточку
  function handleAddPlaceSubmit(dataCard) {
    setLoading(true);
    api
      .postNewCard(dataCard)
      .then((newCard) => {
        setCurrentCards([newCard, ...currentCards]);
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  // обработчик лайков и дизлайков
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    (!isLiked ? api.addLikeCard(card._id) : api.deleteLikeCard(card._id))
      .then((newCard) => {
        setCurrentCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  // обработчик удаления карточки
  function handleCardDeleteSubmit(card) {
    setLoading(true);
    api
      .deleteCard(card._id)
      .then((res) => {
        setCurrentCards((state) => state.filter((c) => c._id !== card._id));
        console.log(res.message);
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  const cbTokenCheck = useCallback(async () => {
    try {
      setLoading(true);
      let jwt = localStorage.getItem('jwt');
      if (!jwt) {
        throw new Error('Ошибка, нет токена');
      }
      const userAccaunt = await auth.getContent(jwt);
      if (userAccaunt) {
        setAccount(userAccaunt.data);
        setLoggedIn(true);
        navigate('/');
      }
    } catch {
      setLoggedIn(false);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    cbTokenCheck();
  }, [cbTokenCheck]);

  const cbLogin = ({ email, password }) => {
    setLoading(true);
    auth
      .authorize({ email, password })
      .then((res) => {
        res.token && localStorage.setItem('jwt', res.token);
        navigate('/');
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltipOpen(true);
        setInfoTooltip(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const cbRegister = ({ email, password }) => {
    setLoading(true);
    auth
      .register({ email, password })
      .then((res) => {
        console.log(res);
        setInfoTooltipOpen(true);
        setInfoTooltip(true);
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltipOpen(true);
        setInfoTooltip(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const cbLogOut = () => {
    localStorage.removeItem('jwt');
    navigate('/sign-in');
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        <Header
          logOut={cbLogOut}
          account={account.email}
          isLoggedIn={isLoggedIn}
        />
        <Routes>
          <Route
            index
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Main
                  cards={currentCards}
                  onEditAvatar={() => handleEditAvatarClick()}
                  onEditProfile={() => handleEditProfileClick()}
                  onAddPlace={() => handleAddPlaceClick()}
                  onCardClick={handleCardClick}
                  onCardLike={(card) => handleCardLike(card)}
                  onCardDelete={(card) => handleCardDeleteClick(card)}
                />
                <Footer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sign-up"
            element={
              <Register
                isLoggedIn={isLoggedIn}
                onRegister={cbRegister}
                replace
              />
            }
          />
          <Route
            path="/sign-in"
            element={
              <Login isLoggedIn={isLoggedIn} onLogin={cbLogin} replace />
            }
          />
        </Routes>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={(dataUser) => handleUpdateAvatar(dataUser)}
          isLoading={isLoading}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={(dataUser) => handleUpdateUser(dataUser)}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={(dataNewCard) => handleAddPlaceSubmit(dataNewCard)}
          isLoading={isLoading}
        />

        <ImagePopup
          {...currentCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />

        <CardDeletePopup
          isOpen={isCardDeletePopupOpen}
          onClose={closeAllPopups}
          onCardDelete={(card) => handleCardDeleteSubmit(card)}
          isLoading={isLoading}
          card={currentCard}
        />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isInfoTooltip={isInfoTooltip}
        />

        <Loading isLoading={isLoading} />
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;
