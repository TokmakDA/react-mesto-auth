import { useEffect } from 'react';

const Popup = ({ isOpen, name, onClose, children }) => {
  // указываем `useEffect` для обработчика `Escape`
  useEffect(() => {
    if (!isOpen) return;
    function handleEscapeKey(e) {
      if (e.code === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [isOpen, onClose]);

  // создаем обработчик оверлея
  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`popup ${isOpen && 'popup_is-opened'} popup_type_${name}`}
      onClick={handleOverlay}
    >
      <div className={`popup__container popup__container_type_${name}`}>
        <button
          className="popup__close"
          onClick={onClose}
          type="button"
        ></button>

        {children}
      </div>
    </div>
  );
};

export default Popup;
