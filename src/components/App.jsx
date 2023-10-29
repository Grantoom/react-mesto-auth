import "../index.css";
import api from "../utils/Api.js";

import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [isAvatarPopupOpen, setAvatarPopupOpen] = React.useState(false);
  const [isProfilePopupOpen, setProfilePopupOpen] = React.useState(false);
  const [isPhotoPopupOpen, setPhotoPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [isDeleteOpen, setDeleteOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([userInfo, cardsData]) => {
        setCurrentUser(userInfo);
        setCards(cardsData);
      })
      .catch((err) => console.log(`Что-то пошло не так: ${err}`));
  }, []);

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setPhotoPopupOpen(true);
  }

  const closeAllPopup = () => {
    setProfilePopupOpen(false);
    setAvatarPopupOpen(false);
    setPhotoPopupOpen(false);
    setImagePopupOpen(false);
    setDeleteOpen(false);
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (!isLiked) {
      api
        .addCardLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .deleteCardLike(card._id, isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((elem) => elem._id !== card._id));
      })

      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(userData) {
    api
      .sendUserInfo(userData)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopup();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .setUserAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopup();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .createNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopup();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header />

          <Main
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPhoto={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />

          <Footer />
        </div>

        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isProfilePopupOpen}
          onClose={closeAllPopup}
        />

        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isAvatarPopupOpen}
          onClose={closeAllPopup}
        />

        <AddPlacePopup
          onAddPlace={handleAddPlaceSubmit}
          isOpen={isPhotoPopupOpen}
          onClose={closeAllPopup}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopup}
        />

        <PopupWithForm
          isOpen={isDeleteOpen}
          onClose={closeAllPopup}
          name="type_delete-card"
          containerClass="popup__container-delete"
          title="Вы уверены?"
          buttonText="Да"
          buttonClass="popup__type-delete"
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;