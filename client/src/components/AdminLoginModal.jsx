import React, { useState, useEffect } from 'react';
import { Lock, User, Key, ArrowRight, X, RefreshCw, CheckCircle2, CheckSquare, Square } from 'lucide-react';
import { authenticateAdmin, updateAdminCredentials } from '../services/authService';
import styles from './AdminLoginModal.module.css';

export default function AdminLoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [isResetMode, setIsResetMode] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  const [targetUser, setTargetUser] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('fashion_aura_admin_creds');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.username) setUsername(parsed.username);
        if (parsed.password) setPassword(parsed.password);
        if (parsed.username || parsed.password) setRememberMe(true);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await authenticateAdmin(username, password);
    setLoading(false);

    if (res.success) {
      if (rememberMe) {
        localStorage.setItem('fashion_aura_admin_creds', JSON.stringify({ username, password }));
      } else {
        localStorage.removeItem('fashion_aura_admin_creds');
      }
      onLoginSuccess();
    } else {
      setError(res.error || 'Invalid credentials. Access restricted.');
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');

    const res = await updateAdminCredentials(targetUser, newUsername, newPassword);
    setLoading(false);

    if (res.success) {
      setSuccessMsg('Credentials updated in database. You can now log in.');
      setTimeout(() => {
        setIsResetMode(false);
        setUsername(newUsername);
        setPassword('');
        setSuccessMsg('');
      }, 2000);
    } else {
      setError(res.error || 'Could not update credentials.');
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modalCard}>
        <button className={styles.closeBtn} onClick={onClose} type="button">
          <X size={18} />
        </button>

        <div className={styles.modalHeader}>
          <div className={styles.lockIconBox}>
            {isResetMode ? <RefreshCw size={22} color="var(--primary)" /> : <Lock size={22} color="var(--primary)" />}
          </div>
          <span className={styles.badgeText}>AUTHENTICATION GATEWAY</span>
          <h2 className={styles.title}>{isResetMode ? 'Reset Credentials' : 'Admin Trade Portal'}</h2>
          <p className={styles.subtitle}>
            {isResetMode 
              ? 'Update master account credentials directly in database.' 
              : 'Enter authorized credentials to access product management.'}
          </p>
        </div>

        {!isResetMode ? (
          <form onSubmit={handleLogin} className={styles.form}>
            <div className={styles.inputGroup}>
              <label>Username</label>
              <div className={styles.inputWrapper}>
                <User size={16} color="var(--outline)" />
                <input 
                  type="text" 
                  placeholder="Enter username" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  autoComplete="username"
                  required 
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Master Passkey</label>
              <div className={styles.inputWrapper}>
                <Key size={16} color="var(--outline)" />
                <input 
                  type="password" 
                  placeholder="Enter password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  autoComplete="current-password"
                  required 
                />
              </div>
            </div>

            <div className={styles.rememberRow}>
              <label className={styles.rememberLabel} onClick={() => setRememberMe(!rememberMe)}>
                {rememberMe ? <CheckSquare size={16} color="var(--primary)" /> : <Square size={16} color="var(--outline)" />}
                <span>Remember username</span>
              </label>
              <button 
                type="button" 
                onClick={() => { setIsResetMode(true); setError(''); }} 
                className={styles.resetToggleBtn}
              >
                Forgot credentials?
              </button>
            </div>

            {error && <div className={styles.errorText}>{error}</div>}

            <button type="submit" disabled={loading} className={styles.submitBtn}>
              <span>{loading ? 'Verifying...' : 'Authenticate Session'}</span>
              <ArrowRight size={16} />
            </button>
          </form>
        ) : (
          <form onSubmit={handleReset} className={styles.form}>
            <div className={styles.inputGroup}>
              <label>Current Account Username</label>
              <div className={styles.inputWrapper}>
                <User size={16} color="var(--outline)" />
                <input 
                  type="text" 
                  placeholder="Enter current username" 
                  value={targetUser} 
                  onChange={(e) => setTargetUser(e.target.value)} 
                  required 
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>New Username</label>
              <div className={styles.inputWrapper}>
                <User size={16} color="var(--outline)" />
                <input 
                  type="text" 
                  placeholder="Enter new username" 
                  value={newUsername} 
                  onChange={(e) => setNewUsername(e.target.value)} 
                  required 
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>New Password</label>
              <div className={styles.inputWrapper}>
                <Key size={16} color="var(--outline)" />
                <input 
                  type="password" 
                  placeholder="Enter new password" 
                  value={newPassword} 
                  onChange={(e) => setNewPassword(e.target.value)} 
                  required 
                />
              </div>
            </div>

            {error && <div className={styles.errorText}>{error}</div>}
            {successMsg && (
              <div className={styles.successText}>
                <CheckCircle2 size={16} color="var(--primary)" />
                <span>{successMsg}</span>
              </div>
            )}

            <button type="submit" disabled={loading} className={styles.submitBtn}>
              <span>{loading ? 'Updating Database...' : 'Update Credentials in DB'}</span>
              <RefreshCw size={16} />
            </button>

            <button 
              type="button" 
              onClick={() => { setIsResetMode(false); setError(''); }} 
              className={styles.backLink}
            >
              Back to Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
