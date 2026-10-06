import React from 'react';
import { Package, ArrowRight } from 'lucide-react';
import styles from './FloatingDossier.module.css';

export default function FloatingDossier({ dossierItems, onClearDossier }) {
  if (dossierItems.length === 0) return null;

  const totalVolume = dossierItems.reduce((acc, curr) => acc + (curr.qty || 0), 0);

  return (
    <div className={styles.floatingBar}>
      <div className={`container ${styles.container}`}>
        <div className={styles.leftInfo}>
          <div className={styles.iconBox}>
            <Package size={20} color="var(--primary)" />
          </div>
          <div className={styles.textStack}>
            <span className={styles.title}>ACTIVE RFQ PROCUREMENT DOSSIER</span>
            <span className={styles.stats}>
              {dossierItems.length} Specimen Items Selected • Volume Est: {totalVolume.toLocaleString()} Pcs
            </span>
          </div>
        </div>

        <div className={styles.actions}>
          <button type="button" onClick={onClearDossier} className={styles.clearBtn}>
            Clear
          </button>
          <a href="#quick-rfq" className={styles.finalizeBtn}>
            <span>Finalize RFQ Dossier</span>
            <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </div>
  );
}
