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
import { Alert, AlertDescription } from '../ui/alert';
import { AlertCircle } from 'lucide-react';

interface DeliveryFormProps {
  currentWarehouse: string;
}

interface DeliveryItem {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  availableStock: number;
  quantity: string;
  unit: string;
}

const products = [
  { id: '1', name: 'Industrial Drill Bits Set', sku: 'SKU-1234', unit: 'sets', stock: 150 },
  { id: '2', name: 'Safety Helmets', sku: 'SKU-5678', unit: 'pcs', stock: 8 },
  { id: '3', name: 'Cable Rolls (100m)', sku: 'SKU-9012', unit: 'rolls', stock: 3 },
  { id: '5', name: 'Work Gloves', sku: 'SKU-7890', unit: 'pairs', stock: 200 },
];

export function DeliveryForm({ currentWarehouse }: DeliveryFormProps) {
  const [deliveryNumber] = useState(`DLV-${Date.now().toString().slice(-6)}`);
  const [customer, setCustomer] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [items, setItems] = useState<DeliveryItem[]>([
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

  const hasStockIssues = () => {
    return items.some(item => {
      const qty = parseInt(item.quantity);
      return item.productId && qty > item.availableStock;
    });
  };

  const handleSubmit = (status: 'draft' | 'submitted') => {
    if (!customer || !deliveryDate || !shippingAddress) {
      toast.error('Please fill in all required fields');
      return;
    }

    const hasInvalidItems = items.some(item => !item.productId || !item.quantity);
    if (hasInvalidItems) {
      toast.error('Please complete all item details');
      return;
    }

    if (hasStockIssues()) {
      toast.error('Some items have insufficient stock');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success(status === 'draft' ? 'Delivery saved as draft' : 'Delivery order submitted successfully');
      
      // Reset form
      setCustomer('');
      setDeliveryDate('');
      setShippingAddress('');
      setNotes('');
      setItems([{ id: '1', productId: '', productName: '', sku: '', availableStock: 0, quantity: '', unit: '' }]);
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Page Header */}
      <div>
        <h1 className="text-gray-900 mb-1">New Delivery Order</h1>
        <p className="text-gray-600">Create outgoing delivery order</p>
      </div>

      {/* Delivery Info */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Delivery Information</CardTitle>
            <Badge variant="secondary">{deliveryNumber}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customer">Customer *</Label>
              <Input
                id="customer"
                placeholder="Enter customer name"
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="deliveryDate">Delivery Date *</Label>
              <Input
                id="deliveryDate"
                type="date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="shippingAddress">Shipping Address *</Label>
            <Textarea
              id="shippingAddress"
              placeholder="Enter complete shipping address..."
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              disabled={isLoading}
              rows={2}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any relevant notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={isLoading}
              rows={2}
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
            {items.map((item, index) => {
              const qty = parseInt(item.quantity);
              const hasError = item.productId && qty > item.availableStock;
              
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
                              {product.name} ({product.sku}) - Stock: {product.stock}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {item.productId && (
                        <p className="text-xs text-gray-500">
                          Available stock: {item.availableStock} {item.unit}
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
                          className={`flex-1 ${hasError ? 'border-red-500' : ''}`}
                        />
                        {item.unit && (
                          <div className="flex items-center px-3 bg-gray-100 rounded-md text-sm text-gray-600">
                            {item.unit}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {hasError && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Insufficient stock. Only {item.availableStock} {item.unit} available.
                      </AlertDescription>
                    </Alert>
                  )}
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
          disabled={isLoading || hasStockIssues()}
        >
          <Send className="w-4 h-4 mr-2" />
          {isLoading ? 'Submitting...' : 'Submit Delivery'}
        </Button>
      </div>
    </div>
  );
}
