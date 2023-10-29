import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const isOwn = props.card.owner._id === currentUser._id;
  const cardLikeButtonClassName = `${
    isLiked ? "element__vector element__vector_active" : "element__vector"
  }`;

  const cardRemoveButtonClassName = `${
    isOwn
      ? "element__trash element__trash_visible"
      : "element__trash element__trash_hidden"
  }`;

  function handleCardClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <div className="element">
      <img
        onClick={handleCardClick}
        className="element__img"
        src={props.card.link}
        alt={`На карточке ${props.card.name}`}
      />
      <button
        onClick={handleDeleteClick}
        className={cardRemoveButtonClassName}
        type="button"
        aria-label="Удалить карточку"
      ></button>
      <div className="element__description">
        <h2 className="element__text">{props.card.name}</h2>
        <button
          onClick={handleLikeClick}
          className={cardLikeButtonClassName}
          type="button"
          aria-label="Поставить лайк"
        ></button>
        <p className="element__like-count">{props.card.likes.length}</p>
      </div>
    </div>
  );
}

export default Card;
