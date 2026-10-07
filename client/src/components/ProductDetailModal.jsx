import React from 'react';
import { X, Check, PlusCircle, FlaskConical, Shield, Clock, Layers, Sparkles, MessageCircle, Send } from 'lucide-react';
import styles from './ProductDetailModal.module.css';

export default function ProductDetailModal({ product, isOpen, onClose, onAddToRfq, isAddedInRfq }) {
  if (!isOpen || !product) return null;

  const getWhatsAppSampleLink = () => {
    const text = `Hello Fashion Aura Export Desk,%0A%0AI am requesting technical specifications & swatch samples for:%0A- *${encodeURIComponent(product.name)}* (SKU: ${product.sku})%0A- *MOQ Tier:* ${product.moq} Pcs%0A- *Fabric:* ${encodeURIComponent(product.fabric)}`;
    return `https://wa.me/923184590616?text=${text}`;
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} type="button">
          <X size={20} />
        </button>

        <div className={styles.modalGrid}>
          {/* Left: Product High-Res Visual Showcase */}
          <div className={styles.imageCol}>
            <div className={styles.imageFrame}>
              <img src={product.image || '/hero-banner.jpg'} alt={product.name} className={styles.mainImg} />
              <div className={styles.moqTag}>
                <span>MOQ: {product.moq} Units</span>
              </div>
              <div className={styles.skuTag}>
                <span>{product.sku}</span>
              </div>
            </div>
          </div>

          {/* Right: Technical Spec Dossier */}
          <div className={styles.detailsCol}>
            <div className={styles.headerStack}>
              <div className={styles.categoryBadgeRow}>
                <span className={styles.catBadge}>{product.category}</span>
                <span className={styles.subCatText}>• {product.subCategory}</span>
              </div>
              <h2 className={styles.productTitle}>{product.name}</h2>
              <p className={styles.description}>
                {product.description || 'Precision OEM/ODM export manufacture engineered with industrial-grade tensile strength, exact pantone color matching, and strict AQL 2.5 quality control compliance.'}
              </p>
            </div>

            {/* Spec Matrix Table */}
            <div className={styles.specMatrix}>
              <div className={styles.specRow}>
                <span className={styles.specLabel}>Fabric Composition</span>
                <span className={styles.specValue}>{product.fabric}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specLabel}>Export Lead Time</span>
                <span className={`${styles.specValue} ${styles.goldVal}`}>{product.leadTime}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specLabel}>OEM Customization</span>
                <span className={styles.specValue}>{product.customization || 'Custom Branding, Woven Tags, Bespoke Trims'}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specLabel}>Export Compliance</span>
                <span className={styles.specValue}>OEKO-TEX / ISO 9001 Certified</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className={styles.actionsCluster}>
              <button
                type="button"
                onClick={() => onAddToRfq(product, product.moq)}
                className={`${styles.primaryRfqBtn} ${isAddedInRfq ? styles.addedRfqBtn : ''}`}
              >
                {isAddedInRfq ? (
                  <>
                    <Check size={18} />
                    <span>Selected in RFQ Dossier</span>
                  </>
                ) : (
                  <>
                    <PlusCircle size={18} />
                    <span>Add to RFQ Dossier ({product.moq} Pcs)</span>
                  </>
                )}
              </button>

              <a
                href={getWhatsAppSampleLink()}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.waSampleBtn}
              >
                <MessageCircle size={18} />
                <span>Request Lab Swatch via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
