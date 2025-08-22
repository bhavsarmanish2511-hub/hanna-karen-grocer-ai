import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChefHat, Package, Scale, AlertTriangle, Coffee, Archive, Utensils } from 'lucide-react';

interface PantryItem {
  id: string;
  name: string;
  quantity: string;
  location: string;
  stockLevel: 'high' | 'medium' | 'low' | 'empty';
  category: string;
  expiryDate?: string;
  shelf: string;
  position: string;
}

interface KitchenShelf {
  id: string;
  name: string;
  location: string;
  items: PantryItem[];
  icon: any;
  color: string;
}

const kitchenShelves: KitchenShelf[] = [
  {
    id: 'pantry-shelf-1',
    name: 'Pantry Shelf 1',
    location: 'Upper Level',
    icon: Archive,
    color: 'text-neon-purple',
    items: [
      { id: '1', name: 'Basmati Rice', quantity: '2.5kg', location: 'Pantry Shelf 1', stockLevel: 'low', category: 'Grains', shelf: 'Pantry Shelf 1', position: 'Left Corner' },
      { id: '2', name: 'Whole Wheat Flour', quantity: '1kg', location: 'Pantry Shelf 1', stockLevel: 'medium', category: 'Baking', shelf: 'Pantry Shelf 1', position: 'Center' },
      { id: '3', name: 'Pasta', quantity: '500g', location: 'Pantry Shelf 1', stockLevel: 'high', category: 'Grains', shelf: 'Pantry Shelf 1', position: 'Right Side' },
      { id: '4', name: 'Lentils', quantity: '800g', location: 'Pantry Shelf 1', stockLevel: 'medium', category: 'Legumes', shelf: 'Pantry Shelf 1', position: 'Back Left' },
      { id: '5', name: 'Sustainable Rice Pack', quantity: '1kg', location: 'Pantry Shelf 1', stockLevel: 'high', category: 'Grains', shelf: 'Pantry Shelf 1', position: 'Back Right' },
    ]
  },
  {
    id: 'pantry-shelf-2',
    name: 'Pantry Shelf 2',
    location: 'Middle Level',
    icon: Package,
    color: 'text-neon-cyan',
    items: [
      { id: '6', name: 'Al Breakfast Cereals', quantity: '2 boxes', location: 'Pantry Shelf 2', stockLevel: 'medium', category: 'Breakfast', shelf: 'Pantry Shelf 2', position: 'Front Center' },
      { id: '7', name: 'Oats', quantity: '1kg', location: 'Pantry Shelf 2', stockLevel: 'high', category: 'Breakfast', shelf: 'Pantry Shelf 2', position: 'Back Left' },
      { id: '8', name: 'Bread', quantity: '2 loaves', location: 'Pantry Shelf 2', stockLevel: 'medium', category: 'Bakery', shelf: 'Pantry Shelf 2', position: 'Right Corner' },
      { id: '9', name: 'Sugar', quantity: '1kg', location: 'Pantry Shelf 2', stockLevel: 'high', category: 'Sweeteners', shelf: 'Pantry Shelf 2', position: 'Center' },
      { id: '10', name: 'Salt', quantity: '500g', location: 'Pantry Shelf 2', stockLevel: 'high', category: 'Seasonings', shelf: 'Pantry Shelf 2', position: 'Left Side' },
    ]
  },
  {
    id: 'spice-rack',
    name: 'Spice Rack',
    location: 'Wall Mounted',
    icon: Utensils,
    color: 'text-neon-pink',
    items: [
      { id: '11', name: 'Honey', quantity: '50g', location: 'Spice Rack', stockLevel: 'empty', category: 'Sweeteners', shelf: 'Spice Rack', position: 'Top Shelf' },
      { id: '12', name: 'Spices', quantity: '12 bottles', location: 'Spice Rack', stockLevel: 'medium', category: 'Seasonings', shelf: 'Spice Rack', position: 'Main Area' },
      { id: '13', name: 'Sauces', quantity: '6 bottles', location: 'Spice Rack', stockLevel: 'medium', category: 'Condiments', shelf: 'Spice Rack', position: 'Bottom Shelf' },
      { id: '14', name: 'Baking Powder', quantity: '200g', location: 'Spice Rack', stockLevel: 'low', category: 'Baking', shelf: 'Spice Rack', position: 'Side Compartment' },
    ]
  },
  {
    id: 'beverage-station',
    name: 'Beverage Station',
    location: 'Counter Setup',
    icon: Coffee,
    color: 'text-status-expiring',
    items: [
      { id: '15', name: 'Coffee', quantity: '200g', location: 'Beverage Station', stockLevel: 'low', category: 'Beverages', shelf: 'Beverage Station', position: 'Main Shelf' },
      { id: '16', name: 'Tea', quantity: '40 bags', location: 'Beverage Station', stockLevel: 'medium', category: 'Beverages', shelf: 'Beverage Station', position: 'Tea Drawer' },
      { id: '17', name: 'Green Tea', quantity: '30 bags', location: 'Beverage Station', stockLevel: 'high', category: 'Beverages', shelf: 'Beverage Station', position: 'Side Compartment' },
    ]
  },
  {
    id: 'snack-cabinet',
    name: 'Snack Cabinet',
    location: 'Lower Level',
    icon: Package,
    color: 'text-neon-purple',
    items: [
      { id: '18', name: 'Kids Snacks', quantity: '8 packs', location: 'Snack Cabinet', stockLevel: 'medium', category: 'Snacks', shelf: 'Snack Cabinet', position: 'Front Section' },
      { id: '19', name: 'Freeze-Dried Banana Snacks', quantity: '4 packs', location: 'Snack Cabinet', stockLevel: 'low', category: 'Snacks', shelf: 'Snack Cabinet', position: 'Back Section' },
      { id: '20', name: 'Probiotic Yogurt Cubes', quantity: '6 packs', location: 'Snack Cabinet', stockLevel: 'medium', category: 'Snacks', shelf: 'Snack Cabinet', position: 'Side Area' },
    ]
  },
  {
    id: 'cleaning-cabinet',
    name: 'Cleaning Cabinet',
    location: 'Under Sink',
    icon: Archive,
    color: 'text-muted-foreground',
    items: [
      { id: '21', name: 'Dish Soap', quantity: '1 bottle', location: 'Cleaning Cabinet', stockLevel: 'low', category: 'Cleaning', shelf: 'Cleaning Cabinet', position: 'Main Shelf' },
      { id: '22', name: 'Paper Towels', quantity: '4 rolls', location: 'Cleaning Cabinet', stockLevel: 'high', category: 'Cleaning', shelf: 'Cleaning Cabinet', position: 'Top Shelf' },
      { id: '23', name: 'Laundry Detergent', quantity: '1 bottle', location: 'Cleaning Cabinet', stockLevel: 'medium', category: 'Cleaning', shelf: 'Cleaning Cabinet', position: 'Bottom Shelf' },
      { id: '24', name: 'Smart Cleaning Pods', quantity: '12 pods', location: 'Cleaning Cabinet', stockLevel: 'high', category: 'Cleaning', shelf: 'Cleaning Cabinet', position: 'Side Compartment' },
      { id: '25', name: 'Plasma Cleaning Spray', quantity: '2 bottles', location: 'Cleaning Cabinet', stockLevel: 'medium', category: 'Cleaning', shelf: 'Cleaning Cabinet', position: 'Corner' },
      { id: '26', name: 'Organic Baby Powder', quantity: '1 container', location: 'Cleaning Cabinet', stockLevel: 'low', category: 'Baby Care', shelf: 'Cleaning Cabinet', position: 'Special Section' },
    ]
  },
  {
    id: 'specialty-items',
    name: 'Specialty Items',
    location: 'Special Storage',
    icon: Package,
    color: 'text-neon-cyan',
    items: [
      { id: '27', name: 'Premium Organic Tofu', quantity: '400g', location: 'Specialty Items', stockLevel: 'low', category: 'Plant Protein', shelf: 'Specialty Items', position: 'Refrigerated Section' },
    ]
  }
];

