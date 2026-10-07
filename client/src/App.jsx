import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Divisions from './components/Divisions';
import CatalogueGrid from './components/CatalogueGrid';
import ExportMetrics from './components/ExportMetrics';
import AboutStory from './components/AboutStory';
import RfqSection from './components/RfqSection';
import FloatingDossier from './components/FloatingDossier';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import AdminLoginModal from './components/AdminLoginModal';
import { categories } from './data/products';
import { fetchProducts, saveStoredProducts, syncProductToDb, deleteProductFromDb } from './services/productService';

export default function App() {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All Categories');
  const [dossierItems, setDossierItems] = useState([]);
  
  const [isAdminRoute, setIsAdminRoute] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    loadData();
  }, []);

  useEffect(() => {
    const checkRoute = () => {
      const path = window.location.pathname.toLowerCase();
      if (path === '/admin' || path === '/admin/') {
        setIsAdminRoute(true);
        if (!isAdminLoggedIn) {
          setShowLoginModal(true);
        }
      } else {
        setIsAdminRoute(false);
        setShowLoginModal(false);
      }
    };

    checkRoute();
    window.addEventListener('popstate', checkRoute);
    return () => window.removeEventListener('popstate', checkRoute);
  }, [isAdminLoggedIn]);

  const handleSaveProducts = async (updated, changedProduct, isDelete) => {
    setProducts(updated);
    saveStoredProducts(updated);
    if (isDelete && changedProduct) {
      await deleteProductFromDb(changedProduct);
    } else if (changedProduct) {
      await syncProductToDb(changedProduct);
    }
  };

  const handleLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setShowLoginModal(false);
  };

  const handleExitAdmin = () => {
    window.history.pushState({}, '', '/');
    setIsAdminRoute(false);
    setIsAdminLoggedIn(false);
    setShowLoginModal(false);
  };

  const filteredProducts = products.filter((item) => {
    if (activeCategory === 'All Categories') return true;
    return (
      item.category === activeCategory ||
      item.subCategory === activeCategory ||
      (item.tags && item.tags.includes(activeCategory))
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

  if (isAdminRoute && isAdminLoggedIn) {
    return (
      <AdminDashboard 
        products={products}
        onSaveProducts={handleSaveProducts}
        onExitAdmin={handleExitAdmin}
      />
    );
  }

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

      <AdminLoginModal 
        isOpen={showLoginModal}
        onClose={handleExitAdmin}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
