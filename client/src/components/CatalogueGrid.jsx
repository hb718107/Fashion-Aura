import React from 'react';
import { PlusCircle, FlaskConical, Check } from 'lucide-react';
import styles from './CatalogueGrid.module.css';

export default function CatalogueGrid({ 
  products, 
  categories, 
  activeCategory, 
  onSelectCategory, 
  onAddToRfq,
  dossierItems
}) {
  return (
    <section id="catalogue-matrix" className={styles.catalogueSection}>
      <div className={`container ${styles.container}`}>
        <div className={styles.sectionHeader}>
          <div className={styles.headerLeft}>
            <span className={styles.subHeading}>COMMERCIAL SPEC SHEETS</span>
            <h2 className={styles.heading}>FACTORY DIRECT CATALOGUE</h2>
            <p className={styles.subText}>
              Direct OEM/ODM production slots. Select specimens to request physical swatches or immediate production quotes.
            </p>
          </div>

          <div className={styles.filterBar}>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => onSelectCategory(cat)}
                className={`${styles.filterBtn} ${activeCategory === cat ? styles.activeFilter : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.productGrid}>
          {products.map((item) => {
            const isAdded = dossierItems.some((d) => d.id === item.id);

            return (
              <div key={item.id} className={styles.productCard}>
                <div className={styles.imageContainer}>
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className={styles.productImage}
                  />
                  <div className={styles.moqBadge}>
                    <span>MOQ: {item.moq} Units</span>
                  </div>
                  <div className={styles.skuBadge}>
                    <span>SKU: {item.sku}</span>
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.cardTitles}>
                    <span className={styles.subCategory}>{item.subCategory}</span>
                    <h3 className={styles.productName}>{item.name}</h3>
                  </div>

                  <div className={styles.specTable}>
                    <div className={styles.specRow}>
                      <span className={styles.specLabel}>Fabric Composition</span>
                      <span className={styles.specValue}>{item.fabric}</span>
                    </div>
                    <div className={styles.specRow}>
                      <span className={styles.specLabel}>Lead Time</span>
                      <span className={`${styles.specValue} ${styles.leadTimeValue}`}>{item.leadTime}</span>
                    </div>
                    <div className={styles.specRow}>
                      <span className={styles.specLabel}>OEM Customization</span>
                      <span className={styles.specValue}>{item.customization}</span>
                    </div>
                  </div>

                  <div className={styles.actionRow}>
                    <button
                      type="button"
                      onClick={() => onAddToRfq(item, item.moq)}
                      className={`${styles.addRfqBtn} ${isAdded ? styles.addedBtn : ''}`}
                    >
                      {isAdded ? (
                        <>
                          <Check size={16} />
                          <span>Added in RFQ</span>
                        </>
                      ) : (
                        <>
                          <PlusCircle size={16} />
                          <span>Add to RFQ</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      title="Order Swatch Lab Sample"
                      onClick={() => onAddToRfq({ ...item, name: `${item.name} (Lab Swatch)` }, 3)}
                      className={styles.sampleBtn}
                    >
                      <FlaskConical size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
