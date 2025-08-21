import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Package, 
  Layers,
  ChevronRight,
  ChevronLeft,
  Archive,
  Refrigerator,
  ChefHat,
  ArrowLeft
} from 'lucide-react';

interface ShelfItem {
  id: string;
  name: string;
  quantity: string;
  freshness?: 'fresh' | 'expiring' | 'expired';
  stockLevel?: 'high' | 'medium' | 'low' | 'empty';
  location: string;
  category: string;
  source: 'refrigerator' | 'kitchen';
}

interface Shelf {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  items: ShelfItem[];
  area: 'Kitchen' | 'Refrigerator';
}

const shelfData: Shelf[] = [
  {
    id: 'pantry-shelf-1',
    name: 'Pantry Shelf 1',
    description: 'Main storage - Grains, Rice & Flour',
    icon: Archive,
    color: 'text-neon-purple',
    area: 'Kitchen',
    items: [
      { id: '1', name: 'Basmati Rice', quantity: '2.5kg', stockLevel: 'low', location: 'Pantry Shelf 1', category: 'Grains', source: 'kitchen' },
      { id: '2', name: 'Whole Wheat Flour', quantity: '1kg', stockLevel: 'medium', location: 'Pantry Shelf 1', category: 'Baking', source: 'kitchen' },
      { id: '3', name: 'Pasta', quantity: '500g', stockLevel: 'high', location: 'Pantry Shelf 1', category: 'Grains', source: 'kitchen' },
      { id: '4', name: 'Lentils', quantity: '800g', stockLevel: 'medium', location: 'Pantry Shelf 1', category: 'Legumes', source: 'kitchen' },
      { id: '5', name: 'Sustainable Rice Pack', quantity: '1kg', stockLevel: 'high', location: 'Pantry Shelf 1', category: 'Grains', source: 'kitchen' },
    ]
  },
  {
    id: 'pantry-shelf-2',
    name: 'Pantry Shelf 2',
    description: 'Breakfast & Bakery items',
    icon: Package,
    color: 'text-neon-cyan',
    area: 'Kitchen',
    items: [
      { id: '6', name: 'Al Breakfast Cereals', quantity: '2 boxes', stockLevel: 'medium', location: 'Pantry Shelf 2', category: 'Breakfast', source: 'kitchen' },
      { id: '7', name: 'Oats', quantity: '1kg', stockLevel: 'high', location: 'Pantry Shelf 2', category: 'Breakfast', source: 'kitchen' },
      { id: '8', name: 'Bread', quantity: '2 loaves', stockLevel: 'medium', location: 'Pantry Shelf 2', category: 'Bakery', source: 'kitchen' },
      { id: '9', name: 'Sugar', quantity: '1kg', stockLevel: 'high', location: 'Pantry Shelf 2', category: 'Sweeteners', source: 'kitchen' },
      { id: '10', name: 'Salt', quantity: '500g', stockLevel: 'high', location: 'Pantry Shelf 2', category: 'Seasonings', source: 'kitchen' },
    ]
  },
  {
    id: 'main-shelf',
    name: 'Main Refrigerator Shelf',
    description: 'Dairy products & main items',
    icon: Refrigerator,
    color: 'text-neon-pink',
    area: 'Refrigerator',
    items: [
      { id: '11', name: 'Milk', quantity: '1.2L', freshness: 'fresh', location: 'Main Shelf - Front', category: 'Dairy', source: 'refrigerator' },
      { id: '12', name: 'Greek Yogurt', quantity: '500g', freshness: 'fresh', location: 'Main Shelf - Back', category: 'Dairy', source: 'refrigerator' },
      { id: '13', name: 'Eggs', quantity: '12 count', freshness: 'fresh', location: 'Main Shelf - Side', category: 'Dairy', source: 'refrigerator' },
      { id: '14', name: 'Butter', quantity: '250g', freshness: 'fresh', location: 'Main Shelf - Corner', category: 'Dairy', source: 'refrigerator' },
      { id: '15', name: 'Cheese', quantity: '400g', freshness: 'fresh', location: 'Main Shelf - Center', category: 'Dairy', source: 'refrigerator' },
    ]
  },
  {
    id: 'crisper-drawer',
    name: 'Crisper Drawer',
    description: 'Fresh vegetables & greens',
    icon: ChefHat,
    color: 'text-status-fresh',
    area: 'Refrigerator',
    items: [
      { id: '16', name: 'Onions', quantity: '800g', freshness: 'fresh', location: 'Crisper - Left Side', category: 'Vegetables', source: 'refrigerator' },
      { id: '17', name: 'Avocado', quantity: '3 pieces', freshness: 'fresh', location: 'Crisper - Center', category: 'Vegetables', source: 'refrigerator' },
      { id: '18', name: 'Tomatoes', quantity: '500g', freshness: 'fresh', location: 'Crisper - Right Side', category: 'Vegetables', source: 'refrigerator' },
      { id: '19', name: 'Lettuce', quantity: '1 head', freshness: 'fresh', location: 'Crisper - Back Left', category: 'Vegetables', source: 'refrigerator' },
      { id: '20', name: 'Spinach', quantity: '200g', freshness: 'fresh', location: 'Crisper - Back Right', category: 'Vegetables', source: 'refrigerator' },
      { id: '21', name: 'Bell Peppers', quantity: '3 pieces', freshness: 'fresh', location: 'Crisper - Front', category: 'Vegetables', source: 'refrigerator' },
      { id: '22', name: 'Broccoli', quantity: '1 head', freshness: 'fresh', location: 'Crisper - Side', category: 'Vegetables', source: 'refrigerator' },
      { id: '23', name: 'Carrots', quantity: '500g', freshness: 'expiring', location: 'Crisper - Bottom', category: 'Vegetables', source: 'refrigerator' },
    ]
  },
  {
    id: 'door-shelves',
    name: 'Door Shelves',
    description: 'Beverages & condiments',
    icon: Package,
    color: 'text-neon-cyan',
    area: 'Refrigerator',
    items: [
      { id: '24', name: 'Nutrient-Rich Apple Juice', quantity: '1L', freshness: 'fresh', location: 'Door - Top Shelf', category: 'Beverages', source: 'refrigerator' },
      { id: '25', name: 'Orange Juice', quantity: '750ml', freshness: 'fresh', location: 'Door - Middle Shelf', category: 'Beverages', source: 'refrigerator' },
      { id: '26', name: 'Juice Boxes', quantity: '6 pack', freshness: 'fresh', location: 'Door - Bottom Shelf', category: 'Beverages', source: 'refrigerator' },
      { id: '27', name: 'Sparkling Water', quantity: '1.5L', freshness: 'fresh', location: 'Door - Side', category: 'Beverages', source: 'refrigerator' },
    ]
  },
  {
    id: 'snack-cabinet',
    name: 'Snack Cabinet',
    description: 'Kids snacks & healthy treats',
    icon: Package,
    color: 'text-neon-purple',
    area: 'Kitchen',
    items: [
      { id: '28', name: 'Kids Snacks', quantity: '8 packs', stockLevel: 'medium', location: 'Snack Cabinet', category: 'Snacks', source: 'kitchen' },
      { id: '29', name: 'Freeze-Dried Banana Snacks', quantity: '4 packs', stockLevel: 'low', location: 'Snack Cabinet', category: 'Snacks', source: 'kitchen' },
      { id: '30', name: 'Probiotic Yogurt Cubes', quantity: '6 packs', stockLevel: 'medium', location: 'Snack Cabinet', category: 'Snacks', source: 'kitchen' },
    ]
  }
];

