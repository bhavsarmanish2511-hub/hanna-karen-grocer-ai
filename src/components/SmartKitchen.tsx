import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChefHat, Package, Scale, AlertTriangle } from 'lucide-react';

interface PantryItem {
  id: string;
  name: string;
  quantity: string;
  location: string;
  stockLevel: 'high' | 'medium' | 'low' | 'empty';
  category: string;
  expiryDate?: string;
}

const pantryItems: PantryItem[] = [
  { id: '1', name: 'Basmati Rice', quantity: '2.5kg', location: 'Pantry Shelf 1', stockLevel: 'high', category: 'Grains' },
  { id: '2', name: 'Olive Oil', quantity: '250ml', location: 'Counter Top', stockLevel: 'low', category: 'Oils', expiryDate: '2025-12-01' },
  { id: '3', name: 'Kids Cereal (Ron)', quantity: '1 box', location: 'Pantry Shelf 2', stockLevel: 'medium', category: 'Breakfast' },
  { id: '4', name: 'Whole Wheat Flour', quantity: '1kg', location: 'Pantry Shelf 1', stockLevel: 'medium', category: 'Baking' },
  { id: '5', name: 'Honey', quantity: '50g', location: 'Counter Top', stockLevel: 'empty', category: 'Sweeteners' },
  { id: '6', name: 'Ground Coffee', quantity: '200g', location: 'Coffee Station', stockLevel: 'low', category: 'Beverages' },
];

const locations = ['All Areas', 'Pantry Shelf 1', 'Pantry Shelf 2', 'Counter Top', 'Coffee Station'];

export const SmartKitchen = () => {
  const [selectedLocation, setSelectedLocation] = useState('All Areas');
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredItems = selectedLocation === 'All Areas' 
    ? pantryItems 
    : pantryItems.filter(item => item.location === selectedLocation);

  const getStockColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-status-fresh border-status-fresh/30 bg-status-fresh/10';
      case 'medium': return 'text-neon-cyan border-neon-cyan/30 bg-neon-cyan/10';
      case 'low': return 'text-status-expiring border-status-expiring/30 bg-status-expiring/10';
      case 'empty': return 'text-status-expired border-status-expired/30 bg-status-expired/10';
      default: return 'text-foreground';
    }
  };

  const lowStockItems = pantryItems.filter(item => item.stockLevel === 'low' || item.stockLevel === 'empty');

  return (
    <Card className="bg-gradient-card border-border/50 shadow-glow transition-all duration-300 hover:shadow-purple">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-neon-purple/20">
              <ChefHat className="h-6 w-6 text-neon-purple" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Smart Kitchen</h2>
              <p className="text-muted-foreground">Pantry & consumables tracking</p>
            </div>
          </div>
          {lowStockItems.length > 0 && (
            <div className="flex items-center gap-2 text-status-expiring">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm font-medium">{lowStockItems.length} low stock</span>
            </div>
          )}
        </div>

        {/* Location Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {locations.map((location) => (
            <Badge
              key={location}
              variant={selectedLocation === location ? "default" : "secondary"}
              className={`cursor-pointer whitespace-nowrap transition-all duration-200 ${
                selectedLocation === location 
                  ? 'bg-primary text-primary-foreground shadow-purple' 
                  : 'hover:bg-secondary/80'
              }`}
              onClick={() => setSelectedLocation(location)}
            >
              {location}
            </Badge>
          ))}
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.slice(0, isExpanded ? filteredItems.length : 4).map((item) => (
            <div
              key={item.id}
              className="group relative p-4 rounded-lg bg-card/50 border border-border/30 hover:border-neon-purple/50 transition-all duration-300 hover:shadow-purple/50"
            >
              {/* Stock Level Indicator */}
              <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${getStockColor(item.stockLevel)}`}>
                {item.stockLevel.toUpperCase()}
              </div>
              
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground group-hover:text-neon-purple transition-colors">
                  {item.name}
                </h3>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Quantity</span>
                    <span className="font-mono text-foreground">{item.quantity}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Location</span>
                    <span className="text-foreground">{item.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Category</span>
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                  </div>
                  
                  {item.expiryDate && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Expires</span>
                      <span className="text-status-expiring text-xs">
                        {new Date(item.expiryDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Visual Stock Indicator */}
                <div className="w-full bg-muted/30 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      item.stockLevel === 'high' ? 'w-full bg-status-fresh' :
                      item.stockLevel === 'medium' ? 'w-2/3 bg-neon-cyan' :
                      item.stockLevel === 'low' ? 'w-1/3 bg-status-expiring' :
                      'w-0 bg-status-expired'
                    }`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Expand/Collapse Button */}
        {filteredItems.length > 4 && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-neon-purple hover:text-neon-cyan transition-colors text-sm font-medium"
            >
              {isExpanded ? 'Show Less' : `Show All ${filteredItems.length} Items`}
            </button>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-6 p-4 rounded-lg bg-muted/20 border border-border/30">
          <h4 className="text-sm font-medium text-foreground mb-3">Quick Actions</h4>
          <div className="grid grid-cols-2 gap-2">
            <button className="flex items-center gap-2 p-2 rounded-lg bg-card/50 hover:bg-neon-purple/10 text-sm text-muted-foreground hover:text-neon-purple transition-all">
              <Package className="h-4 w-4" />
              Inventory Scan
            </button>
            <button className="flex items-center gap-2 p-2 rounded-lg bg-card/50 hover:bg-neon-cyan/10 text-sm text-muted-foreground hover:text-neon-cyan transition-all">
              <Scale className="h-4 w-4" />
              Weight Check
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};