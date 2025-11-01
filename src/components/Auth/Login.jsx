import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/authSlice';
import styles from './Auth.module.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../assets/logo.svg";

const Login = () => {
    const [phoneNumber, setNumber] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, loading } = useSelector((state) => state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(loginUser({ phoneNumber, password }));
        if (loginUser.fulfilled.match(result)) {
            navigate('/');
        }
    };

    return (
        <div className={styles.authContainer}>
            <div className={styles.navbar__section}>
                <div className={styles.navbar__container}>
                    <Link to="/" className={styles.navbar__logo}>
                        <img src={logo} alt="Логотип" title='XPORT' />
                    </Link>
                    <p className={styles.logo__title}>XPORT</p>
                </div>
                <p>Войдите или создайте учетную запись</p>
            </div>

            <div className={styles.authBox}>
                <h2 className={styles.authTitle}>Добро пожаловать</h2>
                <p className={styles.authSubtitle}>
                    Новый пользователь? <Link to="/register" className={styles.authLink}>Создать учетную запись</Link>
                </p>

                <form onSubmit={handleSubmit} className={styles.authForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Номер телефона</label>
                        <input
                            type="text"
                            id="number"
                            value={phoneNumber}
                            onChange={(e) => setNumber(e.target.value)}
                            placeholder="xport@pochta.com"
                            className={styles.authInput}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password">Пароль</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="************"
                            className={styles.authInput}
                        />
                    </div>
                    {error && <p className={styles.errorMessage}>{error}</p>}
                    <button type="submit" className={styles.authButton} disabled={loading}>
                        {loading ? 'Загрузка...' : 'Войти в аккаунт'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
