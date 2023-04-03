import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
// import api from '../utils/Api';
import Card from './Card';

function Main({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content page__content">
      {/* <!-- Profile --> */}
      <section className="profile content__section">
        <div className="profile__avatar">
          <img
            className="profile__avatar-image"
            src={currentUser?.avatar}
            alt="Аватар"
          />
          <button
            className="profile__avatar-edit-buttom"
            onClick={() => onEditAvatar()}
            type="button"
          ></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser?.name}</h1>
          <button
            className="profile__edit-button"
            onClick={() => onEditProfile()}
            type="button"
          ></button>
          <p className="profile__job">{currentUser?.about}</p>
        </div>
        <button
          className="profile__add-button"
          onClick={() => onAddPlace()}
          type="button"
        ></button>
      </section>

      {/* <!-- Cards --> */}
      <section className="content__section">
        <ul className="cards">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
