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
    const [phoneNumber, setPhoneNumber] = useState('');
    const [rawPhoneNumber, setRawPhoneNumber] = useState('');
    const [showVerification, setShowVerification] = useState(false);
    const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
    const [verificationLoading, setVerificationLoading] = useState(false);
    const [verificationError, setVerificationError] = useState('');
    const [autoLoginLoading, setAutoLoginLoading] = useState(false);
    const [textError, setTextError] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.auth);

    const formatPhoneNumber = (value) => {
        const digits = value.replace(/\D/g, '').slice(0, 11);
        let formatted = '';

        if (digits.startsWith('7') || digits.startsWith('8')) {
            const code = digits.slice(1, 4) || '';
            const part1 = digits.slice(4, 7) || '';
            const part2 = digits.slice(7, 9) || '';
            const part3 = digits.slice(9, 11) || '';

            formatted = digits[0] === '8'
                ? `8 ${code} ${part1}-${part2}-${part3}`
                : `+7 ${code} ${part1}-${part2}-${part3}`;
        } else if (digits) {
            formatted = digits;
        }

        return formatted.replace(/[-\s]+$/, '');
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        const digits = value.replace(/\D/g, '').slice(0, 11);
        setRawPhoneNumber(digits);
        setPhoneNumber(formatPhoneNumber(value));
    };

    const handleAutoLogin = async (phoneNumber, password) => {
        setAutoLoginLoading(true);
        try {
            const result = await dispatch(loginUser({ phoneNumber, password }));
            if (loginUser.fulfilled.match(result)) {

                const token = Cookies.get('token');
                axios.post(`${API_URL}/users/me/phone/send-code`, {}, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }).catch((err) => {
                    console.error('Ошибка отправки кода подтверждения:', err);
                    setVerificationError('Ошибка отправки кода подтверждения');
                });
                setShowVerification(true);
            } else {
                setVerificationError('Ошибка автоматического входа. Попробуйте войти самостоятельно.');
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
        if (!rawPhoneNumber || rawPhoneNumber.length !== 11) {
            setTextError('Введите корректный номер телефона')
            return;
        }

        let phoneNumber = rawPhoneNumber;
        const result = await dispatch(registerUser({ firstName, lastName, phoneNumber, email, password }));

        if (registerUser.fulfilled.match(result)) {
            await handleAutoLogin(rawPhoneNumber, password);
        } else {
            if (result.payload) {
                setTextError(result.payload);
            } else if (result.error) {
                setTextError(result.error.message || 'Произошла ошибка при регистрации');
            }
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
                window.scrollTo(0, 0);
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
                    <img src={arrow} alt='Назад' title='Назад' className={styles.backButton} onClick={() => { setShowVerification(false); navigate('/') }} />
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
                <p className={styles.logo__subtitle}>Войдите или создайте учетную запись</p>
            </div>

            <div className={styles.authBox}>
                <h2 className={styles.authTitle}>Создать учетную запись</h2>
                <p className={styles.authSubtitle}>
                    Уже есть профиль? <Link to="/login" className={styles.authLink}>Войти</Link>
                </p>

                <form onSubmit={handleSubmit} className={styles.authForm}>
                    <div className={styles.formGroup}>
                        <div className={styles.inputContainer}>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className={`${styles.authInput}`}
                                placeholder='Роберт'
                                required
                            />
                            <label className={styles.floatingLabel}>Имя</label>
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <div className={styles.inputContainer}>
                            <input
                                type="text"
                                placeholder="Иванов"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className={styles.authInput}
                                required
                            />
                            <label className={styles.floatingLabel}>Фамилия</label>
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <div className={styles.inputContainer}>
                            <input
                                type="tel"
                                placeholder="+7 999 999-99-99"
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
                                type="email"
                                placeholder="mail@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={styles.authInput}
                                required
                            />
                            <label className={styles.floatingLabel}>Почта</label>
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
                    <button
                        type="submit"
                        className={styles.authButton}
                        disabled={loading || autoLoginLoading}
                    >
                        {loading || autoLoginLoading || verificationLoading ? 'Создание аккаунта...' : 'Создать аккаунт'}
                    </button>
                    <div className={styles.formGroup}>
                        <p className={styles.authLink}>Помощь</p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;