interface SmartKitchenModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SmartKitchenModal = ({ isOpen, onClose }: SmartKitchenModalProps) => {
  const [selectedShelf, setSelectedShelf] = useState<string | null>(null);

  const getStockColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-status-fresh border-status-fresh/30 bg-status-fresh/10';
      case 'medium': return 'text-neon-cyan border-neon-cyan/30 bg-neon-cyan/10';
      case 'low': return 'text-status-expiring border-status-expiring/30 bg-status-expiring/10';
      case 'empty': return 'text-status-expired border-status-expired/30 bg-status-expired/10';
      default: return 'text-foreground';
    }
  };

  const selectedShelfData = kitchenShelves.find(s => s.id === selectedShelf);
  const lowStockItems = kitchenShelves.flatMap(shelf => shelf.items).filter(item => item.stockLevel === 'low' || item.stockLevel === 'empty');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] bg-gradient-card border-border/50 shadow-purple">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <div className="p-2 rounded-lg bg-neon-purple/20">
              <ChefHat className="h-6 w-6 text-neon-purple" />
            </div>
            Smart Kitchen - Deep Dive
            {lowStockItems.length > 0 && (
              <Badge className="bg-status-expiring/20 text-status-expiring border-status-expiring/30">
                <AlertTriangle className="h-3 w-3 mr-1" />
                {lowStockItems.length} low stock
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          {!selectedShelf ? (
            /* Shelf Overview */
            <div className="h-full">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Package className="h-5 w-5 text-neon-purple" />
                  <span className="text-lg font-semibold text-foreground">Kitchen Organization</span>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {kitchenShelves.map((shelf) => {
                    const IconComponent = shelf.icon;
                    const shelfLowStock = shelf.items.filter(item => item.stockLevel === 'low' || item.stockLevel === 'empty').length;
                    
                    return (
                      <div
                        key={shelf.id}
                        onClick={() => setSelectedShelf(shelf.id)}
                        className="group cursor-pointer p-6 rounded-xl bg-card/30 border border-border/30 hover:border-neon-purple/50 transition-all duration-300 hover:shadow-purple/50 hover:scale-105"
                      >
                        <div className="text-center">
                          <div className={`mx-auto w-16 h-16 rounded-2xl bg-card/50 flex items-center justify-center mb-4 group-hover:bg-neon-purple/10 transition-all duration-300`}>
                            <IconComponent className={`h-8 w-8 ${shelf.color} group-hover:text-neon-purple`} />
                          </div>
                          <h3 className="font-bold text-foreground group-hover:text-neon-purple transition-colors mb-2">
                            {shelf.name}
                          </h3>
                          <div className="space-y-1">
                            <div className="text-sm text-muted-foreground">{shelf.location}</div>
                            <div className="flex items-center justify-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {shelf.items.length} items
                              </Badge>
                              {shelfLowStock > 0 && (
                                <Badge variant="outline" className="text-xs bg-status-expiring/10 text-status-expiring border-status-expiring/30">
                                  {shelfLowStock} low
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Low Stock Alert */}
              {lowStockItems.length > 0 && (
                <div className="mb-6 p-4 rounded-lg bg-status-expiring/10 border border-status-expiring/30">
                  <h3 className="font-semibold text-status-expiring mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Items Needing Attention
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {lowStockItems.map((item) => (
                      <div key={item.id} className="p-3 rounded-lg bg-card/30 border border-border/30">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-foreground">{item.name}</div>
                            <div className="text-sm text-muted-foreground">{item.shelf} - {item.position}</div>
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStockColor(item.stockLevel)}`}>
                            {item.stockLevel.toUpperCase()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* All Items Grid */}
              <div className="border-t border-border/30 pt-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">All Pantry Items</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-80 overflow-y-auto">
                  {kitchenShelves.flatMap(shelf => shelf.items).map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-lg bg-card/50 border border-border/30 hover:border-neon-purple/50 transition-all duration-300"
                    >
                      <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${getStockColor(item.stockLevel)}`}>
                        {item.stockLevel.toUpperCase()}
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground">{item.name}</h4>
                        <div className="text-sm text-muted-foreground">{item.shelf} - {item.position}</div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-mono text-foreground">{item.quantity}</span>
                          <Badge variant="outline" className="text-xs">{item.category}</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Shelf Detail View */
            <div className="h-full">
              <div className="flex items-center gap-2 mb-6">
                <Button variant="ghost" onClick={() => setSelectedShelf(null)} className="text-neon-purple">
                  ← Back to Overview
                </Button>
              </div>

              {selectedShelfData && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <selectedShelfData.icon className={`h-8 w-8 ${selectedShelfData.color}`} />
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">{selectedShelfData.name}</h2>
                      <p className="text-muted-foreground">Location: {selectedShelfData.location}</p>
                    </div>
                  </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[60vh] overflow-y-auto pr-2">
                     {selectedShelfData.items.map((item) => (
                      <div
                        key={item.id}
                        className="p-6 rounded-xl bg-card/50 border border-border/30 hover:border-neon-purple/50 transition-all duration-300 hover:shadow-purple/50"
                      >
                        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${getStockColor(item.stockLevel)}`}>
                          {item.stockLevel.toUpperCase()}
                        </div>
                        
                        <div className="space-y-4">
                          <h3 className="text-xl font-bold text-foreground">{item.name}</h3>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Quantity</span>
                              <div className="font-mono text-foreground text-lg">{item.quantity}</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Position</span>
                              <div className="text-foreground">{item.position}</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Category</span>
                              <Badge variant="outline">{item.category}</Badge>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Stock Level</span>
                              <div className="w-full bg-muted/30 rounded-full h-2 mt-1">
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

                          {item.expiryDate && (
                            <div className="p-3 rounded-lg bg-muted/20">
                              <div className="text-sm">
                                <span className="text-muted-foreground">Expires: </span>
                                <span className="text-status-expiring">
                                  {new Date(item.expiryDate).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};