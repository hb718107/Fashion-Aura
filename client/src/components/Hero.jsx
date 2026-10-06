import React from 'react';
import { ArrowDown, Clock, Layers, Zap, Plane } from 'lucide-react';
import styles from './Hero.module.css';

export default function Hero({ onOpenRfq }) {
  return (
    <section className={styles.heroSection}>
      <div className={styles.ambientGlow} />

      <div className={`container ${styles.heroContainer}`}>
        <div className={styles.headerContent}>
          <div className={styles.badgePill}>
            <span className={styles.pulseDot} />
            <span className={styles.badgeText}>CERTIFIED OEM & ODM EXPORTER • ISO 9001 / OEKO-TEX</span>
          </div>

          <h1 className={styles.title}>
            GLOBAL MANUFACTURER <br />
            <span className={styles.goldItalic}>& EXPORTER</span> OF PREMIUM APPAREL
          </h1>

          <p className={styles.subtitle}>
            Engineering precision performance sportswear and luxury handcrafted fashion wear for global brands, syndicates, and retail distributors across 50+ countries worldwide.
          </p>

          <div className={styles.ctaCluster}>
            <a href="#catalogue-matrix" className={styles.primaryCta}>
              <span>Explore Catalogue</span>
              <ArrowDown size={16} />
            </a>

            <button onClick={onOpenRfq} className={styles.secondaryCta} type="button">
              <span>B2B Inquiry / Request RFQ</span>
              <div className={styles.respBadge}>
                <Clock size={13} />
                <span>Avg. Resp: 2h</span>
              </div>
            </button>
          </div>
        </div>

        <div className={styles.splitBanner}>
          <div className={styles.imageWrapper}>
            <img 
              src="/hero-banner.jpg" 
              alt="Fashion Aura Performance and Luxury Apparel Manufacturing" 
              className={styles.bannerImage}
            />
            <div className={styles.overlayGradient} />

            <div className={`${styles.divisionBadge} ${styles.leftBadge}`}>
              <div className={styles.divHeader}>
                <span className={styles.goldDot} />
                <span className={styles.divNum}>DIVISION 01</span>
              </div>
              <h4>ATHLETIC TECHNICAL DIVISION</h4>
              <p>Compression weaves, seamless thermo-bonding & moisture-wicking interlock fabrics.</p>
            </div>

            <div className={`${styles.divisionBadge} ${styles.rightBadge}`}>
              <div className={styles.divHeaderRight}>
                <span className={styles.divNum}>DIVISION 02</span>
                <span className={styles.goldDot} />
              </div>
              <h4>LUXURY TAILORING & OUTERWEAR</h4>
              <p>1.2mm drum-dyed cowhide, 480GSM loopback fleece & custom antique brass hardware.</p>
            </div>
          </div>
        </div>

        <div className={styles.metricsTicker}>
          <div className={styles.metricItem}>
            <Layers size={18} color="var(--primary)" />
            <span>MOQ: FROM 50 PCS / STYLE</span>
          </div>
          <div className={styles.metricItem}>
            <Zap size={18} color="var(--primary)" />
            <span>FAST LEAD TIME: 18 - 24 DAYS</span>
          </div>
          <div className={styles.metricItem}>
            <Plane size={18} color="var(--primary)" />
            <span>WORLDWIDE EXPRESS CARGO & DDP SEA FREIGHT</span>
          </div>
        </div>
      </div>
    </section>
  );
}
