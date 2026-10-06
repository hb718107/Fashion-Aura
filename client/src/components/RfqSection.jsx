import React, { useState } from 'react';
import { Shield, Landmark, Award, MessageCircle, Send, CheckCircle, Paperclip } from 'lucide-react';
import styles from './RfqSection.module.css';

export default function RfqSection({ dossierItems, onClearDossier }) {
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState('Upload Tech Pack (.PDF, .AI, .ZIP, max 25MB)');
  const [formData, setFormData] = useState({
    category: 'Sports Wear (Performance Kits & Teamwear)',
    quantity: 'Sample Order (3-5 Specimen Pieces)',
    company: '',
    email: '',
    phone: '',
    destination: '',
    incoterm: 'FOB (Free On Board)',
    notes: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onClearDossier();
    }, 2000);
  };

  const getWhatsAppLink = () => {
    let text = `Hello Fashion Aura Export Desk,%0A%0AI am inquiring about OEM/ODM apparel manufacturing:%0A`;
    if (formData.company) text += `*Company:* ${encodeURIComponent(formData.company)}%0A`;
    if (formData.category) text += `*Target Line:* ${encodeURIComponent(formData.category)}%0A`;
    if (formData.quantity) text += `*Quantity Tier:* ${encodeURIComponent(formData.quantity)}%0A`;
    if (dossierItems.length > 0) {
      text += `*Selected Specimens:*%0A`;
      dossierItems.forEach(item => {
        text += `- ${item.name} (Qty: ${item.qty})%0A`;
      });
    }
    return `https://wa.me/923184590616?text=${text}`;
  };

  return (
    <section id="quick-rfq" className={styles.rfqSection}>
      <div className={`container ${styles.container}`}>
        <div className={styles.rfqGrid}>
          <div className={styles.leftCol}>
            <div className={styles.titles}>
              <span className={styles.subHeading}>DIRECT FACTORY INQUIRIES</span>
              <h2 className={styles.heading}>INITIATE RFQ & SAMPLE DOSSIER</h2>
              <p className={styles.desc}>
                Submit your preliminary volume requirements or tech pack specifications directly to our engineering desk for immediate volumetric costing and capacity reservation.
              </p>
            </div>

            <div className={styles.guaranteeBox}>
              <span className={styles.boxTitle}>INTERNATIONAL TRADE GUARANTEES</span>
              <ul className={styles.guaranteeList}>
                <li>
                  <Award size={18} color="var(--primary)" />
                  <span>DDP / FOB / CIF Shipping Options with bonded export cargo insurance</span>
                </li>
                <li>
                  <Landmark size={18} color="var(--primary)" />
                  <span>Bank L/C (Letter of Credit) & TT Wire Transfer compliance</span>
                </li>
                <li>
                  <Shield size={18} color="var(--primary)" />
                  <span>Verified Direct Apparel Exporter with full SGS audit clearance</span>
                </li>
              </ul>
            </div>

            <div className={styles.whatsappCard}>
              <div className={styles.chatIcon}>
                <MessageCircle size={24} color="var(--primary)" />
              </div>
              <div className={styles.chatContent}>
                <span className={styles.chatTitle}>PREFER INSTANT TRADE CHAT?</span>
                <span className={styles.chatSub}>Direct senior production specialist online now.</span>
                <a 
                  href={getWhatsAppLink()} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.whatsappLink}
                >
                  <span>LAUNCH WHATSAPP DESK</span>
                  <Send size={12} />
                </a>
              </div>
            </div>
          </div>

          <div className={styles.formCol}>
            <form onSubmit={handleSubmit} className={styles.rfqForm}>
              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label>Target Apparel Line *</label>
                  <select name="category" value={formData.category} onChange={handleChange} required>
                    <option value="Sports Wear (Performance Kits & Teamwear)">Sports Wear (Performance Kits & Teamwear)</option>
                    <option value="Heavyweight Hoodies & Fleece Streetwear">Heavyweight Hoodies & Fleece Streetwear</option>
                    <option value="Genuine Leather & Hybrid Outerwear">Genuine Leather & Hybrid Outerwear</option>
                    <option value="Seamless Activewear & Compression">Seamless Activewear & Compression</option>
                    <option value="Multiple Lines / Full Collection OEM">Multiple Lines / Full Collection OEM</option>
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <label>Estimated Quantity (Units) *</label>
                  <select name="quantity" value={formData.quantity} onChange={handleChange} required>
                    <option value="Sample Order (3-5 Specimen Pieces)">Sample Order (3-5 Specimen Pieces)</option>
                    <option value="50 - 150 Pcs (Trial Production)">50 - 150 Pcs (Trial Production)</option>
                    <option value="150 - 500 Pcs (Standard Run)">150 - 500 Pcs (Standard Run)</option>
                    <option value="500 - 2,000 Pcs (Commercial Bulk)">500 - 2,000 Pcs (Commercial Bulk)</option>
                    <option value="2,000 - 10,000+ Pcs (Syndicate Contract)">2,000 - 10,000+ Pcs (Syndicate Contract)</option>
                  </select>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label>Company / Brand Entity *</label>
                  <input 
                    type="text" 
                    name="company" 
                    placeholder="e.g. Apex Athletics Ltd" 
                    value={formData.company} 
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label>Corporate Procurement Email *</label>
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="procurement@brand.com" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label>Destination Port / Country *</label>
                  <input 
                    type="text" 
                    name="destination" 
                    placeholder="e.g. Los Angeles, USA or Felixstowe, UK" 
                    value={formData.destination} 
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label>Preferred Incoterm</label>
                  <select name="incoterm" value={formData.incoterm} onChange={handleChange}>
                    <option value="FOB (Free On Board)">FOB (Free On Board)</option>
                    <option value="DDP (Delivered Duty Paid)">DDP (Delivered Duty Paid)</option>
                    <option value="CIF (Cost, Insurance & Freight)">CIF (Cost, Insurance & Freight)</option>
                    <option value="EXW (Ex Works)">EXW (Ex Works)</option>
                  </select>
                </div>
              </div>

              {dossierItems.length > 0 && (
                <div className={styles.dossierPreview}>
                  <div className={styles.dossierHeader}>
                    <span>ATTACHED SPECIMENS IN DOSSIER ({dossierItems.length})</span>
                    <button type="button" onClick={onClearDossier} className={styles.clearBtn}>Remove All</button>
                  </div>
                  <div className={styles.dossierTags}>
                    {dossierItems.map((item, i) => (
                      <span key={i} className={styles.dossierTag}>
                        {item.name} • {item.qty} Pcs
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className={styles.inputGroup}>
                <label>Fabric Specs, GSM, or Custom Trims Requirements</label>
                <textarea 
                  name="notes" 
                  rows="3" 
                  placeholder="Provide GSM preferences, pantone references, print techniques (puff, screen, embroidery), or tech pack links..."
                  value={formData.notes}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.uploadBox}>
                <div className={styles.uploadLeft}>
                  <Paperclip size={18} color="var(--primary)" />
                  <span className={styles.fileText}>{fileName}</span>
                </div>
                <label className={styles.browseBtn}>
                  Browse
                  <input type="file" onChange={handleFileChange} className={styles.hiddenFile} />
                </label>
              </div>

              <button type="submit" className={styles.submitBtn}>
                <span>Dispatch Formal Quotation Request</span>
                <Send size={16} />
              </button>

              <span className={styles.ndaText}>
                Strict B2B confidentiality guaranteed under mutual Non-Disclosure Agreement (NDA).
              </span>

              {submitted && (
                <div className={styles.successAlert}>
                  <CheckCircle size={20} color="var(--primary)" />
                  <span>Quotation dispatch transmitted. Assigned Account Manager will review tech specs and reply within 2 hours.</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
