import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import styles from './AuthPage.module.css';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (password !== confirm) { setError('Пароли не совпадают'); return; }
    setLoading(true);
    const { error } = await register(email.trim(), password);
    setLoading(false);
    if (error) { setError(error); return; }
    navigate('/');
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.eye}>写輪眼</div>
        <h1 className={styles.title}>SHARINGAN</h1>
        <p className={styles.subtitle}>Начни свой путь</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            className={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoFocus
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Пароль (минимум 6 символов)"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Повтори пароль"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            required
          />
          {error && <p className={styles.error}>{error}</p>}
          <button className={styles.btn} type="submit" disabled={loading}>
            {loading ? '...' : 'СОЗДАТЬ АККАУНТ'}
          </button>
        </form>

        <p className={styles.switchText}>
          Уже есть аккаунт?{' '}
          <Link to="/login" className={styles.link}>Войти</Link>
        </p>
      </div>
    </div>
  );
}
