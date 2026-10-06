import React from 'react';
import { Globe, ArrowRight } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar({ onOpenRfq }) {
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

        <nav className={styles.navLinks}>
          <a href="#sports-division" className={styles.navItem}>Sports Wear</a>
          <a href="#luxury-division" className={styles.navItem}>Fashion Wear</a>
          <a href="#catalogue-matrix" className={styles.navItem}>B2B Catalogue</a>
          <a href="#export-capabilities" className={styles.navItem}>Export Matrix</a>
          <a href="#quick-rfq" className={styles.navItem}>Procurement</a>
        </nav>

        <div className={styles.actions}>
          <div className={styles.currencyBadge}>
            <Globe size={15} color="var(--primary)" />
            <span>Exporting to 50+ Countries</span>
          </div>

          <button 
            onClick={onOpenRfq}
            className={styles.quoteBtn}
            type="button"
          >
            <span>Request a Quote</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </header>
  );
}
