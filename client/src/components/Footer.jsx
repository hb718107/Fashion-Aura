import React from 'react';
import { MessageCircle, ShieldCheck } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.topGrid}>
          <div className={styles.colBrand}>
            <div className={styles.brandRow}>
              <img 
                src="/Gemini_Generated_Image_z4aymrz4aymrz4ay.jpg" 
                alt="Fashion Aura International" 
                className={styles.footerLogoImg} 
              />
              <span className={styles.brandName}>FASHION AURA</span>
            </div>
            <p className={styles.brandDesc}>
              High-tier OEM/ODM apparel manufacture & global export matrix. Engineering luxury tailoring, active sports performance, and technical wear for syndicates and premier retailers worldwide.
            </p>
            <div className={styles.whatsappWrapper}>
              <a 
                href="https://wa.me/923184590616" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.whatsappButton}
              >
                <MessageCircle size={20} color="var(--primary)" />
                <div className={styles.waText}>
                  <span className={styles.waTitle}>WhatsApp Direct Trade Desk</span>
                  <span className={styles.waSub}>+92 318 4590616 (&lt; 15 min response)</span>
                </div>
              </a>
            </div>
          </div>

          <div className={styles.colHubs}>
            <span className={styles.colHeader}>MANUFACTURING HUBS</span>
            <div className={styles.hubBlock}>
              <span className={styles.hubTitle}>Sialkot Export Complex</span>
              <span className={styles.hubAddress}>S.I.E Factory Precinct, Sialkot 51310, Pakistan</span>
            </div>
            <div className={styles.hubBlock}>
              <span className={styles.hubTitle}>Global Trade Liaison</span>
              <span className={styles.hubAddress}>Dubai Logistics City (DLC), United Arab Emirates</span>
              <span className={styles.hubAddress}>London Commercial Suite, Mayfair, UK</span>
            </div>
          </div>

          <div className={styles.colAccred}>
            <span className={styles.colHeader}>ACCREDITATIONS</span>
            <ul className={styles.certList}>
              <li>
                <ShieldCheck size={16} color="var(--primary)" />
                <span>ISO 9001:2015</span>
              </li>
              <li>
                <ShieldCheck size={16} color="var(--primary)" />
                <span>OEKO-TEX Std 100</span>
              </li>
              <li>
                <ShieldCheck size={16} color="var(--primary)" />
                <span>BSCI Audited</span>
              </li>
              <li>
                <ShieldCheck size={16} color="var(--primary)" />
                <span>SEDEX SMETA Tier 4</span>
              </li>
              <li>
                <ShieldCheck size={16} color="var(--primary)" />
                <span>WRAP Gold Certified</span>
              </li>
            </ul>
          </div>

          <div className={styles.colDispatch}>
            <span className={styles.colHeader}>PROCUREMENT DISPATCH</span>
            <p className={styles.dispatchDesc}>
              Subscribe for seasonal fabric swatch releases, capacity reservation schedules, and raw material index reports.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to B2B Procurement Dispatch'); }} className={styles.dispatchForm}>
              <input type="email" placeholder="buyer@enterprise.com" required />
              <button type="submit">Join</button>
            </form>
            <span className={styles.disclaimer}>B2B Commercial procurement officers only.</span>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <div>© 2024 FASHION AURA APPAREL EXPORTS. ALL RIGHTS RESERVED.</div>
          <div className={styles.bottomLinks}>
            <span>Incoterms: FOB / CIF / DDP</span>
            <span>MOQ Protocol Matrix Active</span>
            <a href="#quick-rfq">Compliance Ledger</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
