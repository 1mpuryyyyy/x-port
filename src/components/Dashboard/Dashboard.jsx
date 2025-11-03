import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './Dashboard.module.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import arrow from '../../assets/arrow.svg';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const Dashboard = () => {
    const [activeSection, setActiveSection] = useState('personal');
    const { user } = useSelector((state) => state.auth);
    const [userData, setUserData] = useState(null);
    const [showVerification, setShowVerification] = useState(false);
    const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
    const [verificationLoading, setVerificationLoading] = useState(false);
    const [verificationError, setVerificationError] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [passwordChanged, setPasswordChanged] = useState(false);
    const [textError, setTextError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = Cookies.get('token');
                const response = await fetch(`${API_URL}/users/me`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserData({
                        ...data,
                        fio: [data.firstName, data.lastName, data.patronymic].filter(Boolean).join(' '),
                        location: [data.country, data.city].filter(Boolean).join(', '),
                    });
                }
            } catch (error) {
                console.error('Ошибка загрузки данных пользователя:', error);
            }
        };

        if (user) {
            fetchUserData();
        }
    }, [user]);

    const menuItems = [
        { id: 'personal', label: 'Личные данные' },
        { id: 'security', label: 'Безопасность' },
        { id: 'notifications', label: 'Уведомления' },
        { id: 'privacy', label: 'Конфиденциальность' },
    ];

    const handleApprove = () => {
        if (!showVerification) {
            setShowVerification(true);
        }
        const token = Cookies.get('token');
        axios.post(`${API_URL}/users/phone/send-code`, null, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }).catch((err) => {
            console.error('Ошибка отправки кода подтверждения:', err);
        });
    }

    const handleInputChange = (field, value) => {
        if (field === 'birthDate') {
            const digits = value.replace(/\D/g, '').slice(0, 8);
            let formatted = '';

            if (digits.length >= 2) {
                formatted = digits.slice(0, 2);
                if (digits.length >= 4) {
                    formatted += '.' + digits.slice(2, 4);
                    if (digits.length >= 8) {
                        formatted += '.' + digits.slice(4, 8);
                    } else if (digits.length > 4) {
                        formatted += '.' + digits.slice(4);
                    }
                } else if (digits.length > 2) {
                    formatted += '.' + digits.slice(2);
                }
            } else {
                formatted = digits;
            }

            setUserData((prev) => prev ? ({ ...prev, [field]: formatted }) : prev);
            return;
        }

        setUserData((prev) => prev ? ({ ...prev, [field]: value }) : prev);
    };

    // Мок-функция сохранения: обновляет локальный state и логирует (без реального запроса)
    const mockSaveField = (field, value) => {
        // Симулируем "сохранение" — в реальности тут будет axios/fetch на бек
        console.info(`[MOCK SAVE] Field: ${field}`, value);

        if (!userData) return;

        const updated = { ...userData, [field]: value };

        if (field === 'fio') {
            const parts = value.trim().split(/\s+/);
            updated.firstName = parts[0] || '';
            updated.lastName = parts.slice(1).join(' ') || '';
        }

        if (field === 'location') {
            const parts = value.split(',').map(p => p.trim());
            updated.country = parts[0] || '';
            updated.city = parts[1] || '';
        }

        setUserData(updated);
    };

    const handleInputBlur = (field, e) => {
        mockSaveField(field, e.target.value);
    };

    const handleInputKeyDown = (field, e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.target.blur();
            mockSaveField(field, e.target.value);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (!newPassword) {
            setTextError('Введите новый пароль');
            return;
        }

        try {
            const token = Cookies.get('token');
            const response = await fetch(`${API_URL}/users/password/reset`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
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

    const renderPersonalData = () => (
        <div className={styles.section}>
            <div className={styles.sectionHeader}>
                <div>
                    <h2 className={styles.sectionTitle}>Учетные данные</h2>
                    <p className={styles.sectionDescription}>
                        Вы можете менять свои личные данные, подтверждать почту, управлять аккаунтом
                        и настройками безопасности в защищённом сервисе
                    </p>
                </div>
                <button onClick={handleForgotPasswordClick}>Сменить пароль</button>
            </div>
            {passwordChanged && (
                <div className={styles.successMessage} style={{ color: 'var(--light-green)', marginBottom: '15px', textAlign: 'center' }}>
                    Вы успешно поменяли пароль
                </div>
            )}
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
            <div className={styles.dataGrid}>
                <div className={styles.dataItem}>
                    <span className={styles.dataLabel}>ФИО</span>
                    <div style={{ flex: 1 }}>
                        <input
                            className={styles.inputField}
                            value={
                                userData?.firstName || userData?.lastName
                                    ? `${userData.firstName || ''} ${userData.lastName || ''}`.trim()
                                    : ''
                            }
                            placeholder="Иванов Иван Иванович"
                            onChange={(e) => handleInputChange('fio', e.target.value)}
                            onBlur={(e) => handleInputBlur('fio', e)}
                            onKeyDown={(e) => handleInputKeyDown('fio', e)}
                        />
                    </div>
                </div>

                <div className={styles.dataItem}>
                    <span className={styles.dataLabel}>Телефон</span>
                    <div className={styles.dataValue} style={{ gap: 12 }}>
                        <input
                            className={`${styles.inputField}`}
                            value={userData?.phoneNumber || ''}
                            placeholder="+7 999 999 99 99"
                            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                            onBlur={(e) => handleInputBlur('phoneNumber', e)}
                            onKeyDown={(e) => handleInputKeyDown('phoneNumber', e)}
                            style={{ marginRight: 12 }}
                        />
                        <span className={styles.verifiedBadge}>
                            {userData?.phoneVerified ? 'Подтвержден' : <button onClick={handleApprove}>Подтвердить</button>}
                        </span>
                    </div>
                </div>

                <div className={styles.dataItem}>
                    <span className={styles.dataLabel}>Дата рождения</span>
                    <div style={{ flex: 1 }}>
                        <input
                            className={styles.inputField}
                            value={userData?.birthDate || ''}
                            placeholder="DD.MM.YYYY"
                            onChange={(e) => handleInputChange('birthDate', e.target.value)}
                            onBlur={(e) => handleInputBlur('birthDate', e)}
                            onKeyDown={(e) => handleInputKeyDown('birthDate', e)}
                        />
                    </div>
                </div>

                <div className={styles.dataItem}>
                    <span className={styles.dataLabel}>Пол</span>
                    <div style={{ flex: 1 }}>
                        <input
                            className={styles.inputField}
                            value={userData?.gender || ''}
                            placeholder="Мужской / Женский"
                            onChange={(e) => handleInputChange('gender', e.target.value)}
                            onBlur={(e) => handleInputBlur('gender', e)}
                            onKeyDown={(e) => handleInputKeyDown('gender', e)}
                        />
                    </div>
                </div>

                <div className={styles.dataItem}>
                    <span className={styles.dataLabel}>Почта</span>
                    <div style={{ flex: 1 }}>
                        <input
                            className={styles.inputField}
                            value={userData?.email || ''}
                            placeholder="your@mail.com"
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            onBlur={(e) => handleInputBlur('email', e)}
                            onKeyDown={(e) => handleInputKeyDown('email', e)}
                        />
                    </div>
                </div>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.publicData}>
                <h3 className={styles.publicDataTitle}>Публичные данные</h3>
                <p className={styles.publicDataDescription}>
                    Информация, которую вы укажете в этом разделе, публичная. Она указывается
                    рядом с отзывами и видна другим пользователям сети Интернет. Размещая свои
                    персональные данные в данном разделе, вы раскрываете их неопределённому кругу лиц.
                </p>

                <div className={styles.publicDataGrid}>
                    <div className={styles.publicDataItem}>
                        <span className={styles.publicDataLabel}>Имя</span>
                        <div style={{ flex: 1 }}>
                            <input
                                className={styles.inputField}
                                value={userData?.firstName || ''}
                                placeholder="Ильшат"
                                onChange={(e) => handleInputChange('firstName', e.target.value)}
                                onBlur={(e) => handleInputBlur('firstName', e)}
                                onKeyDown={(e) => handleInputKeyDown('firstName', e)}
                            />
                        </div>
                    </div>

                    <div className={styles.publicDataItem}>
                        <span className={styles.publicDataLabel}>Страна, город</span>
                        <div style={{ flex: 1 }}>
                            <input
                                className={styles.inputField}
                                value={userData?.location || `${userData?.country || ''}${userData?.city ? ', ' + userData.city : ''}`}
                                placeholder="Россия, Москва"
                                onChange={(e) => handleInputChange('location', e.target.value)}
                                onBlur={(e) => handleInputBlur('location', e)}
                                onKeyDown={(e) => handleInputKeyDown('location', e)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderSecurity = () => (
        <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Безопасность</h2>
            <p>Раздел безопасности - в разработке</p>
        </div>
    );

    const renderNotifications = () => (
        <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Уведомления</h2>
            <p>Раздел уведомлений - в разработке</p>
        </div>
    );

    const renderPrivacy = () => (
        <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Конфиденциальность</h2>
            <p>Раздел конфиденциальности - в разработке</p>
        </div>
    );

    const renderContent = () => {
        switch (activeSection) {
            case 'personal':
                return renderPersonalData();
            case 'security':
                return renderSecurity();
            case 'notifications':
                return renderNotifications();
            case 'privacy':
                return renderPrivacy();
            default:
                return renderPersonalData();
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
                navigate('/dashboard');
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

    if (!user) {
        return (
            <div className={styles.dashboard}>
                <div className={styles.loading}>Загрузка профиля...</div>
            </div>
        );
    }
    return (
        <div className={styles.dashboard}>
            <div className={styles.container}>
                <aside className={styles.sidebar}>
                    <nav className={styles.menu}>
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                className={`${styles.menuItem} ${activeSection === item.id ? styles.menuItemActive : ''
                                    }`}
                                onClick={() => setActiveSection(item.id)}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </aside>

                <main className={styles.content}>
                    {renderContent()}
                </main>
            </div>
            {showVerification && (
                <div className={styles.authContainer}>
                    <div className={styles.authBox}>
                        <img src={arrow} alt='Назад' title='Назад' className={styles.backButton} onClick={() => setShowVerification(false)} />
                        <h2 className={styles.authTitle}>Подтверждение номера</h2>
                        <p className={styles.authSubtitle}>
                            Мы отправили SMS с кодом подтверждения на номер {userData?.phoneNumber}
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
                                disabled={verificationLoading || verificationCode.some(digit => digit === '')}
                            >
                                {verificationLoading ? 'Проверка...' : 'Подтвердить номер'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
