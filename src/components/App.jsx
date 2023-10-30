import "../index.css";
import api from "../utils/Api.js";
import React from "react";

import auth from '../utils/auth.js';
import ProtectedRoute from './ProtectedRoute';
import { Navigate, useNavigate, Route, Routes } from 'react-router-dom'
import InfoTooltip from './InfoTooltip';
import Login from './Login';
import Register from './Register';

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
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [isDeleteOpen, setDeleteOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isSuccesLogin, setIsSuccesLogin] = React.useState(false);
  const [authUserEmail, setAuthUserEmail] = React.useState(null);

  const navigate = useNavigate();

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([userInfo, cardsData]) => {
        setCurrentUser(userInfo);
        setCards(cardsData);
      })
      .catch((err) => console.log(`Что-то пошло не так: ${err}`));
  }, []);

   React.useEffect(() => {
        handleCheckToken();
    }, []);

    React.useEffect(() => {
        loggedIn && navigate.push('/');
      }, [loggedIn]);

    function handleInfoTooltipOpen() {
        setIsInfoTooltipOpen(true);
    }

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
    setIsInfoTooltipOpen(false);
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

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    navigate.push('/sign-in');
  }

  function handleRegistration(data) {
    auth.register(data)
      .then(
          () => {
              setIsSuccesLogin(true);
              navigate.push('/sign-in');
          }
      )

      .catch((err) => {
          console.log(err);
          setIsSuccesLogin(false);
      })

      .finally(() => {
          handleInfoTooltipOpen();
      })
  }

  function handleAuth(info) {
    setAuthUserEmail(info.email);
    auth.auth(info)
      .then(
          (info) => {
              setLoggedIn(true);
              localStorage.setItem('jwt', info.token);
              navigate.push('/');
          }
      )

      .catch((err) => {
          console.log(err);
          setIsSuccesLogin(false);
          handleInfoTooltipOpen();
      })
  }

  const handleCheckToken = () => {
    const token = localStorage.getItem('jwt');
    if (token) {
      auth.checkToken(token)
        .then((response) => {
            if (response) {
                setAuthUserEmail(response.data.email);
                setLoggedIn(true);
                navigate.push('/');
            }
        })

        .catch((err) => {
            console.log(err);
        });
    }
  };

  const isOpen = isAvatarPopupOpen || isProfilePopupOpen || isPhotoPopupOpen || isImagePopupOpen;

  React.useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopup();
      }
    }
    if(isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen]) 

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header 
             loggedIn={loggedIn}
             onSignOut={handleSignOut}
             authUserEmail={authUserEmail}
          />

          <Routes>
            <Route path="/sign-up">
                <Register
                    onRegistration={handleRegistration}
                />
            </Route>

            <Route path="/sign-in">
                <Login
                    onAuth={handleAuth}
                    onCheckToken={handleCheckToken}
                />
            </Route>

            <ProtectedRoute
              component={Main}
              path="/"
              loggedIn={loggedIn}
              cards={cards}
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onAddPhoto={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />

            <Route path="/">
                    {loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />}
            </Route>
          </Routes>

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

        <InfoTooltip
          isopen={isInfoTooltipOpen}
          onClose={closeAllPopup}
          isSucces={isSuccesLogin}
        />    
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;