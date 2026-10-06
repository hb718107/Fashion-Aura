import React from 'react';
import styles from './ExportMetrics.module.css';

export default function ExportMetrics() {
  const metrics = [
    {
      value: '50+',
      label: 'EXPORT DESTINATIONS',
      desc: 'Regular bulk fulfillment into USA, UK, Germany, Australia, Canada, and UAE with customs compliance.'
    },
    {
      value: '100%',
      label: 'OEM / ODM CUSTOM',
      desc: 'Full private labeling, tech pack translation, bespoke branded packaging, and custom trims.'
    },
    {
      value: 'AQL 2.5',
      label: '4-POINT QC MATRIX',
      desc: 'Fabric tensile testing, shrinkage calibration, inline seam checks & pre-shipment audit logs.'
    },
    {
      value: '18 Days',
      label: 'FAST TURNAROUND',
      desc: 'Express sample development in 5–7 business days; fast production slots with guaranteed departures.'
    }
  ];

  return (
    <section id="export-capabilities" className={styles.metricsSection}>
      <div className={`container ${styles.container}`}>
        <div className={styles.metricsGrid}>
          {metrics.map((m, idx) => (
            <div key={idx} className={styles.metricCard}>
              <div className={styles.metricValue}>{m.value}</div>
              <span className={styles.metricLabel}>{m.label}</span>
              <p className={styles.metricDesc}>{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
