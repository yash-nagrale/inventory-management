import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Filter, Download, TruckIcon, Send, ArrowLeftRight, FileText, Eye } from 'lucide-react';

interface MoveHistoryProps {
  currentWarehouse: string;
  searchQuery: string;
}

const movements = [
  {
    id: '1',
    type: 'receipt',
    reference: 'RCP-001234',
    product: 'Industrial Drill Bits Set',
    sku: 'SKU-1234',
    quantity: 500,
    unit: 'sets',
    location: 'Main Warehouse - NY',
    date: '2024-11-20',
    time: '14:30',
    status: 'completed',
    user: 'John Smith',
  },
  {
    id: '2',
    type: 'delivery',
    reference: 'DLV-005678',
    product: 'Safety Helmets',
    sku: 'SKU-5678',
    quantity: -200,
    unit: 'pcs',
    location: 'Distribution Center - LA',
    date: '2024-11-20',
    time: '11:15',
    status: 'completed',
    user: 'Sarah Johnson',
  },
  {
    id: '3',
    type: 'transfer',
    reference: 'TRF-002345',
    product: 'Cable Rolls (100m)',
    sku: 'SKU-9012',
    quantity: -20,
    unit: 'rolls',
    location: 'Main Warehouse - NY → Regional Hub - FL',
    date: '2024-11-19',
    time: '16:45',
    status: 'pending',
    user: 'Mike Davis',
  },
  {
    id: '4',
    type: 'adjustment',
    reference: 'ADJ-000123',
    product: 'Work Gloves',
    sku: 'SKU-7890',
    quantity: -15,
    unit: 'pairs',
    location: 'Storage Facility - TX',
    date: '2024-11-19',
    time: '09:20',
    status: 'completed',
    user: 'Emma Wilson',
  },
  {
    id: '5',
    type: 'receipt',
    reference: 'RCP-001235',
    product: 'LED Bulbs Pack',
    sku: 'SKU-2345',
    quantity: 300,
    unit: 'packs',
    location: 'Distribution Center - LA',
    date: '2024-11-18',
    time: '13:00',
    status: 'completed',
    user: 'John Smith',
  },
  {
    id: '6',
    type: 'delivery',
    reference: 'DLV-005679',
    product: 'Industrial Drill Bits Set',
    sku: 'SKU-1234',
    quantity: -100,
    unit: 'sets',
    location: 'Main Warehouse - NY',
    date: '2024-11-18',
    time: '10:30',
    status: 'completed',
    user: 'Sarah Johnson',
  },
  {
    id: '7',
    type: 'transfer',
    reference: 'TRF-002346',
    product: 'Safety Helmets',
    sku: 'SKU-5678',
    quantity: 50,
    unit: 'pcs',
    location: 'Storage Facility - TX → Distribution Center - LA',
    date: '2024-11-17',
    time: '15:20',
    status: 'completed',
    user: 'Mike Davis',
  },
  {
    id: '8',
    type: 'adjustment',
    reference: 'ADJ-000124',
    product: 'Paint Cans (5L)',
    sku: 'SKU-3456',
    quantity: -10,
    unit: 'cans',
    location: 'Regional Hub - FL',
    date: '2024-11-17',
    time: '11:45',
    status: 'completed',
    user: 'Emma Wilson',
  },
];

const typeConfig = {
  receipt: { label: 'Receipt', icon: TruckIcon, color: 'bg-blue-100 text-blue-800' },
  delivery: { label: 'Delivery', icon: Send, color: 'bg-green-100 text-green-800' },
  transfer: { label: 'Transfer', icon: ArrowLeftRight, color: 'bg-purple-100 text-purple-800' },
  adjustment: { label: 'Adjustment', icon: FileText, color: 'bg-orange-100 text-orange-800' },
};

export function MoveHistory({ currentWarehouse, searchQuery }: MoveHistoryProps) {
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const filteredMovements = movements.filter(movement => {
    const matchesSearch = movement.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         movement.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         movement.reference.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || movement.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || movement.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-gray-900 mb-1">Move History</h1>
          <p className="text-gray-600">Track all stock movements and transactions</p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3 flex-wrap">
            <Filter className="w-4 h-4 text-gray-500" />
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="receipt">Receipts</SelectItem>
                <SelectItem value="delivery">Deliveries</SelectItem>
                <SelectItem value="transfer">Transfers</SelectItem>
                <SelectItem value="adjustment">Adjustments</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="All Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
            
            {(typeFilter !== 'all' || statusFilter !== 'all' || dateFilter !== 'all') && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  setTypeFilter('all');
                  setStatusFilter('all');
                  setDateFilter('all');
                }}
              >
                Clear Filters
              </Button>
            )}
            
            <span className="text-sm text-gray-600 ml-auto">
              {filteredMovements.length} movements
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Movement Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredMovements.map((movement, index) => {
              const config = typeConfig[movement.type as keyof typeof typeConfig];
              const Icon = config.icon;
              
              return (
                <div 
                  key={movement.id} 
                  className="relative pb-4 border-l-2 border-gray-200 pl-6 ml-5 last:border-l-0"
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-[13px] top-0">
                    <div className={`w-6 h-6 rounded-full ${config.color} flex items-center justify-center`}>
                      <Icon className="w-3 h-3" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className={`${config.color} hover:${config.color}`}>
                          {config.label}
                        </Badge>
                        <span className="text-sm text-gray-600">{movement.reference}</span>
                        <Badge 
                          variant={movement.status === 'completed' ? 'default' : 'secondary'}
                          className={movement.status === 'completed' ? 'bg-green-600' : ''}
                        >
                          {movement.status}
                        </Badge>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                      <div>
                        <p className="text-gray-500 mb-1">Product</p>
                        <p className="text-gray-900">{movement.product}</p>
                        <p className="text-xs text-gray-500">{movement.sku}</p>
                      </div>
                      
                      <div>
                        <p className="text-gray-500 mb-1">Quantity</p>
                        <p className={`${movement.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {movement.quantity > 0 ? '+' : ''}{movement.quantity} {movement.unit}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-gray-500 mb-1">Location</p>
                        <p className="text-gray-900">{movement.location}</p>
                      </div>
                      
                      <div>
                        <p className="text-gray-500 mb-1">Date & Time</p>
                        <p className="text-gray-900">{movement.date}</p>
                        <p className="text-xs text-gray-500">{movement.time}</p>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-xs text-gray-500">
                        Processed by <span className="text-gray-700">{movement.user}</span>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {filteredMovements.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No movements found matching your filters.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
