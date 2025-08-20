import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Package, 
  Carrot, 
  Coffee, 
  Utensils, 
  Archive,
  ChevronRight,
  ChevronDown,
  Layers,
  Warehouse,
  MapPin
} from 'lucide-react';

interface InventoryItem {
  id: string;
  name: string;
  quantity: string;
  freshness?: 'fresh' | 'expiring' | 'expired';
  stockLevel?: 'high' | 'medium' | 'low' | 'empty';
  location: string;
  shelf: string;
  position: string;
  category: string;
}

interface InventoryShelf {
  id: string;
  name: string;
  location: string;
  zone: string;
  items: InventoryItem[];
  icon: any;
  color: string;
}

const inventoryShelves: InventoryShelf[] = [
  {
    id: 'fridge-main',
    name: 'Refrigerator Main',
    location: 'Kitchen Appliance',
    zone: 'Cold Storage',
    icon: Package,
    color: 'text-neon-cyan',
    items: [
      { id: '1', name: 'Organic Milk', quantity: '1.2L', freshness: 'fresh', location: 'Fridge Main Shelf', shelf: 'Main Shelf', position: 'Front Left', category: 'Dairy' },
      { id: '2', name: 'Greek Yogurt', quantity: '500g', freshness: 'fresh', location: 'Fridge Main Shelf', shelf: 'Main Shelf', position: 'Back Center', category: 'Dairy' },
    ]
  },
  {
    id: 'fridge-crisper',
    name: 'Vegetable Crisper',
    location: 'Refrigerator Bottom',
    zone: 'Fresh Produce',
    icon: Carrot,
    color: 'text-status-fresh',
    items: [
      { id: '3', name: 'Baby Carrots', quantity: '300g', freshness: 'expiring', location: 'Fridge Crisper', shelf: 'Crisper Drawer', position: 'Left Side', category: 'Vegetables' },
      { id: '4', name: 'Fresh Spinach', quantity: '200g', freshness: 'fresh', location: 'Fridge Crisper', shelf: 'Crisper Drawer', position: 'Right Side', category: 'Leafy Greens' },
      { id: '5', name: 'Cherry Tomatoes', quantity: '250g', freshness: 'fresh', location: 'Fridge Crisper', shelf: 'Crisper Drawer', position: 'Center', category: 'Vegetables' },
    ]
  },
  {
    id: 'pantry-upper',
    name: 'Upper Pantry Shelf',
    location: 'Pantry Cabinet',
    zone: 'Dry Storage',
    icon: Archive,
    color: 'text-neon-purple',
    items: [
      { id: '6', name: 'Basmati Rice', quantity: '2.5kg', stockLevel: 'high', location: 'Pantry Upper', shelf: 'Top Shelf', position: 'Left Corner', category: 'Grains' },
      { id: '7', name: 'Whole Wheat Flour', quantity: '1kg', stockLevel: 'medium', location: 'Pantry Upper', shelf: 'Top Shelf', position: 'Center', category: 'Baking' },
      { id: '8', name: 'Olive Oil', quantity: '250ml', stockLevel: 'low', location: 'Pantry Upper', shelf: 'Top Shelf', position: 'Right Side', category: 'Oils' },
    ]
  },
  {
    id: 'pantry-middle',
    name: 'Middle Pantry Shelf',
    location: 'Pantry Cabinet',
    zone: 'Snacks & Breakfast',
    icon: Package,
    color: 'text-neon-pink',
    items: [
      { id: '9', name: 'Kids Cereal (Ron)', quantity: '1 box', stockLevel: 'medium', location: 'Pantry Middle', shelf: 'Middle Shelf', position: 'Front Center', category: 'Breakfast' },
      { id: '10', name: 'Granola Bars', quantity: '8 bars', stockLevel: 'medium', location: 'Pantry Middle', shelf: 'Middle Shelf', position: 'Back Left', category: 'Snacks' },
      { id: '11', name: 'Honey', quantity: '50g', stockLevel: 'empty', location: 'Pantry Middle', shelf: 'Middle Shelf', position: 'Right Corner', category: 'Sweeteners' },
    ]
  },
  {
    id: 'beverage-station',
    name: 'Beverage Station',
    location: 'Counter Area',
    zone: 'Drinks & Coffee',
    icon: Coffee,
    color: 'text-status-expiring',
    items: [
      { id: '12', name: 'Ground Coffee', quantity: '200g', stockLevel: 'low', location: 'Beverage Station', shelf: 'Coffee Shelf', position: 'Main Position', category: 'Coffee' },
      { id: '13', name: 'Green Tea', quantity: '50 bags', stockLevel: 'high', location: 'Beverage Station', shelf: 'Tea Shelf', position: 'Side Compartment', category: 'Tea' },
      { id: '14', name: 'Apple Juice (Ron)', quantity: '750ml', freshness: 'fresh', location: 'Fridge Door', shelf: 'Door Shelf', position: 'Top Slot', category: 'Juice' },
    ]
  },
  {
    id: 'storage-cabinet',
    name: 'Storage Cabinet',
    location: 'Utility Area',
    zone: 'Household Items',
    icon: Warehouse,
    color: 'text-muted-foreground',
    items: [
      { id: '15', name: 'Paper Towels', quantity: '4 rolls', stockLevel: 'high', location: 'Storage Cabinet', shelf: 'Upper Cabinet', position: 'Top Shelf', category: 'Cleaning' },
      { id: '16', name: 'Dish Soap', quantity: '1 bottle', stockLevel: 'medium', location: 'Under Sink', shelf: 'Under Sink', position: 'Left Side', category: 'Cleaning' },
    ]
  }
];

