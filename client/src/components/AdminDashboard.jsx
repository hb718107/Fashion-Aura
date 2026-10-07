import React, { useState } from 'react';
import { Plus, Edit2, Trash2, LogOut, Package, ArrowLeft, Check, Upload, Layers, Image as ImageIcon, Filter } from 'lucide-react';
import { uploadProductImage } from '../services/productService';
import styles from './AdminDashboard.module.css';

export default function AdminDashboard({ products, onSaveProducts, onExitAdmin }) {
  const [productList, setProductList] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const [form, setForm] = useState({
    id: '',
    sku: '',
    name: '',
    category: 'Sports Wear',
    subCategory: 'Custom Teamwear',
    tags: 'Custom Teamwear',
    moq: 50,
    leadTime: '14 Business Days',
    fabric: '',
    customization: '',
    image: '',
    description: ''
  });

  const categories = ['All', 'Sports Wear', 'Fashion Wear', 'Custom Teamwear', 'Heavyweight Hoodies', 'Leather & Outerwear', 'Performance Activewear'];

  const handleOpenAdd = () => {
    setCurrentProduct(null);
    setPreviewImage('');
    setForm({
      id: `FA-NEW-${Date.now().toString().slice(-4)}`,
      sku: `FA-SKU-${Date.now().toString().slice(-3)}`,
      name: '',
      category: 'Sports Wear',
      subCategory: 'Custom Teamwear',
      tags: 'Custom Teamwear',
      moq: 50,
      leadTime: '14 Business Days',
      fabric: '100% Interlock Polyester (180 GSM)',
      customization: 'Sublimation, Woven Patches',
      image: '',
      description: ''
    });
    setIsEditing(true);
  };

  const handleOpenEdit = (p) => {
    setCurrentProduct(p);
    setPreviewImage(p.image);
    setForm({
      ...p,
      tags: Array.isArray(p.tags) ? p.tags.join(', ') : p.tags
    });
    setIsEditing(true);
  };

  const handleLocalImageSelect = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    const localBlobUrl = URL.createObjectURL(file);
    setPreviewImage(localBlobUrl);

    const publicUrl = await uploadProductImage(file);
    setUploadingImage(false);

    if (publicUrl) {
      setForm((prev) => ({ ...prev, image: publicUrl }));
      setPreviewImage(publicUrl);
    } else {
      setForm((prev) => ({ ...prev, image: localBlobUrl }));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this garment specimen from catalogue?')) {
      const deletedItem = productList.find((p) => p.id === id);
      const updated = productList.filter((p) => p.id !== id);
      setProductList(updated);
      onSaveProducts(updated, deletedItem, true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      ...form,
      moq: Number(form.moq),
      tags: typeof form.tags === 'string' ? form.tags.split(',').map((t) => t.trim()) : form.tags
    };

    let updated;
    if (currentProduct) {
      updated = productList.map((p) => (p.id === currentProduct.id ? productData : p));
    } else {
      updated = [productData, ...productList];
    }

    setProductList(updated);
    onSaveProducts(updated, productData, false);
    setIsEditing(false);
  };

  const displayedProducts = productList.filter((p) => {
    if (selectedCategory === 'All') return true;
    return p.category === selectedCategory || p.subCategory === selectedCategory;
  });

  return (
    <div className={styles.dashboard}>
      <header className={styles.topbar}>
        <div className={`container ${styles.barContainer}`}>
          <div className={styles.barLeft}>
            <button onClick={onExitAdmin} className={styles.backBtn} type="button">
              <ArrowLeft size={16} />
              <span>Back to Storefront</span>
            </button>
            <div className={styles.divider} />
            <span className={styles.portalTag}>COMMERCIAL BACKOFFICE</span>
          </div>

          <div className={styles.barRight}>
            <button onClick={handleOpenAdd} className={styles.addBtn} type="button">
              <Plus size={16} />
              <span>Add Specimen</span>
            </button>
            <button onClick={onExitAdmin} className={styles.logoutBtn} type="button">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      <main className={`container ${styles.mainContent}`}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Commercial Specimen Roster</h1>
            <p className={styles.subtitle}>Categorized catalogue management with direct Supabase Storage image synchronization.</p>
          </div>
          <div className={styles.statPill}>
            <Package size={16} color="var(--primary)" />
            <span>{displayedProducts.length} Garments ({selectedCategory})</span>
          </div>
        </div>

        {/* Category Tabs */}
        <div className={styles.categoryTabs}>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`${styles.tabBtn} ${selectedCategory === cat ? styles.activeTab : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Table */}
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Garment Specimen</th>
                <th>Category</th>
                <th>MOQ Tier</th>
                <th>Lead Time</th>
                <th>Fabric Specs</th>
                <th className={styles.textRight}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedProducts.length === 0 ? (
                <tr>
                  <td colSpan="6" className={styles.emptyRow}>
                    No garments found under "{selectedCategory}". Click "Add Specimen" to create one.
                  </td>
                </tr>
              ) : (
                displayedProducts.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div className={styles.itemCell}>
                        <img src={p.image || '/hero-banner.jpg'} alt={p.name} className={styles.thumb} />
                        <div>
                          <div className={styles.itemName}>{p.name}</div>
                          <div className={styles.itemSku}>SKU: {p.sku}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className={styles.catStack}>
                        <span className={styles.categoryBadge}>{p.category}</span>
                        <span className={styles.subCatText}>{p.subCategory}</span>
                      </div>
                    </td>
                    <td>
                      <span className={styles.moqText}>{p.moq} Units</span>
                    </td>
                    <td>
                      <span className={styles.leadTimeText}>{p.leadTime}</span>
                    </td>
                    <td className={styles.fabricCell}>{p.fabric}</td>
                    <td className={styles.textRight}>
                      <div className={styles.actionCluster}>
                        <button onClick={() => handleOpenEdit(p)} className={styles.editBtn} title="Edit Product">
                          <Edit2 size={15} />
                        </button>
                        <button onClick={() => handleDelete(p.id)} className={styles.deleteBtn} title="Delete Product">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Edit / Add Modal */}
        {isEditing && (
          <div className={styles.editOverlay}>
            <div className={styles.editModal}>
              <div className={styles.modalTop}>
                <h2>{currentProduct ? 'Modify Garment Specimen' : 'Add New Commercial Specimen'}</h2>
                <span className={styles.skuTag}>{form.sku}</span>
              </div>

              <form onSubmit={handleSubmit} className={styles.modalForm}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Garment Name *</label>
                    <input 
                      type="text" 
                      value={form.name} 
                      onChange={(e) => setForm({ ...form, name: e.target.value })} 
                      placeholder="e.g. Pro Matchday Sublimated Football Jersey"
                      required 
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>SKU Ref *</label>
                    <input 
                      type="text" 
                      value={form.sku} 
                      onChange={(e) => setForm({ ...form, sku: e.target.value })} 
                      required 
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Primary Division *</label>
                    <select 
                      value={form.category} 
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                    >
                      <option value="Sports Wear">Sports Wear</option>
                      <option value="Fashion Wear">Fashion Wear</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label>Sub-Category *</label>
                    <input 
                      type="text" 
                      value={form.subCategory} 
                      onChange={(e) => setForm({ ...form, subCategory: e.target.value })} 
                      placeholder="e.g. Heavyweight Hoodies / Leather & Outerwear"
                      required 
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>MOQ Units *</label>
                    <input 
                      type="number" 
                      value={form.moq} 
                      onChange={(e) => setForm({ ...form, moq: e.target.value })} 
                      required 
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Lead Time *</label>
                    <input 
                      type="text" 
                      value={form.leadTime} 
                      onChange={(e) => setForm({ ...form, leadTime: e.target.value })} 
                      placeholder="e.g. 14 Business Days"
                      required 
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>Fabric Composition *</label>
                  <input 
                    type="text" 
                    value={form.fabric} 
                    onChange={(e) => setForm({ ...form, fabric: e.target.value })} 
                    placeholder="e.g. 100% Organic French Terry (480 GSM)"
                    required 
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>OEM Customization Trims</label>
                  <input 
                    type="text" 
                    value={form.customization} 
                    onChange={(e) => setForm({ ...form, customization: e.target.value })} 
                    placeholder="e.g. Puff Print, Screen Print, Engraved Metal Aglets"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Garment Technical Description</label>
                  <textarea 
                    rows="3"
                    value={form.description} 
                    onChange={(e) => setForm({ ...form, description: e.target.value })} 
                    placeholder="Provide full technical breakdown, weave structure, ergonomic fit details, and intended commercial use..."
                  />
                </div>

                {/* Local Image Upload & URL Section */}
                <div className={styles.uploadSection}>
                  <label>Garment Specimen Image (Upload Local File to Supabase Bucket)</label>
                  <div className={styles.uploadControlGrid}>
                    <label className={styles.uploadBoxBtn}>
                      <Upload size={18} color="var(--primary)" />
                      <span>{uploadingImage ? 'Uploading to Supabase bucket...' : 'Browse Local Image File'}</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleLocalImageSelect} 
                        className={styles.hiddenFileInput} 
                      />
                    </label>

                    {previewImage && (
                      <div className={styles.previewBox}>
                        <img src={previewImage} alt="Preview" className={styles.previewImg} />
                      </div>
                    )}
                  </div>

                  <div className={styles.urlFallback}>
                    <span>Or direct CDN Image URL:</span>
                    <input 
                      type="text" 
                      value={form.image} 
                      onChange={(e) => {
                        setForm({ ...form, image: e.target.value });
                        setPreviewImage(e.target.value);
                      }} 
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className={styles.modalActions}>
                  <button type="button" onClick={() => setIsEditing(false)} className={styles.cancelBtn}>
                    Cancel
                  </button>
                  <button type="submit" disabled={uploadingImage} className={styles.saveBtn}>
                    <Check size={16} />
                    <span>Save Specimen</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
