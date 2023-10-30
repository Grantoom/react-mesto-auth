import React from 'react';
import Sign from './Sign.jsx';
import { Link } from 'react-router-dom';

const Register = ({ onRegistration }) => {

    const linkMarkup = (
        <p
            className='form__paragraph'
        >
            Уже зарегистрированы? <Link className="form__link" to="/sign-in">Войти</Link>
        </p>
    )

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onRegistration({
            email,
            password
        });
    }

    return (
        <Sign
            title='Регистрация'
            buttonText='Зарегистрироваться'
            onSubmit={handleSubmit}
            linkMarkup={linkMarkup}
        >

            <input
                className="form__input form__input_theme_dark"
                type="email"
                id="login-email"
                name="email"
                required
                maxLength="30"
                placeholder="Email"
                value={email || ''}
                onChange={handleChangeEmail}
            />

            <input
                className="form__input form__input_theme_dark"
                type="password"
                id="login-pass"
                name="password"
                required
                placeholder="Пароль"
                value={password || ''}
                onChange={handleChangePassword}
            />

        </Sign>

    )
}

export default Register;