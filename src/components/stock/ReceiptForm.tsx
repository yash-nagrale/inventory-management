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

interface ReceiptFormProps {
  currentWarehouse: string;
}

interface ReceiptItem {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  quantity: string;
  unit: string;
}

const products = [
  { id: '1', name: 'Industrial Drill Bits Set', sku: 'SKU-1234', unit: 'sets' },
  { id: '2', name: 'Safety Helmets', sku: 'SKU-5678', unit: 'pcs' },
  { id: '3', name: 'Cable Rolls (100m)', sku: 'SKU-9012', unit: 'rolls' },
  { id: '4', name: 'Paint Cans (5L)', sku: 'SKU-3456', unit: 'cans' },
  { id: '5', name: 'Work Gloves', sku: 'SKU-7890', unit: 'pairs' },
];

export function ReceiptForm({ currentWarehouse }: ReceiptFormProps) {
  const [receiptNumber] = useState(`RCP-${Date.now().toString().slice(-6)}`);
  const [supplier, setSupplier] = useState('');
  const [expectedDate, setExpectedDate] = useState('');
  const [notes, setNotes] = useState('');
  const [items, setItems] = useState<ReceiptItem[]>([
    { id: '1', productId: '', productName: '', sku: '', quantity: '', unit: '' }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const addItem = () => {
    setItems([...items, { 
      id: Date.now().toString(), 
      productId: '', 
      productName: '', 
      sku: '', 
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
    if (!supplier || !expectedDate) {
      toast.error('Please fill in supplier and expected date');
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
      toast.success(status === 'draft' ? 'Receipt saved as draft' : 'Receipt submitted successfully');
      
      // Reset form
      setSupplier('');
      setExpectedDate('');
      setNotes('');
      setItems([{ id: '1', productId: '', productName: '', sku: '', quantity: '', unit: '' }]);
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Page Header */}
      <div>
        <h1 className="text-gray-900 mb-1">New Receipt</h1>
        <p className="text-gray-600">Record incoming goods to your warehouse</p>
      </div>

      {/* Receipt Info */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Receipt Information</CardTitle>
            <Badge variant="secondary">{receiptNumber}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="supplier">Supplier *</Label>
              <Input
                id="supplier"
                placeholder="Enter supplier name"
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="expectedDate">Expected Date *</Label>
              <Input
                id="expectedDate"
                type="date"
                value={expectedDate}
                onChange={(e) => setExpectedDate(e.target.value)}
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
          <CardTitle>Items</CardTitle>
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
                            {product.name} ({product.sku})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
          {isLoading ? 'Submitting...' : 'Submit Receipt'}
        </Button>
      </div>
    </div>
  );
}
