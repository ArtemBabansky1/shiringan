import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useApp } from '../context/AppContext.jsx';
import { saveProfile } from '../api/profile.js';
import styles from './SettingsPage.module.css';

export default function SettingsPage() {
  const { logout } = useAuth();
  const { profileData, setProfileData, addToast } = useApp();
  const navigate = useNavigate();

  const [totalDays, setTotalDays] = useState(100);
  const [startDate, setStartDate] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!profileData) return;
    setTotalDays(profileData.totalDays);
    setStartDate(profileData.startDate);
  }, [profileData]);

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    const { data, error } = await saveProfile({ totalDays: Number(totalDays), startDate });
    setSaving(false);
    if (error) { addToast('Ошибка сохранения: ' + error); return; }
    setProfileData(data);
    addToast('Настройки сохранены');
    navigate('/');
  }

  async function handleLogout() {
    await logout();
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <button className={styles.back} onClick={() => navigate('/')}>← Назад</button>
        <h1 className={styles.title}>НАСТРОЙКИ</h1>

        <form onSubmit={handleSave} className={styles.form}>
          <label className={styles.label}>
            Дата старта
            <input
              className={styles.input}
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              required
            />
          </label>

          <label className={styles.label}>
            Количество дней пути
            <input
              className={styles.input}
              type="number"
              min={7}
              max={365}
              value={totalDays}
              onChange={e => setTotalDays(e.target.value)}
              required
            />
          </label>

          <button className={styles.btn} type="submit" disabled={saving}>
            {saving ? '...' : 'СОХРАНИТЬ'}
          </button>
        </form>

        <hr className={styles.divider} />

        <button className={styles.btnDanger} onClick={handleLogout}>
          Выйти из аккаунта
        </button>
      </div>
    </div>
  );
}
