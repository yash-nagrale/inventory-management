import { Search, Warehouse } from 'lucide-react';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface HeaderProps {
  currentWarehouse: string;
  onWarehouseChange: (warehouse: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const warehouses = [
  { id: 'warehouse-1', name: 'Main Warehouse - NY' },
  { id: 'warehouse-2', name: 'Distribution Center - LA' },
  { id: 'warehouse-3', name: 'Storage Facility - TX' },
  { id: 'warehouse-4', name: 'Regional Hub - FL' },
];

export function Header({ currentWarehouse, onWarehouseChange, searchQuery, onSearchChange }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center gap-4 flex-wrap">
        {/* Search Bar */}
        <div className="flex-1 min-w-[200px] max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search products, SKU, receipts..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        
        {/* Warehouse Selector */}
        <div className="flex items-center gap-2">
          <Warehouse className="w-5 h-5 text-gray-500" />
          <Select value={currentWarehouse} onValueChange={onWarehouseChange}>
            <SelectTrigger className="w-[240px]">
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
      </div>
    </header>
  );
}
