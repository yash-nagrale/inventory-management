import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Plus, Trash2, Save, Send } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Badge } from '../ui/badge';

interface AdjustmentFormProps {
  currentWarehouse: string;
}

interface AdjustmentItem {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  currentStock: number;
  adjustmentType: 'increase' | 'decrease';
  quantity: string;
  unit: string;
  reason: string;
}

const products = [
  { id: '1', name: 'Industrial Drill Bits Set', sku: 'SKU-1234', unit: 'sets', stock: 150 },
  { id: '2', name: 'Safety Helmets', sku: 'SKU-5678', unit: 'pcs', stock: 8 },
  { id: '3', name: 'Cable Rolls (100m)', sku: 'SKU-9012', unit: 'rolls', stock: 3 },
  { id: '4', name: 'Work Gloves', sku: 'SKU-7890', unit: 'pairs', stock: 200 },
  { id: '5', name: 'LED Bulbs Pack', sku: 'SKU-2345', unit: 'packs', stock: 85 },
];

const reasons = [
  'Damaged goods',
  'Expired items',
  'Inventory count correction',
  'Product recall',
  'Quality control issue',
  'Other',
];

export function AdjustmentForm({ currentWarehouse }: AdjustmentFormProps) {
  const [adjustmentNumber] = useState(`ADJ-${Date.now().toString().slice(-6)}`);
  const [adjustmentDate, setAdjustmentDate] = useState('');
  const [notes, setNotes] = useState('');
  const [items, setItems] = useState<AdjustmentItem[]>([
    { 
      id: '1', 
      productId: '', 
      productName: '', 
      sku: '', 
      currentStock: 0,
      adjustmentType: 'decrease',
      quantity: '', 
      unit: '',
      reason: ''
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const addItem = () => {
    setItems([...items, { 
      id: Date.now().toString(), 
      productId: '', 
      productName: '', 
      sku: '', 
      currentStock: 0,
      adjustmentType: 'decrease',
      quantity: '', 
      unit: '',
      reason: ''
    }]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: string, field: string, value: string) => {
    setItems(items.map(item => {
      if (item.id === id) {
        if (field === 'productId') {
          const product = products.find(p => p.id === value);
          if (product) {
            return {
              ...item,
              productId: value,
              productName: product.name,
              sku: product.sku,
              currentStock: product.stock,
              unit: product.unit
            };
          }
        }
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  const handleSubmit = (status: 'draft' | 'submitted') => {
    if (!adjustmentDate) {
      toast.error('Please select adjustment date');
      return;
    }

    const hasInvalidItems = items.some(item => !item.productId || !item.quantity || !item.reason);
    if (hasInvalidItems) {
      toast.error('Please complete all item details including reason');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success(status === 'draft' ? 'Adjustment saved as draft' : 'Stock adjustment submitted successfully');
      
      // Reset form
      setAdjustmentDate('');
      setNotes('');
      setItems([{ 
        id: '1', 
        productId: '', 
        productName: '', 
        sku: '', 
        currentStock: 0,
        adjustmentType: 'decrease',
        quantity: '', 
        unit: '',
        reason: ''
      }]);
    }, 1000);
  };

  const calculateNewStock = (item: AdjustmentItem) => {
    const qty = parseInt(item.quantity) || 0;
    if (item.adjustmentType === 'increase') {
      return item.currentStock + qty;
    } else {
      return Math.max(0, item.currentStock - qty);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Page Header */}
      <div>
        <h1 className="text-gray-900 mb-1">Stock Adjustment</h1>
        <p className="text-gray-600">Adjust inventory levels for discrepancies</p>
      </div>

      {/* Adjustment Info */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Adjustment Information</CardTitle>
            <Badge variant="secondary">{adjustmentNumber}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="adjustmentDate">Adjustment Date *</Label>
              <Input
                id="adjustmentDate"
                type="date"
                value={adjustmentDate}
                onChange={(e) => setAdjustmentDate(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">General Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any relevant notes about this adjustment..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={isLoading}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Items */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Adjustments</CardTitle>
          <Button onClick={addItem} variant="outline" size="sm" disabled={isLoading}>
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {items.map((item, index) => {
              const newStock = calculateNewStock(item);
              
              return (
                <div key={item.id} className="p-4 border border-gray-200 rounded-lg space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Item {index + 1}</span>
                    {items.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        disabled={isLoading}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>Product *</Label>
                      <Select
                        value={item.productId}
                        onValueChange={(value) => updateItem(item.id, 'productId', value)}
                        disabled={isLoading}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select product" />
                        </SelectTrigger>
                        <SelectContent>
                          {products.map((product) => (
                            <SelectItem key={product.id} value={product.id}>
                              {product.name} ({product.sku})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {item.productId && (
                        <p className="text-xs text-gray-500">
                          Current stock: {item.currentStock} {item.unit}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Adjustment Type *</Label>
                      <Select
                        value={item.adjustmentType}
                        onValueChange={(value) => updateItem(item.id, 'adjustmentType', value)}
                        disabled={isLoading}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="increase">Increase Stock</SelectItem>
                          <SelectItem value="decrease">Decrease Stock</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>Quantity *</Label>
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          placeholder="0"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
                          disabled={isLoading}
                          className="flex-1"
                        />
                        {item.unit && (
                          <div className="flex items-center px-3 bg-gray-100 rounded-md text-sm text-gray-600">
                            {item.unit}
                          </div>
                        )}
                      </div>
                      {item.productId && item.quantity && (
                        <p className="text-xs text-gray-600">
                          New stock will be: <span className={newStock < item.currentStock ? 'text-red-600' : 'text-green-600'}>
                            {newStock} {item.unit}
                          </span>
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Reason *</Label>
                      <Select
                        value={item.reason}
                        onValueChange={(value) => updateItem(item.id, 'reason', value)}
                        disabled={isLoading}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select reason" />
                        </SelectTrigger>
                        <SelectContent>
                          {reasons.map((reason) => (
                            <SelectItem key={reason} value={reason}>
                              {reason}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex items-center gap-3 justify-end">
        <Button variant="outline" onClick={() => handleSubmit('draft')} disabled={isLoading}>
          <Save className="w-4 h-4 mr-2" />
          Save as Draft
        </Button>
        <Button 
          onClick={() => handleSubmit('submitted')} 
          className="bg-indigo-600 hover:bg-indigo-700"
          disabled={isLoading}
        >
          <Send className="w-4 h-4 mr-2" />
          {isLoading ? 'Submitting...' : 'Submit Adjustment'}
        </Button>
      </div>
    </div>
  );
}
