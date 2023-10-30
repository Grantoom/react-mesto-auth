import React from 'react';
import succesSign from '../images/Succes.svg';
import errorSign from '../images/error.svg';

const InfoTooltip = ({isopen, onClose, isSucces}) => {
    return (
        <div
            className={`popup ${isopen ? 'popup_opened' : ''}`}
        >
            <div
                isopen={isopen ? true : undefined}
                className="popup__container_sign"
            >
                <img
                    className="popup__icon"
                    src={isSucces ? succesSign : errorSign}
                    alt={isSucces ? "успешно" : "ошибка"}
                />

                <h2
                    className="popup__title"
                >
                    {isSucces ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Пропробуйте ещё раз'}
                </h2>

                <button type="button" className='popup__exit' onClick={onClose}></button>
            </div>
        </div>
    )
}

export default InfoTooltip;