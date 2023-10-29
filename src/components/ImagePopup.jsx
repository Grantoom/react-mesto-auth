import React from "react";

function ImagePopup(props) {
  return (
    <div className={`popup popup-image ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup-image__container">
        <button
          onClick={props.onClose}
          className="popup__exit"
          type="button"
          aria-label="Закрыть окно"
        ></button>
        <img
          className="popup-image__pic"
          alt={`На карточке ${props.name}`}
          src={props.card.link}
        />
        <p className="popup-image__title">{props.card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
