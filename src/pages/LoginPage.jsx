import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import styles from './AuthPage.module.css';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await login(email.trim(), password);
    setLoading(false);
    if (error) { setError(error); return; }
    navigate('/');
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.eye}>写輪眼</div>
        <h1 className={styles.title}>SHARINGAN</h1>
        <p className={styles.subtitle}>100 дней пути</p>

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
            placeholder="Пароль"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <p className={styles.error}>{error}</p>}
          <button className={styles.btn} type="submit" disabled={loading}>
            {loading ? '...' : 'ВОЙТИ'}
          </button>
        </form>

        <p className={styles.switchText}>
          Нет аккаунта?{' '}
          <Link to="/register" className={styles.link}>Создать</Link>
        </p>
      </div>
    </div>
  );
}
