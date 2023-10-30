import React from 'react';

const Sign = ({ title, buttonText, onSubmit, linkMarkup, children }) => {
    return (
        <form
            className='form form_theme_dark'
            onSubmit={onSubmit}
            noValidate
        >
            <h2
                className='form__header form__header_theme_dark'
            >
                {title}
            </h2>

            {children}

            <button
                className="form__save-button form__save-button_theme_dark"
                type="submit"
            >
                {buttonText}
            </button>

            {linkMarkup && linkMarkup}
        </form>
    )
}

export default Sign;