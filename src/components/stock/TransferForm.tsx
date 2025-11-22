import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Plus, Trash2, Save, Send, ArrowRight } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Badge } from '../ui/badge';

interface TransferFormProps {
  currentWarehouse: string;
}

interface TransferItem {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  availableStock: number;
  quantity: string;
  unit: string;
}

const warehouses = [
  { id: 'warehouse-1', name: 'Main Warehouse - NY' },
  { id: 'warehouse-2', name: 'Distribution Center - LA' },
  { id: 'warehouse-3', name: 'Storage Facility - TX' },
  { id: 'warehouse-4', name: 'Regional Hub - FL' },
];

const products = [
  { id: '1', name: 'Industrial Drill Bits Set', sku: 'SKU-1234', unit: 'sets', stock: 150 },
  { id: '2', name: 'Safety Helmets', sku: 'SKU-5678', unit: 'pcs', stock: 8 },
  { id: '3', name: 'Work Gloves', sku: 'SKU-7890', unit: 'pairs', stock: 200 },
  { id: '4', name: 'LED Bulbs Pack', sku: 'SKU-2345', unit: 'packs', stock: 85 },
];

export function TransferForm({ currentWarehouse }: TransferFormProps) {
  const [transferNumber] = useState(`TRF-${Date.now().toString().slice(-6)}`);
  const [fromWarehouse, setFromWarehouse] = useState(currentWarehouse);
  const [toWarehouse, setToWarehouse] = useState('');
  const [transferDate, setTransferDate] = useState('');
  const [notes, setNotes] = useState('');
  const [items, setItems] = useState<TransferItem[]>([
    { id: '1', productId: '', productName: '', sku: '', availableStock: 0, quantity: '', unit: '' }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const addItem = () => {
    setItems([...items, { 
      id: Date.now().toString(), 
      productId: '', 
      productName: '', 
      sku: '', 
      availableStock: 0,
      quantity: '', 
      unit: '' 
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
              availableStock: product.stock,
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
    if (!fromWarehouse || !toWarehouse || !transferDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (fromWarehouse === toWarehouse) {
      toast.error('Source and destination warehouses must be different');
      return;
    }

    const hasInvalidItems = items.some(item => !item.productId || !item.quantity);
    if (hasInvalidItems) {
      toast.error('Please complete all item details');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success(status === 'draft' ? 'Transfer saved as draft' : 'Transfer order submitted successfully');
      
      // Reset form
      setToWarehouse('');
      setTransferDate('');
      setNotes('');
      setItems([{ id: '1', productId: '', productName: '', sku: '', availableStock: 0, quantity: '', unit: '' }]);
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Page Header */}
      <div>
        <h1 className="text-gray-900 mb-1">Internal Transfer</h1>
        <p className="text-gray-600">Transfer stock between warehouses</p>
      </div>

      {/* Transfer Info */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Transfer Information</CardTitle>
            <Badge variant="secondary">{transferNumber}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="space-y-2">
              <Label htmlFor="fromWarehouse">From Warehouse *</Label>
              <Select
                value={fromWarehouse}
                onValueChange={setFromWarehouse}
                disabled={isLoading}
              >
                <SelectTrigger id="fromWarehouse">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {warehouses.map((warehouse) => (
                    <SelectItem key={warehouse.id} value={warehouse.id}>
                      {warehouse.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex justify-center">
              <ArrowRight className="w-6 h-6 text-gray-400" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="toWarehouse">To Warehouse *</Label>
              <Select
                value={toWarehouse}
                onValueChange={setToWarehouse}
                disabled={isLoading}
              >
                <SelectTrigger id="toWarehouse">
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  {warehouses
                    .filter(w => w.id !== fromWarehouse)
                    .map((warehouse) => (
                      <SelectItem key={warehouse.id} value={warehouse.id}>
                        {warehouse.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="transferDate">Transfer Date *</Label>
              <Input
                id="transferDate"
                type="date"
                value={transferDate}
                onChange={(e) => setTransferDate(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any relevant notes..."
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
          <CardTitle>Items to Transfer</CardTitle>
          <Button onClick={addItem} variant="outline" size="sm" disabled={isLoading}>
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {items.map((item, index) => (
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
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="md:col-span-2 space-y-2">
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
                            {product.name} ({product.sku}) - Available: {product.stock}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {item.productId && (
                      <p className="text-xs text-gray-500">
                        Available at source: {item.availableStock} {item.unit}
                      </p>
                    )}
                  </div>
                  
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
                  </div>
                </div>
              </div>
            ))}
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
          {isLoading ? 'Submitting...' : 'Submit Transfer'}
        </Button>
      </div>
    </div>
  );
}
