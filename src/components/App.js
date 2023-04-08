import React, { useEffect, useState } from 'react';
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

  const [isInfoTooltip, setInfoTooltip] = useState(false);

  // Стейт массива карточек
  const [currentCards, setCurrentCards] = useState([]);
  // Стейт карточки для удаления
  const [currentCard, setCurrentCard] = useState(null);
  // Стейт данных пользователя
  const [currentUser, setCurrentUser] = useState(null);
  // Стейт ожидания загрузки
  const [isLoading, setLoading] = useState(false);

  const [isLoggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();
  const [account, setAccount] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

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
  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    // setSelectedCard(null);
    closseImagepopup();
    setCardDeletePopupOpen(false);
    setInfoTooltipOpen(false);
  }

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

  useEffect(() => {
    localStorage.getItem('jwt') ? setLoggedIn(true) : setLoggedIn(false);
  }, [localStorage.getItem('jwt')]);

  useEffect(() => {
    auth
      .getContent(localStorage.getItem('jwt'))
      .then((res) => {
        setAccount(res?.data?.email);
        console.log(res?.data?.email);
        // setLoggedIn(true);
      })
      .then(() => {})
      .catch((err) => console.log(err));
  }, [isLoggedIn]);

  const cbLogin = ({ email, password }) => {
    setLoading(true);
    console.log({ email, password });
    auth
      .authorize({ email, password })
      .then((res) => {
        res.token && localStorage.setItem('jwt', res.token);
        navigate('/');
        setLoading(false);
        setLoggedIn(true);

      })
      .catch((err) => {
        console.log(err);
        setInfoTooltipOpen(true);
        setInfoTooltip(false);
        setLoading(false);
      })
      .finally(() => {
      });
  };

  const cbRegister = ({ email, password }) => {
    setLoading(true);
    console.log({ email, password });
    auth
      .register({ email, password })
      .then((res) => {
        console.log(res);
        setInfoTooltipOpen(true);
        setInfoTooltip(true);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltipOpen(true);
        setInfoTooltip(false);
        setLoading(false);
      })
      .finally(() => {});
  };

  const cbLogOut = () => {
    localStorage.removeItem('jwt');
    navigate('/sign-in');

  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        <Header logOut={cbLogOut} account={account} isLoggedIn={isLoggedIn} />
        <Routes>
          <Route
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
            path="sign-up"
            element={
              <Register
                isLoggedIn={isLoggedIn}
                onRegister={cbRegister}
                replace
              />
            }
          />
          <Route
            path="sign-in"
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
