import React, { useRef } from 'react';

function ImagePopup(props) {
  const modalRef = useRef();

  function checkIsClickedOutside(e) {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      props.onClose();
    }
  }

  return (
    <div
      className={`popup popup_card-image ${props.isOpen && 'popup_is-opened'}`}
      onClick={checkIsClickedOutside}
    >
      <div className="popup__container" ref={modalRef}>
        <button
          className="popup__close"
          onClick={props.onClose}
          type="button"
        ></button>
        <img className="popup__image" src={props.link} alt={props.name} />
        <h2 className="popup__title-image">{props.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