interface ShelfInventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShelfInventoryModal = ({ isOpen, onClose }: ShelfInventoryModalProps) => {
  const [currentView, setCurrentView] = useState<'shelves' | 'shelf-detail'>('shelves');
  const [selectedShelf, setSelectedShelf] = useState<Shelf | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterArea, setFilterArea] = useState<'All' | 'Kitchen' | 'Refrigerator'>('All');

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

  const filteredShelves = shelfData.filter(shelf => {
    const matchesArea = filterArea === 'All' || shelf.area === filterArea;
    const matchesSearch = shelf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shelf.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shelf.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesArea && matchesSearch;
  });

  const handleShelfClick = (shelf: Shelf) => {
    setSelectedShelf(shelf);
    setCurrentView('shelf-detail');
  };

  const handleBackToShelves = () => {
    setCurrentView('shelves');
    setSelectedShelf(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl h-[90vh] bg-gradient-card border-border/50 shadow-neon animate-scale-in">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <div className="p-2 rounded-lg bg-neon-purple/20">
              <Layers className="h-6 w-6 text-neon-purple" />
            </div>
            {currentView === 'shelves' ? 'Smart Shelf Explorer' : `${selectedShelf?.name} - Items`}
            {currentView === 'shelf-detail' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToShelves}
                className="ml-4 text-neon-cyan hover:text-neon-purple transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Shelves
              </Button>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <div className="h-full flex flex-col">
            {/* Search and Filters */}
            <div className="mb-6 space-y-4 animate-fade-in">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={currentView === 'shelves' ? "Search shelves..." : "Search items..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-card/50 border border-border/50 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-neon-cyan/50 transition-colors"
                />
              </div>

              {currentView === 'shelves' && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {['All', 'Kitchen', 'Refrigerator'].map((area) => (
                    <Badge
                      key={area}
                      variant={filterArea === area ? "default" : "secondary"}
                      className={`cursor-pointer whitespace-nowrap transition-all duration-200 ${
                        filterArea === area 
                          ? 'bg-primary text-primary-foreground shadow-neon' 
                          : 'hover:bg-secondary/80'
                      }`}
                      onClick={() => setFilterArea(area as any)}
                    >
                      {area}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto">
              {currentView === 'shelves' ? (
                // Shelves Overview
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                  {filteredShelves.map((shelf) => {
                    const IconComponent = shelf.icon;
                    return (
                      <div
                        key={shelf.id}
                        onClick={() => handleShelfClick(shelf)}
                        className="group cursor-pointer p-6 rounded-xl bg-card/30 border border-border/30 hover:border-neon-cyan/50 transition-all duration-300 hover:shadow-neon/50 hover:scale-105 animate-scale-in"
                        style={{ animationDelay: `${filteredShelves.indexOf(shelf) * 0.1}s` }}
                      >
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className={`p-3 rounded-lg bg-card/50 ${shelf.color}`}>
                              <IconComponent className="h-6 w-6" />
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge 
                                variant="secondary" 
                                className={`${shelf.area === 'Kitchen' ? 'bg-neon-purple/10 text-neon-purple' : 'bg-neon-cyan/10 text-neon-cyan'}`}
                              >
                                {shelf.area}
                              </Badge>
                              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-neon-cyan transition-colors" />
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="font-semibold text-foreground group-hover:text-neon-cyan transition-colors mb-2">
                              {shelf.name}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-3">
                              {shelf.description}
                            </p>
                            
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Items:</span>
                              <Badge variant="outline" className="bg-gradient-subtle">
                                {shelf.items.length}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                // Shelf Detail View
                selectedShelf && (
                  <div className="space-y-6 animate-slide-in-right">
                    {/* Shelf Header */}
                    <div className="p-6 rounded-xl bg-card/30 border border-border/30">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg bg-card/50 ${selectedShelf.color}`}>
                          <selectedShelf.icon className="h-8 w-8" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-foreground">{selectedShelf.name}</h3>
                          <p className="text-muted-foreground">{selectedShelf.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="secondary" className={`${selectedShelf.area === 'Kitchen' ? 'bg-neon-purple/10 text-neon-purple' : 'bg-neon-cyan/10 text-neon-cyan'}`}>
                              {selectedShelf.area}
                            </Badge>
                            <Badge variant="outline">
                              {selectedShelf.items.length} items
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Items Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {selectedShelf.items.map((item, index) => (
                        <div
                          key={item.id}
                          className="p-4 rounded-xl bg-card/30 border border-border/30 hover:border-neon-cyan/50 transition-all duration-300 hover:shadow-neon/50 animate-fade-in"
                          style={{ animationDelay: `${index * 0.05}s` }}
                        >
                          <div className="space-y-3">
                            <div className="flex items-start justify-between">
                              <h4 className="font-semibold text-foreground">{item.name}</h4>
                              <div className="flex flex-col gap-1">
                                {item.freshness && (
                                  <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${getFreshnessColor(item.freshness)}`}>
                                    {item.freshness.charAt(0).toUpperCase() + item.freshness.slice(1)}
                                  </div>
                                )}
                                {item.stockLevel && (
                                  <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStockColor(item.stockLevel)}`}>
                                    {item.stockLevel.charAt(0).toUpperCase() + item.stockLevel.slice(1)}
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Quantity</span>
                                <span className="font-mono text-sm text-foreground">{item.quantity}</span>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Category</span>
                                <Badge variant="outline" className="text-xs">{item.category}</Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};