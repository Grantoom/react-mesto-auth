import React from 'react';
import Sign from './Sign.jsx';

const Login = ({ onAuth, onCheckToken }) => {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAuth({
            email,
            password
        });
    }

    return (
        <Sign
            title='Вход'
            buttonText='Войти'
            onSubmit={handleSubmit}
        >

            <input
                className="form__input form__input_theme_dark"
                type="email"
                id="login-email"
                name="email"
                required
                maxLength="30"
                placeholder="Email"
                value={email}
                onChange={handleChangeEmail}
            />

            <input
                className="form__input form__input_theme_dark"
                type="password"
                id="login-pass"
                name="password"
                required
                placeholder="Пароль"
                value={password}
                onChange={handleChangePassword}
            />

        </Sign>

    )
}

export default Login;