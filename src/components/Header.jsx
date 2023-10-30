import React from "react";
import headerLogo from "../images/logo.svg";
import { NavLink, useLocation } from 'react-router-dom';

function Header({ loggedIn, onSignOut, authUserEmail }) {

  const location = useLocation();

  function handleSignOut() {
    onSignOut();
  }

  return (
    <header
      className={loggedIn ? 'header header_row-reverse' : 'header'}
    >

      <div
        className="header__container-main"
      >
        <img className="header__logo" src={headerLogo} alt="лого" />

        <div className="header__box">
          {loggedIn &&
            (
              <address
                className="header__address"
              >
                {authUserEmail}
              </address>
            )
          }

          {loggedIn &&
            (
              <button
                className="header__button"
                type="button"
                onClick={handleSignOut}
              >
                Выйти
              </button>
            )
          }
        </div>

        {!loggedIn &&
          (<nav>
            {location.pathname === '/sign-in' &&
              (
                <NavLink
                  className="header__nav"
                  to="/sign-up"
                >
                  Регистрация
                </NavLink>
              )
            }
            {location.pathname === '/sign-up' &&
              (
                <NavLink
                  className="header__nav"
                  to="/sign-in"
                >
                  Войти
                </NavLink>
              )
            }
          </nav>
          )
        }
      </div>

    </header>
  )
}

export default Header;