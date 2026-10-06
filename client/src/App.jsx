import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Divisions from './components/Divisions';
import CatalogueGrid from './components/CatalogueGrid';
import ExportMetrics from './components/ExportMetrics';
import AboutStory from './components/AboutStory';
import RfqSection from './components/RfqSection';
import FloatingDossier from './components/FloatingDossier';
import Footer from './components/Footer';
import { initialProducts, categories } from './data/products';

export default function App() {
  const [products] = useState(initialProducts);
  const [activeCategory, setActiveCategory] = useState('All Categories');
  const [dossierItems, setDossierItems] = useState([]);

  const filteredProducts = products.filter((item) => {
    if (activeCategory === 'All Categories') return true;
    return (
      item.category === activeCategory ||
      item.subCategory === activeCategory ||
      item.tags.includes(activeCategory)
    );
  });

  const handleAddToRfq = (product, qty) => {
    setDossierItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, { ...product, qty: qty || product.moq }];
    });
  };

  const handleClearDossier = () => {
    setDossierItems([]);
  };

  const handleScrollToRfq = () => {
    const el = document.getElementById('quick-rfq');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFilterSelect = (categoryName) => {
    setActiveCategory(categoryName);
    const el = document.getElementById('catalogue-matrix');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-root">
      <Navbar onOpenRfq={handleScrollToRfq} />

      <main>
        <Hero onOpenRfq={handleScrollToRfq} />
        <Divisions onSelectFilter={handleFilterSelect} />
        <CatalogueGrid 
          products={filteredProducts}
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          onAddToRfq={handleAddToRfq}
          dossierItems={dossierItems}
        />
        <ExportMetrics />
        <AboutStory />
        <RfqSection 
          dossierItems={dossierItems} 
          onClearDossier={handleClearDossier} 
        />
      </main>

      <FloatingDossier 
        dossierItems={dossierItems} 
        onClearDossier={handleClearDossier} 
      />

      <Footer />
    </div>
  );
}
