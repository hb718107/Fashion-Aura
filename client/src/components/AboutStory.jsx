import React from 'react';
import { Award, Compass, Sparkles, CheckCircle2 } from 'lucide-react';
import styles from './AboutStory.module.css';

export default function AboutStory() {
  return (
    <section id="about-us" className={styles.aboutSection}>
      <div className={`container ${styles.container}`}>
        <div className={styles.grid}>
          <div className={styles.leftCol}>
            <div className={styles.badgeWrapper}>
              <Sparkles size={14} color="var(--primary)" />
              <span className={styles.badgeText}>THE ATELIER LEGACY & EXPORT HERITAGE</span>
            </div>

            <h2 className={styles.heading}>
              WHERE VISIONARY BRANDS <br />
              <span className={styles.goldText}>MEET INDUSTRIAL MASTERY</span>
            </h2>

            <p className={styles.leadText}>
              Whether you are an emerging streetwear powerhouse, an elite athletic syndicate, or an established global retailer — you understand that true distinction lies in the uncompromised integrity of the weave.
            </p>

            <p className={styles.bodyText}>
              Headquartered at the heart of the world’s most celebrated textile manufacturing capital in Sialkot, Pakistan, with global trade coordination through Dubai and London, <strong>Fashion Aura</strong> transforms ambitious technical concepts into flawless production realities. We operate not merely as a factory, but as your dedicated private manufacturing wing.
            </p>

            <div className={styles.featurePoints}>
              <div className={styles.point}>
                <CheckCircle2 size={18} color="var(--primary)" />
                <span>Zero-tolerance seam precision & multi-phase inline inspections</span>
              </div>
              <div className={styles.point}>
                <CheckCircle2 size={18} color="var(--primary)" />
                <span>Bespoke private labeling, custom metallic trims & eco-certified dyes</span>
              </div>
              <div className={styles.point}>
                <CheckCircle2 size={18} color="var(--primary)" />
                <span>Direct factory prices with end-to-end international customs handling</span>
              </div>
            </div>
          </div>

          <div className={styles.rightCol}>
            <div className={styles.prestigeCard}>
              <div className={styles.cardHeader}>
                <Award size={24} color="var(--primary)" />
                <div>
                  <span className={styles.cardSub}>TIER-1 OEM / ODM PARTNER</span>
                  <h3 className={styles.cardTitle}>Engineered for the Ambitious</h3>
                </div>
              </div>

              <div className={styles.statsGrid}>
                <div className={styles.statBox}>
                  <span className={styles.statNum}>1.2M+</span>
                  <span className={styles.statLabel}>Garments Exported Annually</span>
                </div>
                <div className={styles.statBox}>
                  <span className={styles.statNum}>99.4%</span>
                  <span className={styles.statLabel}>On-Time Port Departure Rate</span>
                </div>
                <div className={styles.statBox}>
                  <span className={styles.statNum}>24/7</span>
                  <span className={styles.statLabel}>Dedicated Production Liaison</span>
                </div>
                <div className={styles.statBox}>
                  <span className={styles.statNum}>100%</span>
                  <span className={styles.statLabel}>IP & Tech Pack Protected</span>
                </div>
              </div>

              <div className={styles.cardFooter}>
                <Compass size={18} color="var(--primary)" />
                <p>Tailoring perfection for leaders in 50+ countries. Your brand deserves nothing less than perfection.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
