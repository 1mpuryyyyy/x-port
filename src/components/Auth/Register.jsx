import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, loginUser } from '../../store/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import styles from './Auth.module.css';
import Cookies from 'js-cookie';
import axios from 'axios';
import arrow from '../../assets/arrow.svg';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setNumber] = useState('');
    const [showVerification, setShowVerification] = useState(false);
    const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
    const [verificationLoading, setVerificationLoading] = useState(false);
    const [verificationError, setVerificationError] = useState('');
    const [autoLoginLoading, setAutoLoginLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, loading } = useSelector((state) => state.auth);

    const handleAutoLogin = async (phoneNumber, password) => {
        setAutoLoginLoading(true);
        try {
            const result = await dispatch(loginUser({ phoneNumber, password }));
            if (loginUser.fulfilled.match(result)) {

                const token = Cookies.get('token');
                axios.post(`${API_URL}/users/phone/send-code`, {}, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }).catch((err) => {
                    console.error('Ошибка отправки кода подтверждения:', err);
                });
                setShowVerification(true);
            } else {
                setVerificationError('Ошибка автоматического входа. Попробуйте войти manually.');
            }
        } catch (error) {
            console.error(error);
            setVerificationError('Ошибка автоматического входа');
        } finally {
            setAutoLoginLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(registerUser({ firstName, lastName, phoneNumber, email, password }));
        if (registerUser.fulfilled.match(result)) {
            await handleAutoLogin(phoneNumber, password);
        }
    };


    const handleVerificationChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;

        const newCode = [...verificationCode];
        newCode[index] = value;
        setVerificationCode(newCode);
        setVerificationError('');

        if (value !== '' && index < 5) {
            const nextInput = document.getElementById(`verification-input-${index + 1}`);
            if (nextInput) nextInput.focus();
        }

        if (newCode.every(digit => digit !== '') && index === 5) {
            handleVerificationSubmit(newCode.join(''));
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && verificationCode[index] === '' && index > 0) {
            const prevInput = document.getElementById(`verification-input-${index - 1}`);
            if (prevInput) prevInput.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text');
        const digits = pastedData.replace(/\D/g, '').split('').slice(0, 6);

        if (digits.length === 6) {
            const newCode = [...verificationCode];
            digits.forEach((digit, index) => {
                newCode[index] = digit;
            });
            setVerificationCode(newCode);
            setVerificationError('');

            setTimeout(() => {
                const lastInput = document.getElementById('verification-input-5');
                if (lastInput) lastInput.focus();
            }, 0);
            handleVerificationSubmit(newCode.join(''));
        }
    };

    const handleVerificationSubmit = async (code = verificationCode.join('')) => {
        if (code.length !== 6) return;

        setVerificationLoading(true);
        setVerificationError('');

        try {
            const token = Cookies.get('token');
            const response = await fetch(`${API_URL}/users/me/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    code: code
                }),
            });

            if (response.ok) {
                navigate('/');
            } else {
                const errorData = await response.json();
                setVerificationError(errorData.message || 'Ошибка подтверждения номера');
                setVerificationCode(['', '', '', '', '', '']);
                const firstInput = document.getElementById('verification-input-0');
                if (firstInput) firstInput.focus();
            }
        } catch (error) {
            setVerificationError(error || 'Ошибка сети. Попробуйте еще раз.');
            setVerificationCode(['', '', '', '', '', '']);
            const firstInput = document.getElementById('verification-input-0');
            if (firstInput) firstInput.focus();
        } finally {
            setVerificationLoading(false);
        }
    };

    if (showVerification) {
        return (
            <div className={styles.authContainer}>
                <div className={styles.navbar__section}>
                    <div className={styles.navbar__container}>
                        <Link to="/" className={styles.navbar__logo}>
                            <img src={logo} alt="Логотип" title='XPORT' />
                        </Link>
                    </div>
                </div>

                <div className={styles.authBox}>
                    <img src={arrow} alt='Назад' title='Назад' className={styles.backButton} onClick={() => setShowVerification(false)} />
                    <h2 className={styles.authTitle}>Подтверждение номера</h2>
                    <p className={styles.authSubtitle}>
                        Мы отправили SMS с кодом подтверждения на номер {phoneNumber}
                    </p>

                    <div className={styles.verificationContainer}>
                        <div className={styles.verificationInputs}>
                            {verificationCode.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`verification-input-${index}`}
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => handleVerificationChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={index === 0 ? handlePaste : undefined}
                                    className={`${styles.verificationInput} ${styles.phone}`}
                                    disabled={verificationLoading}
                                    autoFocus={index === 0}
                                />
                            ))}
                        </div>

                        {verificationError && (
                            <p className={styles.errorMessage}>{verificationError}</p>
                        )}

                        <div className={styles.verificationInfo}>
                            {verificationLoading ? (
                                <p className={styles.loadingText}>Проверка кода...</p>
                            ) : autoLoginLoading ? (
                                <p className={styles.loadingText}>Подготовка к подтверждению...</p>
                            ) : (
                                <p className={styles.verificationHint}>
                                    Введите 6-значный код из SMS
                                </p>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={() => handleVerificationSubmit()}
                            className={styles.authButton}
                            disabled={verificationLoading || autoLoginLoading || verificationCode.some(digit => digit === '')}
                        >
                            {verificationLoading ? 'Проверка...' : 'Подтвердить номер'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

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
                <h2 className={styles.authTitle}>Создать учетную запись</h2>
                <p className={styles.authSubtitle}>
                    Уже есть профиль? <Link to="/login" className={styles.authLink}>Войти</Link>
                </p>

                <form onSubmit={handleSubmit} className={styles.authForm}>
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            placeholder="Имя"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className={styles.authInput}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            placeholder="Фамилия"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className={styles.authInput}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <input
                            type="tel"
                            placeholder="Номер телефона"
                            value={phoneNumber}
                            onChange={(e) => setNumber(e.target.value)}
                            className={styles.authInput}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <input
                            type="email"
                            placeholder="Почта"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.authInput}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <input
                            type="password"
                            placeholder="Пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.authInput}
                            required
                        />
                    </div>
                    {error && <p className={styles.errorMessage}>{error}</p>}
                    <button
                        type="submit"
                        className={styles.authButton}
                        disabled={loading || autoLoginLoading}
                    >
                        {loading || autoLoginLoading ? 'Создание аккаунта...' : 'Создать аккаунт'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;