const zones = ['All Zones', 'Cold Storage', 'Fresh Produce', 'Dry Storage', 'Snacks & Breakfast', 'Drinks & Coffee', 'Household Items'];

interface InventoryExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InventoryExplorerModal = ({ isOpen, onClose }: InventoryExplorerModalProps) => {
  const [selectedShelf, setSelectedShelf] = useState<string | null>(null);
  const [selectedZone, setSelectedZone] = useState('All Zones');
  const [searchTerm, setSearchTerm] = useState('');

  const getFreshnessColor = (freshness?: string) => {
    switch (freshness) {
      case 'fresh': return 'text-status-fresh border-status-fresh/30 bg-status-fresh/10';
      case 'expiring': return 'text-status-expiring border-status-expiring/30 bg-status-expiring/10';
      case 'expired': return 'text-status-expired border-status-expired/30 bg-status-expired/10';
      default: return 'text-foreground';
    }
  };

  const getStockColor = (level?: string) => {
    switch (level) {
      case 'high': return 'text-status-fresh border-status-fresh/30 bg-status-fresh/10';
      case 'medium': return 'text-neon-cyan border-neon-cyan/30 bg-neon-cyan/10';
      case 'low': return 'text-status-expiring border-status-expiring/30 bg-status-expiring/10';
      case 'empty': return 'text-status-expired border-status-expired/30 bg-status-expired/10';
      default: return 'text-foreground';
    }
  };

  const filteredShelves = inventoryShelves.filter(shelf => {
    const matchesZone = selectedZone === 'All Zones' || shelf.zone === selectedZone;
    const matchesSearch = shelf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shelf.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesZone && matchesSearch;
  });

