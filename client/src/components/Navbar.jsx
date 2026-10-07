import React, { useState } from 'react';
import { Globe, ArrowRight, Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar({ onOpenRfq }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.navContainer}`}>
        <a href="#" className={styles.brand}>
          <img 
            src="/Gemini_Generated_Image_z4aymrz4aymrz4ay.jpg" 
            alt="Fashion Aura International" 
            className={styles.brandLogoImg} 
          />
          <div className={styles.brandText}>
            <span className={styles.brandTitle}>FASHION AURA</span>
            <span className={styles.brandSub}>GLOBAL EXPORTS</span>
          </div>
        </a>

        <nav className={`${styles.navLinks} ${mobileMenuOpen ? styles.mobileNavOpen : ''}`}>
          <a href="#sports-division" onClick={handleNavClick} className={styles.navItem}>Sports Wear</a>
          <a href="#luxury-division" onClick={handleNavClick} className={styles.navItem}>Fashion Wear</a>
          <a href="#catalogue-matrix" onClick={handleNavClick} className={styles.navItem}>B2B Catalogue</a>
          <a href="#export-capabilities" onClick={handleNavClick} className={styles.navItem}>Export Matrix</a>
          <a href="#quick-rfq" onClick={handleNavClick} className={styles.navItem}>Procurement</a>
        </nav>

        <div className={styles.actions}>
          <div className={styles.currencyBadge}>
            <Globe size={15} color="var(--primary)" />
            <span>Exporting to 50+ Countries</span>
          </div>

          <button 
            onClick={() => { setMobileMenuOpen(false); onOpenRfq(); }}
            className={styles.quoteBtn}
            type="button"
          >
            <span>Quote</span>
            <ArrowRight size={15} />
          </button>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className={styles.menuToggleBtn}
            type="button"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
