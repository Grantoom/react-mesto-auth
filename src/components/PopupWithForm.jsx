import React from "react";

function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className={`popup__container ${props.containerClass}`}>
        <button
          onClick={props.onClose}
          className="popup__exit"
          type="button"
          aria-label="Закрыть окно"
        ></button>
        <form
          className={`popup__form popup__form_${props.name}`}
          onSubmit={props.onSubmit}
          name={props.formName}
        >
          <h2 className="popup__header">{props.title}</h2>
          {props.children}
          <button
            className={`popup__submit-button ${props.buttonClass}`}
            type="submit"
          >
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
