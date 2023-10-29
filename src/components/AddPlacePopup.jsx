import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name,
      link,
    });
  }

  React.useEffect(() => {
    if (props.isOpen) {
      setName("");
      setLink("");
   } 
  }, [props.isOpen]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name="add-photo"
      containerClass=""
      formName="popupFormAddCard"
      method="POST"
      title="Новое место"
      buttonText="Создать"
      buttonClass="popup__submit-button_add-photo"
    >
      <label className="popup__label">
        <input
          id="placeName-input"
          className="popup__input popup__input_NameCard"
          placeholder="Название"
          value={name}
          name="name"
          type="text"
          minLength="2"
          maxLength="30"
          required
          onChange={handleChangeName}
        />
        <span id="name-error" className="popup__error-visible"></span>
      </label>
      <label className="popup__label">
        <input
          id="placeLink-input"
          className="popup__input popup__input_UrlCard"
          placeholder="Ссылка на картинку"
          value={link}
          name="link"
          type="url"
          required
          onChange={handleChangeLink}
        />
        <span id="link-error" className="popup__error-visible"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
