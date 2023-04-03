import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function CardDeletePopup({isOpen, onClose, isLoading, onCardDelete, card}) {
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения во внешний обработчик
    onCardDelete(card);
  }

  useEffect(()=>{
    
  }, [isOpen === false])

  
  return (
    <PopupWithForm
      name={'delete-card-form'}
      title={'Удалить! Вы уверены?'}
      button={'Да'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={(e) => handleSubmit(e)}
      isLoading={isLoading}
    />
  );
}

export default CardDeletePopup;
