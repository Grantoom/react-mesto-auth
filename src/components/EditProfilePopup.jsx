import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import PopupWithForm from "./PopupWithForm.jsx";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name="edit-profile"
      containerClass=""
      formName="popupFormProfile"
      method="POST"
      title="Редактировать профиль"
      buttonText="Сохранить"
      buttonClass="popup__submit-button_edit-profile"
    >
      <label className="popup__label">
        <input
          id="userName-input"
          className="popup__input popup__input_role_name"
          placeholder="Имя"
          name="name"
          type="text"
          minLength="2"
          maxLength="40"
          required
          onChange={handleChangeName}
          value={name || ""}
        />
        <span id="username-error" className="popup__error-visible"></span>
      </label>

      <label className="popup__label">
        <input
          id="userProf-input"
          className="popup__input popup__input_role_about"
          placeholder="О себе"
          name="about"
          type="text"
          minLength="2"
          maxLength="200"
          required
          onChange={handleChangeDescription}
          value={description || ""}
        />
        <span id="profession-error" className="popup__error-visible"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
