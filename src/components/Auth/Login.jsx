import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/authSlice';
import styles from './Auth.module.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../assets/logo.svg";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [rawPhoneNumber, setRawPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [passwordChanged, setPasswordChanged] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, loading } = useSelector((state) => state.auth);
    const [textError, setTextError] = useState(null);

    useEffect(() => {
        if (error) {
            setTextError(error);
        }
    }, [error])

    const formatPhoneNumber = (value) => {
        const digits = value.replace(/\D/g, '');

        const trimmed = digits.slice(0, 11);

        let formatted = '';
        if (trimmed.startsWith('7') || trimmed.startsWith('8')) {
            const code = trimmed.slice(1, 4) || '';
            const part1 = trimmed.slice(4, 7) || '';
            const part2 = trimmed.slice(7, 9) || '';
            const part3 = trimmed.slice(9, 11) || '';

            formatted = trimmed[0] === '8'
                ? `8 (${code}) ${part1}-${part2}-${part3}`
                : `+7 (${code}) ${part1}-${part2}-${part3}`;
        } else if (trimmed) {
            formatted = trimmed;
        }

        return formatted.replace(/[-\s]+$/, '');
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        const digits = value.replace(/\D/g, '').slice(0, 11);

        setRawPhoneNumber(digits);
        setPhoneNumber(formatPhoneNumber(value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!rawPhoneNumber || rawPhoneNumber.length !== 11) {
            setTextError('Введите корректный номер телефона')
            return;
        }
        const result = await dispatch(loginUser({ phoneNumber: rawPhoneNumber, password }));
        if (loginUser.fulfilled.match(result)) {
            navigate('/');
            window.scrollTo(0, 0);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (!newPassword) {
            setTextError('Введите новый пароль');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/users/me/password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newPassword }),
            });

            if (response.ok) {
                setShowPasswordModal(false);
                setPasswordChanged(true);
                setNewPassword('');
                setTextError(null);
            } else {
                setTextError('Ошибка при смене пароля');
            }
        } catch {
            setTextError('Ошибка при смене пароля');
        }
    };

    const handleForgotPasswordClick = () => {
        setShowPasswordModal(true);
        setPasswordChanged(false);
        setTextError(null);
    };

    const handleCloseModal = () => {
        setShowPasswordModal(false);
        setNewPassword('');
        setTextError(null);
    };

    return (
        <div className={styles.authContainer}>
            <div className={styles.navbar__section}>
                <div className={styles.navbar__container}>
                    <Link to="/" className={`${styles.navbar__logo} ${styles.navbar__logo__auth}`}>
                        <img src={logo} alt="Логотип" title='XPORT' />
                    </Link>
                </div>
            </div>

            <div className={styles.authBox}>
                <h2 className={styles.authTitle}>Добро пожаловать</h2>
                <p className={styles.authSubtitle}>
                    Новый пользователь? <Link to="/register" className={styles.authLink}>Создать учетную запись</Link>
                </p>

                {passwordChanged && (
                    <div className={styles.successMessage} style={{ color: 'var(--light-green)', marginBottom: '15px', textAlign: 'center' }}>
                        Вы успешно поменяли пароль
                    </div>
                )}

                <form onSubmit={handleSubmit} className={styles.authForm}>
                    <div className={styles.formGroup}>
                        <div className={styles.inputContainer}>
                            <input
                                type="tel"
                                placeholder="+7 (999) 999-99-99"
                                value={phoneNumber}
                                onChange={handlePhoneChange}
                                className={styles.authInput}
                                required
                                inputMode="numeric"
                                autoComplete="tel"
                            />
                            <label className={styles.floatingLabel}>Номер телефона</label>
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <div className={styles.inputContainer}>
                            <input
                                type="password"
                                placeholder="**********"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={styles.authInput}
                                required
                            />
                            <label className={styles.floatingLabel}>Пароль</label>
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <input type='checkbox' id='rememberMe' className={styles.authCheckbox} />
                        <label htmlFor='rememberMe' className={styles.authCheckboxLabel}>Запомнить меня</label>
                    </div>
                    {textError && <p className={styles.errorMessage}>{textError}</p>}
                    <button type="submit" className={styles.authButton} disabled={loading}>
                        {loading ? 'Загрузка...' : 'Войти в аккаунт'}
                    </button>
                    <div className={styles.formGroup} style={{ justifyContent: 'space-between' }}>
                        <p className={styles.authLink}>Помощь</p>
                        <p
                            className={styles.authLink}
                            style={{ cursor: 'pointer' }}
                            onClick={handleForgotPasswordClick}
                        >
                            Забыли пароль?
                        </p>
                    </div>
                </form>
            </div>

            {showPasswordModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.authBox}>
                        <h2 className={styles.authTitle}>Смена пароля</h2>
                        <p className={styles.authSubtitle}>
                            Введите новый пароль
                        </p>

                        <form onSubmit={handlePasswordChange} className={styles.authForm}>
                            <div className={styles.formGroup}>
                                <div className={styles.inputContainer}>
                                    <input
                                        type="password"
                                        placeholder="**********"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className={styles.authInput}
                                        required
                                    />
                                    <label className={styles.floatingLabel}>Новый пароль</label>
                                </div>
                            </div>

                            {textError && <p className={styles.errorMessage}>{textError}</p>}

                            <div style={{ display: 'flex', gap: '10px', marginTop: '35px' }}>
                                <button
                                    type="button"
                                    className={styles.authButton}
                                    style={{ backgroundColor: '#444', margin: 0 }}
                                    onClick={handleCloseModal}
                                >
                                    Отмена
                                </button>
                                <button
                                    type="submit"
                                    className={styles.authButton}
                                    style={{ margin: 0 }}
                                >
                                    Сменить пароль
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;