import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Plus, Filter, Download, Eye, Edit2 } from 'lucide-react';
import { ProductModal } from './ProductModal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface ProductListProps {
  searchQuery: string;
  currentWarehouse: string;
  onViewProduct: (id: string) => void;
}

// Mock product data
const products = [
  { id: '1', name: 'Industrial Drill Bits Set', sku: 'SKU-1234', category: 'Tools', stock: 150, minStock: 50, unit: 'sets', status: 'in-stock' },
  { id: '2', name: 'Safety Helmets', sku: 'SKU-5678', category: 'Safety Equipment', stock: 8, minStock: 25, unit: 'pcs', status: 'low-stock' },
  { id: '3', name: 'Cable Rolls (100m)', sku: 'SKU-9012', category: 'Electrical', stock: 3, minStock: 10, unit: 'rolls', status: 'low-stock' },
  { id: '4', name: 'Paint Cans (5L)', sku: 'SKU-3456', category: 'Supplies', stock: 0, minStock: 20, unit: 'cans', status: 'out-of-stock' },
  { id: '5', name: 'Work Gloves', sku: 'SKU-7890', category: 'Safety Equipment', stock: 200, minStock: 100, unit: 'pairs', status: 'in-stock' },
  { id: '6', name: 'LED Bulbs Pack', sku: 'SKU-2345', category: 'Electrical', stock: 85, minStock: 30, unit: 'packs', status: 'in-stock' },
  { id: '7', name: 'Measuring Tape', sku: 'SKU-6789', category: 'Tools', stock: 45, minStock: 20, unit: 'pcs', status: 'in-stock' },
  { id: '8', name: 'Steel Pipes (2m)', sku: 'SKU-0123', category: 'Materials', stock: 12, minStock: 15, unit: 'pcs', status: 'low-stock' },
];

const categories = ['All Categories', 'Tools', 'Safety Equipment', 'Electrical', 'Supplies', 'Materials'];
const statuses = ['All Statuses', 'in-stock', 'low-stock', 'out-of-stock'];

export function ProductList({ searchQuery, currentWarehouse, onViewProduct }: ProductListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<typeof products[0] | null>(null);
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All Categories' || product.category === categoryFilter;
    const matchesStatus = statusFilter === 'All Statuses' || product.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });
  
  const handleEdit = (product: typeof products[0]) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in-stock':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">In Stock</Badge>;
      case 'low-stock':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Low Stock</Badge>;
      case 'out-of-stock':
        return <Badge variant="destructive">Out of Stock</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-gray-900 mb-1">Products</h1>
          <p className="text-gray-600">Manage your product catalog and inventory</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>
      
      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3 flex-wrap">
            <Filter className="w-4 h-4 text-gray-500" />
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status === 'All Statuses' ? status : status.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {(categoryFilter !== 'All Categories' || statusFilter !== 'All Statuses') && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  setCategoryFilter('All Categories');
                  setStatusFilter('All Statuses');
                }}
              >
                Clear Filters
              </Button>
            )}
            <span className="text-sm text-gray-600 ml-auto">
              {filteredProducts.length} products
            </span>
          </div>
        </CardContent>
      </Card>
      
      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-base mb-1">{product.name}</CardTitle>
                  <p className="text-sm text-gray-500">{product.sku}</p>
                </div>
                {getStatusBadge(product.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-500">Category</p>
                  <p className="text-gray-900">{product.category}</p>
                </div>
                <div>
                  <p className="text-gray-500">Stock</p>
                  <p className="text-gray-900">{product.stock} {product.unit}</p>
                </div>
              </div>
              
              {/* Stock Level Bar */}
              <div>
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Stock Level</span>
                  <span>{Math.round((product.stock / (product.minStock * 2)) * 100)}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      product.stock === 0 ? 'bg-red-500' :
                      product.stock < product.minStock ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${Math.min((product.stock / (product.minStock * 2)) * 100, 100)}%` }}
                  />
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => onViewProduct(product.id)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleEdit(product)}
                >
                  <Edit2 className="w-4 h-4 mr-1" />
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-gray-500">No products found matching your filters.</p>
          </CardContent>
        </Card>
      )}
      
      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        product={editingProduct}
      />
    </div>
  );
}
