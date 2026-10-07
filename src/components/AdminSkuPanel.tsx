import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../context/StoreContext';
import { inventoryService } from '../services/inventoryService';
import { googleDriveService } from '../services/googleDriveService';
import { Product, ProductSize } from '../types/inventory';
import { ImageUploadDropzone } from './ImageUploadDropzone';
import { GoogleDriveConfigModal } from './GoogleDriveConfigModal';
import { 
  X, 
  Plus, 
  Search, 
  Download, 
  FileSpreadsheet, 
  FileCode, 
  AlertTriangle, 
  Boxes, 
  Trash2, 
  Check, 
  ExternalLink,
  Code2,
  ChevronDown,
  ChevronUp,
  HardDrive,
  Edit,
  Sparkles,
  RefreshCw
} from 'lucide-react';

export const AdminSkuPanel: React.FC = () => {
  const {
    isAdminPanelOpen,
    setIsAdminPanelOpen,
    refreshProducts,
    formatPrice,
    openProductDetail,
    showToast,
  } = useStore();

  const [searchSku, setSearchSku] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [filterStockStatus, setFilterStockStatus] = useState<'ALL' | 'LOW' | 'OUT'>('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDriveModalOpen, setIsDriveModalOpen] = useState(false);
  const [showApiDocs, setShowApiDocs] = useState(false);

  // Edit Product Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editSku, setEditSku] = useState('');
  const [editName, setEditName] = useState('');
  const [editCategory, setEditCategory] = useState<Product['category']>('READY TO WEAR');
  const [editCollection, setEditCollection] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editOriginalPrice, setEditOriginalPrice] = useState('');
  const [editCostPrice, setEditCostPrice] = useState('');
  const [editColor, setEditColor] = useState('');
  const [editFabricTag, setEditFabricTag] = useState('');
  const [editFabric, setEditFabric] = useState('');
  const [editWarehouse, setEditWarehouse] = useState('');
  const [editImages, setEditImages] = useState<string[]>([]);
  const [editStockXS, setEditStockXS] = useState('0');
  const [editStockS, setEditStockS] = useState('0');
  const [editStockM, setEditStockM] = useState('0');
  const [editStockL, setEditStockL] = useState('0');
  const [editStockXL, setEditStockXL] = useState('0');

  // New product form state
  const [newSku, setNewSku] = useState('');
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<Product['category']>('READY TO WEAR');
  const [newCollection, setNewCollection] = useState("Summer Lawn '26");
  const [newPrice, setNewPrice] = useState('6990');
  const [newOriginalPrice, setNewOriginalPrice] = useState('9990');
  const [newCostPrice, setNewCostPrice] = useState('3200');
  const [newColor, setNewColor] = useState('Teal Turquoise');
  const [newFabricTag, setNewFabricTag] = useState('Lawn');
  const [newFabric, setNewFabric] = useState('Pure Cambric Lawn with Resham Threadwork');
  const [newWarehouse, setNewWarehouse] = useState('WH-KHI-AISLE-5B');
  const [newImages, setNewImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80'
  ]);
  const [newStockXS, setNewStockXS] = useState('5');
  const [newStockS, setNewStockS] = useState('10');
  const [newStockM, setNewStockM] = useState('15');
  const [newStockL, setNewStockL] = useState('8');
  const [newStockXL, setNewStockXL] = useState('4');

  const stats = inventoryService.getStats();
  const allProducts = inventoryService.getAll();
  const driveConfig = googleDriveService.getConfig();
  const isDriveConfigured = Boolean(driveConfig.scriptUrl && driveConfig.scriptUrl.trim());

  // Filter products for the admin table
  const filteredProducts = allProducts.filter((p) => {
    if (searchSku.trim()) {
      const q = searchSku.toLowerCase();
      if (!p.sku.toLowerCase().includes(q) && !p.name.toLowerCase().includes(q)) {
        return false;
      }
    }

    if (filterCategory !== 'ALL' && p.category !== filterCategory) {
      return false;
    }

    const totalStock = p.sizes.reduce((sum, s) => sum + s.stock, 0);
    if (filterStockStatus === 'LOW' && (totalStock > 10 || totalStock === 0)) {
      return false;
    }
    if (filterStockStatus === 'OUT' && totalStock > 0) {
      return false;
    }

    return true;
  });

  const generateAutoSku = () => {
    const prefix = newCategory.substring(0, 3).toUpperCase();
    const randomCode = Math.floor(100 + Math.random() * 900);
    const suffix = 'P' + Math.floor(1 + Math.random() * 3) + 'T';
    setNewSku(`SS26${prefix}${randomCode}${suffix}`);
  };

  const handleStockAdjust = (sku: string, size: ProductSize, delta: number) => {
    const product = inventoryService.getBySku(sku);
    if (!product) return;
    const current = product.sizes.find((s) => s.size === size)?.stock ?? 0;
    const updated = Math.max(0, current + delta);
    inventoryService.updateStockBySkuSize(sku, size, updated);
    refreshProducts();
    showToast(`Updated stock for ${sku} (${size}): ${updated} units`);
  };

  const handleDeleteSku = (sku: string) => {
    if (window.confirm(`Are you sure you want to permanently delete SKU "${sku}"?`)) {
      inventoryService.deleteProductBySku(sku);
      refreshProducts();
      showToast(`SKU ${sku} removed from system.`);
    }
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setEditSku(product.sku);
    setEditName(product.name);
    setEditCategory(product.category);
    setEditCollection(product.collection || '');
    setEditPrice(String(product.price || 0));
    setEditOriginalPrice(String(product.originalPrice || product.price || 0));
    setEditCostPrice(String(product.costPrice || product.price * 0.45));
    setEditColor(product.color || '');
    setEditFabricTag(product.fabricTag || 'Lawn');
    setEditFabric(product.fabric || '');
    setEditWarehouse(product.warehouseLocation || 'WH-MAIN');
    setEditImages(product.images && product.images.length > 0 ? product.images : []);

    const findStock = (sz: ProductSize) => String(product.sizes.find(s => s.size === sz)?.stock ?? 0);
    setEditStockXS(findStock('XS'));
    setEditStockS(findStock('S'));
    setEditStockM(findStock('M'));
    setEditStockL(findStock('L'));
    setEditStockXL(findStock('XL'));

    setIsEditModalOpen(true);
  };

  const handleSaveEditProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      const retail = parseFloat(editPrice) || 0;
      const orig = parseFloat(editOriginalPrice) || retail;
      const cost = parseFloat(editCostPrice) || retail * 0.45;
      const discount = orig > retail ? Math.round(((orig - retail) / orig) * 100) : 0;

      const sanitizedImages = editImages.length > 0 
        ? editImages 
        : ['https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=80'];

      await inventoryService.updateProduct(editingProduct.id, {
        sku: editSku.trim().toUpperCase(),
        name: editName.trim(),
        category: editCategory,
        collection: editCollection.trim(),
        price: retail,
        originalPrice: orig,
        discountPercentage: discount,
        costPrice: cost,
        color: editColor.trim(),
        fabricTag: editFabricTag,
        fabric: editFabric.trim() || editFabricTag,
        warehouseLocation: editWarehouse.trim(),
        images: sanitizedImages,
        sizes: [
          { size: 'XS', stock: parseInt(editStockXS) || 0 },
          { size: 'S', stock: parseInt(editStockS) || 0 },
          { size: 'M', stock: parseInt(editStockM) || 0 },
          { size: 'L', stock: parseInt(editStockL) || 0 },
          { size: 'XL', stock: parseInt(editStockXL) || 0 },
        ],
      });

      refreshProducts();
      setIsEditModalOpen(false);
      showToast(`Successfully updated SKU: ${editSku.toUpperCase()}`);
    } catch (err: any) {
      alert(err.message || 'Error updating product');
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSku.trim() || !newName.trim()) {
      alert('SKU and Product Name are mandatory.');
      return;
    }

    try {
      const retail = parseFloat(newPrice) || 0;
      const orig = parseFloat(newOriginalPrice) || retail;
      const cost = parseFloat(newCostPrice) || retail * 0.45;
      const discount = orig > retail ? Math.round(((orig - retail) / orig) * 100) : 0;

      const sanitizedImages = newImages.length > 0 
        ? newImages 
        : ['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80'];

      await inventoryService.addProduct({
        sku: newSku.trim().toUpperCase(),
        name: newName.trim(),
        category: newCategory,
        collection: newCollection.trim(),
        price: retail,
        originalPrice: orig,
        discountPercentage: discount,
        costPrice: cost,
        color: newColor.trim(),
        fabricTag: newFabricTag,
        fabric: newFabric.trim() || newFabricTag,
        warehouseLocation: newWarehouse.trim(),
        images: sanitizedImages,
        sizes: [
          { size: 'XS', stock: parseInt(newStockXS) || 0 },
          { size: 'S', stock: parseInt(newStockS) || 0 },
          { size: 'M', stock: parseInt(newStockM) || 0 },
          { size: 'L', stock: parseInt(newStockL) || 0 },
          { size: 'XL', stock: parseInt(newStockXL) || 0 },
        ],
        description: `Luxury signature piece from ${newCollection}. Beautifully structured and finished with precision craftsmanship.`,
        careInstructions: [
          'Dry clean recommended',
          'Handle delicate fabric with care',
          'Iron inside out on medium heat'
        ],
        isNewArrival: true,
      });

      refreshProducts();
      setIsAddModalOpen(false);
      showToast(`Successfully registered new SKU: ${newSku.toUpperCase()}`);

      // Reset form
      setNewSku('');
      setNewName('');
      setNewImages(['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80']);
    } catch (err: any) {
      alert(err.message || 'Error creating SKU product');
    }
  };

  const handleExportCsv = () => {
    const csvContent = inventoryService.exportCsv();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `FAMA_SKU_Inventory_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Downloaded SKU Inventory CSV');
  };

  const handleExportJson = () => {
    const jsonContent = inventoryService.exportJson();
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `FAMA_SKU_Inventory_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Downloaded SKU Inventory JSON');
  };

  const handleResetCatalog = () => {
    if (window.confirm('Reset inventory back to initial FAMA factory catalog?')) {
      inventoryService.resetToDefaultCatalog();
      refreshProducts();
      showToast('Inventory reset to initial catalog.');
    }
  };

  return (
    <>
      <AnimatePresence>
        {isAdminPanelOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/80 backdrop-blur-sm"
          >
            <div className="min-h-screen px-2 sm:px-4 py-6 md:px-8">
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.98 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-7xl mx-auto bg-white dark:bg-neutral-950 rounded-xs shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden flex flex-col"
              >
            
            {/* Top Admin Header */}
            <div className="p-4 sm:p-6 bg-neutral-950 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xs bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/40">
                  <Boxes className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="font-brand text-lg sm:text-xl tracking-widest uppercase">
                      SKU INVENTORY CONTROL
                    </h2>
                    <span className="px-2 py-0.5 bg-neutral-800 text-[10px] text-neutral-300 font-mono rounded">
                      INTERNAL PORTAL
                    </span>
                    <button
                      onClick={() => setIsDriveModalOpen(true)}
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono flex items-center gap-1.5 transition-colors cursor-pointer border ${
                        isDriveConfigured 
                          ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700 hover:bg-emerald-900' 
                          : 'bg-amber-950/80 text-amber-300 border-amber-700 hover:bg-amber-900 animate-pulse'
                      }`}
                    >
                      <HardDrive className="w-3 h-3" />
                      <span>{isDriveConfigured ? 'Google Drive Storage: Active' : 'Connect Google Drive (Free)'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-neutral-400 font-sans mt-0.5">
                    Live Stock, Multi-Photo Google Drive Drag &amp; Drop, and Firestore Catalog Synchronization
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end flex-wrap">
                <button
                  onClick={() => setIsDriveModalOpen(true)}
                  className="px-3 py-2 bg-neutral-900 text-neutral-200 border border-neutral-800 hover:border-neutral-700 text-xs font-medium rounded-xs hover:bg-neutral-850 transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Configure Google Drive Image Storage"
                >
                  <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">Drive Storage</span>
                </button>

                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="px-3.5 py-2 bg-white text-neutral-950 text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-neutral-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New SKU</span>
                </button>

                <button
                  onClick={handleExportCsv}
                  className="px-3 py-2 bg-neutral-800 text-neutral-200 text-xs font-medium rounded-xs hover:bg-neutral-700 transition-colors flex items-center gap-1"
                  title="Export inventory to CSV"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>CSV</span>
                </button>

                <button
                  onClick={handleExportJson}
                  className="px-3 py-2 bg-neutral-800 text-neutral-200 text-xs font-medium rounded-xs hover:bg-neutral-700 transition-colors flex items-center gap-1"
                  title="Export inventory to JSON"
                >
                  <FileCode className="w-3.5 h-3.5" />
                  <span>JSON</span>
                </button>

                <button
                  onClick={() => setIsAdminPanelOpen(false)}
                  className="p-2 text-neutral-400 hover:text-white rounded-xs hover:bg-neutral-800 transition-colors ml-2 cursor-pointer"
                  aria-label="Close Admin Panel"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-neutral-200 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-800">
              <div className="p-4 bg-white dark:bg-neutral-900">
                <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold block">
                  Total Registered SKUs
                </span>
                <span className="text-2xl font-bold font-mono text-neutral-950 dark:text-white mt-1 block">
                  {stats.totalSkus}
                </span>
              </div>

              <div className="p-4 bg-white dark:bg-neutral-900">
                <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold block">
                  Total Physical Units
                </span>
                <span className="text-2xl font-bold font-mono text-neutral-950 dark:text-white mt-1 block">
                  {stats.totalUnits}
                </span>
              </div>

              <div className="p-4 bg-white dark:bg-neutral-900">
                <span className="text-[11px] uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold block flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Low Stock Alerts (&le;5 units)
                </span>
                <span className="text-2xl font-bold font-mono text-amber-600 dark:text-amber-400 mt-1 block">
                  {stats.lowStockSkus}
                </span>
              </div>

              <div className="p-4 bg-white dark:bg-neutral-900">
                <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold block">
                  Total Inventory Value
                </span>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-lg font-bold font-mono text-neutral-950 dark:text-white">
                    {formatPrice(stats.totalRetailValue)}
                  </span>
                  <span className="text-[10px] text-neutral-400 font-mono">
                    (Cost: {formatPrice(stats.totalCostValue)})
                  </span>
                </div>
              </div>
            </div>

            {/* Search & Filter Toolbar */}
            <div className="p-4 sm:p-5 bg-neutral-50 dark:bg-neutral-900/60 border-b border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-3">
              <div className="relative w-full md:w-96">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search by SKU code (e.g. SS26BSP152P2T) or Name..."
                  value={searchSku}
                  onChange={(e) => setSearchSku(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xs text-neutral-900 dark:text-white focus:outline-none focus:border-black"
                />
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
                {/* Category Filter */}
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="text-xs px-3 py-2 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xs text-neutral-800 dark:text-neutral-200"
                >
                  <option value="ALL">All Categories</option>
                  <option value="WOMEN">Women</option>
                  <option value="MEN">Men</option>
                  <option value="READY TO WEAR">Ready to Wear</option>
                  <option value="UNSTITCHED FABRIC">Unstitched Fabric</option>
                  <option value="HOME">Home</option>
                </select>

                {/* Stock Filter */}
                <select
                  value={filterStockStatus}
                  onChange={(e) => setFilterStockStatus(e.target.value as any)}
                  className="text-xs px-3 py-2 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xs text-neutral-800 dark:text-neutral-200"
                >
                  <option value="ALL">All Stock Levels</option>
                  <option value="LOW">Low Stock Only (&le;10)</option>
                  <option value="OUT">Out of Stock Only (0)</option>
                </select>

                <button
                  onClick={handleResetCatalog}
                  className="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white underline ml-auto md:ml-0"
                >
                  Reset Demo Data
                </button>
              </div>
            </div>

            {/* SKU Inventory Table */}
            <div className="flex-1 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 uppercase tracking-wider text-[10px] border-b border-neutral-200 dark:border-neutral-800">
                  <tr>
                    <th className="py-3 px-4">SKU / Code</th>
                    <th className="py-3 px-4">Item Name &amp; Photos</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4 text-center">Size Stock (XS · S · M · L · XL)</th>
                    <th className="py-3 px-4 text-right">Total Units</th>
                    <th className="py-3 px-4 text-right">Retail / Cost</th>
                    <th className="py-3 px-4">Warehouse</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                  {filteredProducts.map((p) => {
                    const totalUnits = p.sizes.reduce((sum, s) => sum + s.stock, 0);
                    const isLow = totalUnits > 0 && totalUnits <= 10;
                    const isOut = totalUnits === 0;

                    return (
                      <tr
                        key={p.sku}
                        className="hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors"
                      >
                        {/* SKU */}
                        <td className="py-3.5 px-4">
                          <span className="font-mono font-bold text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-xs border border-neutral-200 dark:border-neutral-700">
                            {p.sku}
                          </span>
                        </td>

                        {/* Product Name & Thumbnail */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="relative group">
                              <img
                                referrerPolicy="no-referrer"
                                src={p.images[0]}
                                alt={p.name}
                                className="w-10 h-12 object-cover rounded-xs border border-neutral-200 dark:border-neutral-800 shrink-0"
                              />
                              {p.images.length > 1 && (
                                <span className="absolute -bottom-1 -right-1 bg-black/80 text-white font-mono text-[8px] px-1 rounded">
                                  +{p.images.length - 1}
                                </span>
                              )}
                            </div>
                            <div>
                              <span className="font-medium text-neutral-900 dark:text-neutral-100 block max-w-xs line-clamp-1">
                                {p.name}
                              </span>
                              <span className="text-[10px] text-neutral-400">
                                {p.color} · {p.collection} · {p.images.length} {p.images.length === 1 ? 'photo' : 'photos'}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-400">
                          <span className="px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded text-[10px]">
                            {p.category}
                          </span>
                        </td>

                        {/* Stock by size matrix with +/- buttons */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center justify-center gap-1.5">
                            {(['XS', 'S', 'M', 'L', 'XL'] as ProductSize[]).map((sz) => {
                              const stockCount = p.sizes.find((s) => s.size === sz)?.stock ?? 0;
                              return (
                                <div
                                  key={sz}
                                  className={`flex flex-col items-center border rounded-xs p-1 text-[10px] min-w-[38px] ${
                                    stockCount === 0
                                      ? 'border-red-200 dark:border-red-950 bg-red-50/50 dark:bg-red-950/20 text-red-500'
                                      : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950'
                                  }`}
                                >
                                  <span className="font-bold">{sz}</span>
                                  <span className="font-mono">{stockCount}</span>
                                  <div className="flex gap-0.5 mt-0.5">
                                    <button
                                      onClick={() => handleStockAdjust(p.sku, sz, -1)}
                                      className="w-3.5 h-3.5 text-neutral-500 hover:text-black dark:hover:text-white flex items-center justify-center font-bold cursor-pointer"
                                      title="Decrease stock by 1"
                                    >
                                      -
                                    </button>
                                    <button
                                      onClick={() => handleStockAdjust(p.sku, sz, 1)}
                                      className="w-3.5 h-3.5 text-neutral-500 hover:text-black dark:hover:text-white flex items-center justify-center font-bold cursor-pointer"
                                      title="Increase stock by 1"
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </td>

                        {/* Total Units */}
                        <td className="py-3.5 px-4 text-right">
                          <span
                            className={`font-mono font-bold ${
                              isOut
                                ? 'text-red-600 dark:text-red-400'
                                : isLow
                                ? 'text-amber-600 dark:text-amber-400'
                                : 'text-neutral-900 dark:text-white'
                            }`}
                          >
                            {totalUnits}
                          </span>
                          {isLow && (
                            <span className="block text-[9px] text-amber-500 uppercase font-semibold">
                              Low
                            </span>
                          )}
                          {isOut && (
                            <span className="block text-[9px] text-red-500 uppercase font-semibold">
                              Out
                            </span>
                          )}
                        </td>

                        {/* Price / Cost */}
                        <td className="py-3.5 px-4 text-right font-mono">
                          <span className="font-bold text-neutral-950 dark:text-white block">
                            {formatPrice(p.price)}
                          </span>
                          <span className="text-[10px] text-neutral-400 block">
                            Cost: {formatPrice(p.costPrice || p.price * 0.5)}
                          </span>
                        </td>

                        {/* Warehouse Location */}
                        <td className="py-3.5 px-4 text-neutral-500 font-mono text-[11px]">
                          {p.warehouseLocation || 'WH-MAIN'}
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenEdit(p)}
                              className="p-1.5 text-neutral-500 hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
                              title="Edit SKU & Product Photos"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                setIsAdminPanelOpen(false);
                                openProductDetail(p);
                              }}
                              className="p-1.5 text-neutral-500 hover:text-neutral-900 dark:hover:text-white cursor-pointer"
                              title="Preview on Live Store"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteSku(p.sku)}
                              className="p-1.5 text-neutral-400 hover:text-red-600 transition-colors cursor-pointer"
                              title="Delete SKU"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Backend Developer Integration Blueprint */}
            <div className="p-4 sm:p-5 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
              <button
                onClick={() => setShowApiDocs(!showApiDocs)}
                className="flex items-center justify-between w-full text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-amber-500" />
                  <span>Cloud Storage &amp; REST Endpoints Architecture</span>
                </div>
                {showApiDocs ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showApiDocs && (
                <div className="mt-3 p-4 bg-neutral-900 text-neutral-300 rounded-xs font-mono text-[11px] space-y-2 border border-neutral-800">
                  <p className="text-amber-400 font-bold">
                    // Zero-Cost Google Drive Storage + Firestore Flow:
                  </p>
                  <p className="text-neutral-400">
                    1. Frontend drags &amp; drops high-resolution photos into Admin SKU panel.
                    <br />
                    2. Images stream to Google Apps Script Webhook &rarr; saved into your Google Drive folder.
                    <br />
                    3. Public high-speed CDN URLs (<code className="text-emerald-300">https://lh3.googleusercontent.com/d/FILE_ID</code>) are synced atomically into Firestore product records.
                  </p>
                  <div className="bg-neutral-950 p-2.5 rounded border border-neutral-800 space-y-1 text-emerald-400">
                    <p>POST &nbsp;Google Apps Script &nbsp;→ Uploads raw binary &amp; returns CDN URL</p>
                    <p>POST &nbsp;Firestore 'products' → Saves product details with images array</p>
                    <p>PATCH Firestore 'products' → Updates stock &amp; photo galleries</p>
                  </div>
                </div>
              )}
            </div>

          </motion.div>
        </div>

        {/* "Add New SKU Product" Modal */}
        <AnimatePresence>
          {isAddModalOpen && (
            <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsAddModalOpen(false)}
                className="fixed inset-0 bg-black/70 backdrop-blur-xs"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-xs shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden"
              >
                <div className="flex items-center justify-between p-4 sm:p-5 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-950 text-white">
                <div className="flex items-center gap-2">
                  <Boxes className="w-4 h-4 text-amber-400" />
                  <h3 className="font-bold text-sm tracking-wider uppercase">
                    Register New SKU to Inventory
                  </h3>
                </div>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-neutral-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateProduct} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                {/* SKU & Generator */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                      SKU Code (Stock Keeping Unit) *
                    </label>
                    <button
                      type="button"
                      onClick={generateAutoSku}
                      className="text-[11px] text-amber-600 dark:text-amber-400 hover:underline cursor-pointer"
                    >
                      Auto-Generate SKU
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SS26BSP990P2T"
                    value={newSku}
                    onChange={(e) => setNewSku(e.target.value.toUpperCase())}
                    className="w-full px-3 py-2 text-xs font-mono uppercase bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xs text-neutral-900 dark:text-white focus:outline-none focus:border-black"
                  />
                </div>

                {/* Product Name */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                    Product Name / Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Stitched Silk Jacquard Kurta &amp; Tulip Trouser"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xs text-neutral-900 dark:text-white focus:outline-none focus:border-black"
                  />
                </div>

                {/* Category & Collection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                      Category *
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xs text-neutral-900 dark:text-white"
                    >
                      <option value="READY TO WEAR">Ready to Wear</option>
                      <option value="WOMEN">Women</option>
                      <option value="MEN">Men</option>
                      <option value="UNSTITCHED FABRIC">Unstitched Fabric</option>
                      <option value="HOME">Home</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                      Fabric Type Tag *
                    </label>
                    <select
                      value={newFabricTag}
                      onChange={(e) => setNewFabricTag(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xs text-neutral-900 dark:text-white"
                    >
                      <option value="Linen">Linen</option>
                      <option value="Khaddar">Khaddar</option>
                      <option value="Karandi">Karandi</option>
                      <option value="Marina">Marina</option>
                      <option value="Jacquard">Jacquard</option>
                      <option value="Pashmina">Pashmina</option>
                      <option value="Wool">Wool</option>
                      <option value="Printed silk">Printed silk</option>
                      <option value="Lawn">Lawn</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                    Collection / Season
                  </label>
                  <input
                    type="text"
                    value={newCollection}
                    onChange={(e) => setNewCollection(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xs text-neutral-900 dark:text-white"
                  />
                </div>

                {/* Pricing (Retail, Original, Cost) */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                      Retail Price (PKR) *
                    </label>
                    <input
                      type="number"
                      required
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-mono bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xs text-neutral-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                      Original Price (PKR)
                    </label>
                    <input
                      type="number"
                      value={newOriginalPrice}
                      onChange={(e) => setNewOriginalPrice(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-mono bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xs text-neutral-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                      Cost Price (PKR)
                    </label>
                    <input
                      type="number"
                      value={newCostPrice}
                      onChange={(e) => setNewCostPrice(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-mono bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xs text-neutral-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Size Stock Allocation */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
                    Initial Stock Breakdown per Size *
                  </label>
                  <div className="grid grid-cols-5 gap-2 text-center text-xs">
                    <div>
                      <span className="block text-[11px] font-bold mb-1">XS</span>
                      <input
                        type="number"
                        value={newStockXS}
                        onChange={(e) => setNewStockXS(e.target.value)}
                        className="w-full text-center py-1.5 font-mono bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xs"
                      />
                    </div>
                    <div>
                      <span className="block text-[11px] font-bold mb-1">S</span>
                      <input
                        type="number"
                        value={newStockS}
                        onChange={(e) => setNewStockS(e.target.value)}
                        className="w-full text-center py-1.5 font-mono bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xs"
                      />
                    </div>
                    <div>
                      <span className="block text-[11px] font-bold mb-1">M</span>
                      <input
                        type="number"
                        value={newStockM}
                        onChange={(e) => setNewStockM(e.target.value)}
                        className="w-full text-center py-1.5 font-mono bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xs"
                      />
                    </div>
                    <div>
                      <span className="block text-[11px] font-bold mb-1">L</span>
                      <input
                        type="number"
                        value={newStockL}
                        onChange={(e) => setNewStockL(e.target.value)}
                        className="w-full text-center py-1.5 font-mono bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xs"
                      />
                    </div>
                    <div>
                      <span className="block text-[11px] font-bold mb-1">XL</span>
                      <input
                        type="number"
                        value={newStockXL}
                        onChange={(e) => setNewStockXL(e.target.value)}
                        className="w-full text-center py-1.5 font-mono bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Color & Warehouse Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                      Color Name
                    </label>
                    <input
                      type="text"
                      value={newColor}
                      onChange={(e) => setNewColor(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xs text-neutral-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                      Warehouse Bin / Shelf Location
                    </label>
                    <input
                      type="text"
                      value={newWarehouse}
                      onChange={(e) => setNewWarehouse(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-mono bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xs text-neutral-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Drag & Drop Photos Uploader (Google Drive Cloud Storage) */}
                <div className="pt-2">
                  <ImageUploadDropzone
                    images={newImages}
                    onChange={setNewImages}
                    onOpenConfig={() => setIsDriveModalOpen(true)}
                  />
                </div>

                {/* Fabric */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                    Fabric Description
                  </label>
                  <input
                    type="text"
                    value={newFabric}
                    onChange={(e) => setNewFabric(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xs text-neutral-900 dark:text-white"
                  />
                </div>

                {/* Submit Buttons */}
                <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 border border-neutral-300 dark:border-neutral-700 text-xs font-semibold rounded-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs font-semibold uppercase tracking-wider rounded-xs hover:opacity-90 cursor-pointer"
                  >
                    Save &amp; Stock SKU
                  </button>
                </div>
              </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* "Edit SKU Product" Modal */}
        <AnimatePresence>
          {isEditModalOpen && editingProduct && (
            <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsEditModalOpen(false)}
                className="fixed inset-0 bg-black/70 backdrop-blur-xs"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-xs shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden"
              >
                <div className="flex items-center justify-between p-4 sm:p-5 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-950 text-white">
                  <div className="flex items-center gap-2">
                    <Edit className="w-4 h-4 text-amber-400" />
                    <h3 className="font-bold text-sm tracking-wider uppercase">
                      Edit SKU Catalog Item: {editingProduct.sku}
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsEditModalOpen(false)}
                    className="text-neutral-400 hover:text-white cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveEditProduct} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                  {/* SKU & Product Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                        SKU Code *
                      </label>
                      <input
                        type="text"
                        required
                        value={editSku}
                        onChange={(e) => setEditSku(e.target.value.toUpperCase())}
                        className="w-full px-3 py-2 text-xs font-mono uppercase bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xs text-neutral-900 dark:text-white focus:outline-none focus:border-black"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                        Product Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xs text-neutral-900 dark:text-white focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>

                  {/* Category & Fabric Tag */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                        Category *
                      </label>
                      <select
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value as any)}
                        className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xs text-neutral-900 dark:text-white"
                      >
                        <option value="READY TO WEAR">Ready to Wear</option>
                        <option value="WOMEN">Women</option>
                        <option value="MEN">Men</option>
                        <option value="UNSTITCHED FABRIC">Unstitched Fabric</option>
                        <option value="HOME">Home</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                        Fabric Type Tag *
                      </label>
                      <select
                        value={editFabricTag}
                        onChange={(e) => setEditFabricTag(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xs text-neutral-900 dark:text-white"
                      >
                        <option value="Linen">Linen</option>
                        <option value="Khaddar">Khaddar</option>
                        <option value="Karandi">Karandi</option>
                        <option value="Marina">Marina</option>
                        <option value="Jacquard">Jacquard</option>
                        <option value="Pashmina">Pashmina</option>
                        <option value="Wool">Wool</option>
                        <option value="Printed silk">Printed silk</option>
                        <option value="Lawn">Lawn</option>
                      </select>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                        Retail Price (PKR) *
                      </label>
                      <input
                        type="number"
                        required
                        value={editPrice}
                        onChange={(e) => setEditPrice(e.target.value)}
                        className="w-full px-3 py-2 text-xs font-mono bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xs text-neutral-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                        Original Price (PKR)
                      </label>
                      <input
                        type="number"
                        value={editOriginalPrice}
                        onChange={(e) => setEditOriginalPrice(e.target.value)}
                        className="w-full px-3 py-2 text-xs font-mono bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xs text-neutral-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                        Cost Price (PKR)
                      </label>
                      <input
                        type="number"
                        value={editCostPrice}
                        onChange={(e) => setEditCostPrice(e.target.value)}
                        className="w-full px-3 py-2 text-xs font-mono bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xs text-neutral-900 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Stock breakdown */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
                      Stock per Size
                    </label>
                    <div className="grid grid-cols-5 gap-2 text-center text-xs">
                      <div>
                        <span className="block text-[11px] font-bold mb-1">XS</span>
                        <input
                          type="number"
                          value={editStockXS}
                          onChange={(e) => setEditStockXS(e.target.value)}
                          className="w-full text-center py-1.5 font-mono bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xs"
                        />
                      </div>
                      <div>
                        <span className="block text-[11px] font-bold mb-1">S</span>
                        <input
                          type="number"
                          value={editStockS}
                          onChange={(e) => setEditStockS(e.target.value)}
                          className="w-full text-center py-1.5 font-mono bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xs"
                        />
                      </div>
                      <div>
                        <span className="block text-[11px] font-bold mb-1">M</span>
                        <input
                          type="number"
                          value={editStockM}
                          onChange={(e) => setEditStockM(e.target.value)}
                          className="w-full text-center py-1.5 font-mono bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xs"
                        />
                      </div>
                      <div>
                        <span className="block text-[11px] font-bold mb-1">L</span>
                        <input
                          type="number"
                          value={editStockL}
                          onChange={(e) => setEditStockL(e.target.value)}
                          className="w-full text-center py-1.5 font-mono bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xs"
                        />
                      </div>
                      <div>
                        <span className="block text-[11px] font-bold mb-1">XL</span>
                        <input
                          type="number"
                          value={editStockXL}
                          onChange={(e) => setEditStockXL(e.target.value)}
                          className="w-full text-center py-1.5 font-mono bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xs"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Drag & Drop Photos */}
                  <div className="pt-2">
                    <ImageUploadDropzone
                      images={editImages}
                      onChange={setEditImages}
                      onOpenConfig={() => setIsDriveModalOpen(true)}
                    />
                  </div>

                  {/* Color & Collection */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                        Color Name
                      </label>
                      <input
                        type="text"
                        value={editColor}
                        onChange={(e) => setEditColor(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xs text-neutral-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                        Collection / Season
                      </label>
                      <input
                        type="text"
                        value={editCollection}
                        onChange={(e) => setEditCollection(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xs text-neutral-900 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Submit Buttons */}
                  <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsEditModalOpen(false)}
                      className="px-4 py-2 border border-neutral-300 dark:border-neutral-700 text-xs font-semibold rounded-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs font-semibold uppercase tracking-wider rounded-xs hover:opacity-90 cursor-pointer"
                    >
                      Update &amp; Save Changes
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    )}
  </AnimatePresence>

  {/* Google Drive Configuration Setup Modal */}
  <GoogleDriveConfigModal
    isOpen={isDriveModalOpen}
    onClose={() => setIsDriveModalOpen(false)}
    onSaved={() => showToast('Google Drive cloud storage credentials saved!')}
  />
</>
);
};
