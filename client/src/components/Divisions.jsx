import React from 'react';
import { Droplets, Maximize2, Wind, ShieldCheck, Sparkles, Palette, Award, Wrench, ArrowRight } from 'lucide-react';
import styles from './Divisions.module.css';

export default function Divisions({ onSelectFilter }) {
  return (
    <section className={styles.divisionsSection}>
      <div className={`container ${styles.container}`}>
        <div className={styles.sectionHeader}>
          <div className={styles.headerLeft}>
            <div className={styles.accentLineWrapper}>
              <div className={styles.goldLine} />
              <span className={styles.badgeText}>DUAL MATRIX ARCHITECTURE</span>
            </div>
            <h2 className={styles.heading}>SPECIALIZED MANUFACTURING DIVISIONS</h2>
          </div>
          <p className={styles.headerDesc}>
            Dedicated industrial lines engineered to support both high-output seasonal activewear contracts and bespoke luxury menswear productions.
          </p>
        </div>

        <div className={styles.cardsGrid}>
          <div id="sports-division" className={styles.divisionCard}>
            <div className={styles.cardContent}>
              <div className={styles.cardTop}>
                <span className={styles.unitCode}>UNIT DIV-01</span>
                <span className={styles.categoryBadge}>ENGINEERED ACTIVEWEAR</span>
              </div>

              <h3 className={styles.cardTitle}>Performance Sports Wear</h3>
              <p className={styles.cardDesc}>
                Full-scale team kit production, ergonomic training gear, and technical activewear built with thermal regulation and zero chafing protocols.
              </p>

              <div className={styles.tagsBlock}>
                <span className={styles.blockLabel}>Disciplines & Garment Types</span>
                <div className={styles.tagList}>
                  <span className={styles.tag}>Soccer Kits</span>
                  <span className={styles.tag}>Basketball Uniforms</span>
                  <span className={styles.tag}>Rugby Pro Jerseys</span>
                  <span className={styles.tag}>Seamless Compression</span>
                  <span className={styles.tag}>Full Sublimation</span>
                </div>
              </div>

              <div className={styles.specGrid}>
                <div className={styles.specItem}>
                  <Droplets size={16} color="var(--primary)" />
                  <span>Quick-dry moisture-wicking capillary knit</span>
                </div>
                <div className={styles.specItem}>
                  <Maximize2 size={16} color="var(--primary)" />
                  <span>4-way stretch antimicrobial elastane</span>
                </div>
                <div className={styles.specItem}>
                  <Wind size={16} color="var(--primary)" />
                  <span>Laser-cut micro-ventilation mapping</span>
                </div>
                <div className={styles.specItem}>
                  <ShieldCheck size={16} color="var(--primary)" />
                  <span>ISO colorfastness Grade 4.5+ guaranteed</span>
                </div>
              </div>
            </div>

            <div className={styles.cardFooter}>
              <span className={styles.moqText}>MOQ: 50 Units • Lead: 14-18 Days</span>
              <button 
                onClick={() => onSelectFilter('Performance Activewear')}
                className={styles.exploreBtn}
                type="button"
              >
                <span>Explore Sports Line</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

          <div id="luxury-division" className={styles.divisionCard}>
            <div className={styles.cardContent}>
              <div className={styles.cardTop}>
                <span className={styles.unitCode}>UNIT DIV-02</span>
                <span className={styles.categoryBadge}>COUTURE & HEAVYWEIGHT</span>
              </div>

              <h3 className={styles.cardTitle}>Fashion & Luxury Casuals</h3>
              <p className={styles.cardDesc}>
                Premium heavyweight streetwear silhouettes, artisanal washed fleeces, and handcrafted outerwear tailored to strict retail tech pack tolerances.
              </p>

              <div className={styles.tagsBlock}>
                <span className={styles.blockLabel}>Silhouettes & Outerwear</span>
                <div className={styles.tagList}>
                  <span className={styles.tag}>450+ GSM Hoodies</span>
                  <span className={styles.tag}>French Terry Sweatshirts</span>
                  <span className={styles.tag}>Biker Leather Jackets</span>
                  <span className={styles.tag}>Varsity Bombers</span>
                  <span className={styles.tag}>Drop-Shoulder Tees</span>
                </div>
              </div>

              <div className={styles.specGrid}>
                <div className={styles.specItem}>
                  <Sparkles size={16} color="var(--primary)" />
                  <span>Hand-distressed drum-dyed cowhide leather</span>
                </div>
                <div className={styles.specItem}>
                  <Palette size={16} color="var(--primary)" />
                  <span>Custom pigment, oil & acid wash washes</span>
                </div>
                <div className={styles.specItem}>
                  <Award size={16} color="var(--primary)" />
                  <span>High-density chenille & 3D puff embroidery</span>
                </div>
                <div className={styles.specItem}>
                  <Wrench size={16} color="var(--primary)" />
                  <span>YKK custom antique brass hardware integration</span>
                </div>
              </div>
            </div>

            <div className={styles.cardFooter}>
              <span className={styles.moqText}>MOQ: 25-100 Units • Lead: 20-28 Days</span>
              <button 
                onClick={() => onSelectFilter('Leather & Outerwear')}
                className={styles.exploreBtn}
                type="button"
              >
                <span>Explore Fashion Line</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
