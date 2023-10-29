import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = useRef(null);

  useEffect(() => {
    if (props.isOpen) {
      avatarRef.current.value = "";
    }
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name="type_avatar"
      containerClass="popup__container-avatar"
      formName="inputAvatar"
      title="Обновить аватар"
      buttonText="Сохранить"
    >
      <label className="popup__label">
        <input
          ref={avatarRef}
          id="url"
          className="popup__input popup__input_type_title"
          type="url"
          name="avatar"
          placeholder="Введите ссылку на аватар"
          minLength="2"
          maxLength="200"
          required
        />
        <span id="userAvatar-error" className="popup__error-visible"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
