import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  function handleClick(card) {
    onCardClick(card);
  }

  const currentUser = useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = ( 
    `card__like-button ${isLiked && 'card__like-button_active'}` 
  );;   

  function handleLikeClick(card) {
    onCardLike(card)
  }
  return (
    <li className="card">
      {isOwn && (
        <button
          className="card__trash"
          type="button"
          onClick={() => onCardDelete(card)}
        />
      )}
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={() => handleClick(card)}
      />
      <div className="card__caption">
        <h2 className="card__mane-card">{card.name}</h2>
        <div className="card__like">
          <button className={cardLikeButtonClassName} type="button" onClick={()=>handleLikeClick(card)}/>
          <span className="care__like-quantity">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
