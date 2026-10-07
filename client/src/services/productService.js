import { createClient } from '@supabase/supabase-js';
import { initialProducts } from '../data/products';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

const STORAGE_KEY = 'fashion_aura_products';

export const fetchProducts = async () => {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map((item) => ({
          id: item.id,
          sku: item.sku,
          name: item.name,
          category: item.category,
          subCategory: item.sub_category || item.subCategory,
          tags: item.tags || [],
          moq: item.moq,
          leadTime: item.lead_time || item.leadTime,
          fabric: item.fabric,
          customization: item.customization,
          image: item.image,
          description: item.description
        }));
      }
    } catch (e) {
      console.error('Supabase fetch error, fallback to local:', e);
    }
  }

  return getStoredProducts();
};

export const syncProductToDb = async (product) => {
  if (supabase) {
    try {
      const dbPayload = {
        id: product.id,
        sku: product.sku,
        name: product.name,
        category: product.category,
        sub_category: product.subCategory,
        tags: product.tags,
        moq: product.moq,
        lead_time: product.leadTime,
        fabric: product.fabric,
        customization: product.customization,
        image: product.image,
        description: product.description
      };

      await supabase.from('products').upsert([dbPayload]);
    } catch (e) {
      console.error('Supabase upsert error:', e);
    }
  }
};

export const deleteProductFromDb = async (productOrId) => {
  if (supabase && productOrId) {
    const id = typeof productOrId === 'object' ? productOrId.id : productOrId;
    const imageUrl = typeof productOrId === 'object' ? productOrId.image : null;

    try {
      await supabase.from('products').delete().eq('id', id);

      if (imageUrl && imageUrl.includes('/storage/v1/object/public/products/')) {
        const fileName = imageUrl.split('/storage/v1/object/public/products/').pop();
        if (fileName) {
          await supabase.storage.from('products').remove([decodeURIComponent(fileName)]);
        }
      }
    } catch (e) {
      console.error('Supabase delete error:', e);
    }
  }
};

export const uploadProductImage = async (file) => {
  if (!supabase || !file) return null;
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `specimen-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('products')
      .upload(filePath, file, { cacheControl: '3600', upsert: true });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return null;
    }

    const { data } = supabase.storage
      .from('products')
      .getPublicUrl(filePath);

    return data?.publicUrl || null;
  } catch (err) {
    console.error('Storage exception:', err);
    return null;
  }
};

export const getStoredProducts = () => {
  try {
    const local = localStorage.getItem(STORAGE_KEY);
    if (local) return JSON.parse(local);
  } catch (e) {
    console.error(e);
  }
  return initialProducts;
};

export const saveStoredProducts = (products) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch (e) {
    console.error(e);
  }
};
