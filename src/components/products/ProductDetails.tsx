import { ArrowLeft, Edit2, TrendingUp, TrendingDown, Package } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

interface ProductDetailsProps {
  productId: string;
  onBack: () => void;
}

// Mock product data with location details
const productData = {
  id: '1',
  name: 'Industrial Drill Bits Set',
  sku: 'SKU-1234',
  category: 'Tools',
  unit: 'sets',
  minStock: 50,
  totalStock: 385,
  stockByLocation: [
    { location: 'Main Warehouse - NY', stock: 150, lastUpdated: '2 hours ago' },
    { location: 'Distribution Center - LA', stock: 125, lastUpdated: '5 hours ago' },
    { location: 'Storage Facility - TX', stock: 85, lastUpdated: '1 day ago' },
    { location: 'Regional Hub - FL', stock: 25, lastUpdated: '2 days ago' },
  ],
  recentMovements: [
    { id: '1', type: 'receipt', quantity: 50, location: 'Main Warehouse - NY', date: '2024-11-20', reference: 'RCP-001234' },
    { id: '2', type: 'delivery', quantity: -30, location: 'Distribution Center - LA', date: '2024-11-19', reference: 'DLV-005678' },
    { id: '3', type: 'transfer', quantity: -20, location: 'Main Warehouse - NY', date: '2024-11-18', reference: 'TRF-002345' },
    { id: '4', type: 'transfer', quantity: 20, location: 'Regional Hub - FL', date: '2024-11-18', reference: 'TRF-002345' },
    { id: '5', type: 'adjustment', quantity: 5, location: 'Storage Facility - TX', date: '2024-11-17', reference: 'ADJ-000123' },
  ],
};

export function ProductDetails({ productId, onBack }: ProductDetailsProps) {
  const product = productData;
  
  const getMovementIcon = (type: string, quantity: number) => {
    if (quantity > 0) {
      return <TrendingUp className="w-4 h-4 text-green-600" />;
    } else {
      return <TrendingDown className="w-4 h-4 text-red-600" />;
    }
  };
  
  const getMovementBadge = (type: string) => {
    const types: Record<string, { label: string; className: string }> = {
      receipt: { label: 'Receipt', className: 'bg-blue-100 text-blue-800' },
      delivery: { label: 'Delivery', className: 'bg-green-100 text-green-800' },
      transfer: { label: 'Transfer', className: 'bg-purple-100 text-purple-800' },
      adjustment: { label: 'Adjustment', className: 'bg-orange-100 text-orange-800' },
    };
    
    const config = types[type] || types.adjustment;
    return <Badge className={`${config.className} hover:${config.className}`}>{config.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-gray-900 mb-1">{product.name}</h1>
            <p className="text-gray-600">{product.sku}</p>
          </div>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <Edit2 className="w-4 h-4 mr-2" />
          Edit Product
        </Button>
      </div>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Category</p>
              <p className="text-xl text-gray-900">{product.category}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Total Stock</p>
              <p className="text-xl text-gray-900">{product.totalStock} {product.unit}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Min Stock Level</p>
              <p className="text-xl text-gray-900">{product.minStock} {product.unit}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Status</p>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">In Stock</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stock by Location */}
        <Card>
          <CardHeader>
            <CardTitle>Stock by Location</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {product.stockByLocation.map((location, index) => (
                <div key={index} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Package className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-900">{location.location}</p>
                        <p className="text-xs text-gray-500">Updated {location.lastUpdated}</p>
                      </div>
                    </div>
                    <p className="text-gray-900">{location.stock} {product.unit}</p>
                  </div>
                  <div className="ml-13">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          location.stock < product.minStock ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min((location.stock / 200) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Movements */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Movements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {product.recentMovements.map((movement) => (
                <div key={movement.id} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    {getMovementIcon(movement.type, movement.quantity)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {getMovementBadge(movement.type)}
                      <span className={`text-sm ${movement.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {movement.quantity > 0 ? '+' : ''}{movement.quantity} {product.unit}
                      </span>
                    </div>
                    <p className="text-sm text-gray-900">{movement.location}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {movement.reference} • {movement.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
