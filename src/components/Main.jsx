import React from "react";
import Card from "./Card.jsx";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <button
          onClick={props.onEditAvatar}
          className="profile__avatar-edit-button"
          type="button"
          aria-label="Редактировать-аватар"
        ></button>
        <img
          src={currentUser.avatar}
          alt="Фото профиля"
          className="profile__avatar"
        />

        <div className="profile__info">
          <h1 className="profile__section-title">{currentUser.name}</h1>
          <button
            onClick={props.onEditProfile}
            className="profile__edit-button"
            type="button"
            aria-label="Изменить"
          ></button>
          <p className="profile__section-subtitle">{currentUser.about}</p>
        </div>

        <button
          onClick={props.onAddPhoto}
          className="profile__add-button"
          type="button"
          aria-label="Добавить"
        ></button>
      </section>

      <section className="elements" aria-label="Фотографии">
        {props.cards.map((card) => {
          return (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
