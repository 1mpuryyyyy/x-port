import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/authSlice';
import styles from './Auth.module.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../assets/logo.svg";

const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [rawPhoneNumber, setRawPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
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
                    <div className={styles.formGroup}>
                        <p className={styles.authLink}>Помощь</p>
                        <p className={styles.authLink}>Забыли пароль?</p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;