  const selectedShelfData = inventoryShelves.find(s => s.id === selectedShelf);
  const totalItems = inventoryShelves.reduce((sum, shelf) => sum + shelf.items.length, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl h-[90vh] bg-gradient-card border-border/50 shadow-neon">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <div className="p-2 rounded-lg bg-neon-cyan/20">
              <Layers className="h-6 w-6 text-neon-cyan" />
            </div>
            Inventory Explorer - Deep Dive
            <Badge variant="outline" className="ml-2">
              {totalItems} Total Items
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          {!selectedShelf ? (
            <div className="h-full flex flex-col">
              {/* Search and Filters */}
              <div className="mb-6 space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search shelves and items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-card/50 border border-border/50 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-neon-cyan/50 transition-colors"
                  />
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2">
                  {zones.map((zone) => (
                    <Badge
                      key={zone}
                      variant={selectedZone === zone ? "default" : "secondary"}
                      className={`cursor-pointer whitespace-nowrap transition-all duration-200 ${
                        selectedZone === zone 
                          ? 'bg-primary text-primary-foreground shadow-neon' 
                          : 'hover:bg-secondary/80'
                      }`}
                      onClick={() => setSelectedZone(zone)}
                    >
                      {zone}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Shelves Overview */}
              <div className="flex-1 overflow-auto">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Warehouse className="h-5 w-5 text-neon-cyan" />
                    <span className="text-lg font-semibold text-foreground">Smart Storage Organization</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredShelves.map((shelf) => {
                      const IconComponent = shelf.icon;
                      const lowStockItems = shelf.items.filter(item => 
                        item.stockLevel === 'low' || item.stockLevel === 'empty' || item.freshness === 'expiring'
                      ).length;
                      
                      return (
                        <div
                          key={shelf.id}
                          onClick={() => setSelectedShelf(shelf.id)}
                          className="group cursor-pointer p-6 rounded-xl bg-card/30 border border-border/30 hover:border-neon-cyan/50 transition-all duration-300 hover:shadow-neon/50 hover:scale-105"
                        >
                          <div className="space-y-4">
                            <div className="flex items-start justify-between">
                              <div className={`p-3 rounded-2xl bg-card/50 group-hover:bg-neon-cyan/10 transition-all duration-300`}>
                                <IconComponent className={`h-6 w-6 ${shelf.color} group-hover:text-neon-cyan`} />
                              </div>
                              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-neon-cyan transition-colors" />
                            </div>
                            
                            <div>
                              <h3 className="font-bold text-foreground group-hover:text-neon-cyan transition-colors mb-1">
                                {shelf.name}
                              </h3>
                              <div className="space-y-1">
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <MapPin className="h-3 w-3" />
                                  {shelf.location}
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {shelf.zone}
                                </Badge>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <Badge variant="secondary" className="text-xs">
                                {shelf.items.length} items
                              </Badge>
                              {lowStockItems > 0 && (
                                <Badge variant="outline" className="text-xs bg-status-expiring/10 text-status-expiring border-status-expiring/30">
                                  {lowStockItems} need attention
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Quick Items Overview */}
                <div className="border-t border-border/30 pt-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Items Requiring Attention</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {inventoryShelves.flatMap(shelf => shelf.items)
                      .filter(item => item.stockLevel === 'low' || item.stockLevel === 'empty' || item.freshness === 'expiring')
                      .slice(0, 8)
                      .map((item) => (
                        <div
                          key={item.id}
                          className="p-3 rounded-lg bg-card/50 border border-border/30 hover:border-neon-cyan/50 transition-all duration-300"
                        >
                          <div className="space-y-2">
                            <h4 className="font-medium text-foreground text-sm">{item.name}</h4>
                            <div className="text-xs text-muted-foreground">{item.shelf} - {item.position}</div>
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-xs text-foreground">{item.quantity}</span>
                              {item.freshness && (
                                <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${getFreshnessColor(item.freshness)}`}>
                                  {item.freshness.toUpperCase()}
                                </div>
                              )}
                              {item.stockLevel && !item.freshness && (
                                <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStockColor(item.stockLevel)}`}>
                                  {item.stockLevel.toUpperCase()}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Shelf Detail View */
            <div className="h-full flex flex-col">
              <div className="flex items-center gap-2 mb-6">
                <Button variant="ghost" onClick={() => setSelectedShelf(null)} className="text-neon-cyan">
                  ← Back to Overview
                </Button>
              </div>

              {selectedShelfData && (
                <div className="flex-1 overflow-auto">
                  <div className="flex items-center gap-3 mb-6">
                    <selectedShelfData.icon className={`h-8 w-8 ${selectedShelfData.color}`} />
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">{selectedShelfData.name}</h2>
                      <p className="text-muted-foreground">{selectedShelfData.location} • {selectedShelfData.zone}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedShelfData.items.map((item) => (
                      <div
                        key={item.id}
                        className="p-6 rounded-xl bg-card/50 border border-border/30 hover:border-neon-cyan/50 transition-all duration-300 hover:shadow-neon/50"
                      >
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <h3 className="text-xl font-bold text-foreground">{item.name}</h3>
                            <div className="flex flex-col gap-2">
                              {item.freshness && (
                                <div className={`px-3 py-1 rounded-full text-xs font-medium ${getFreshnessColor(item.freshness)}`}>
                                  {item.freshness.toUpperCase()}
                                </div>
                              )}
                              {item.stockLevel && (
                                <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStockColor(item.stockLevel)}`}>
                                  {item.stockLevel.toUpperCase()}
                                </div>
                              )}
                            </div>
                          </div>
                          
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
                              <span className="text-muted-foreground">Exact Location</span>
                              <div className="text-foreground text-xs">{item.location}</div>
                            </div>
                          </div>

                          {item.stockLevel && (
                            <div className="p-3 rounded-lg bg-muted/20">
                              <div className="text-sm text-muted-foreground mb-2">Stock Level</div>
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