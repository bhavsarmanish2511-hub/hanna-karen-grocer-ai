import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Package, 
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
  category: string;
  source: 'refrigerator' | 'kitchen';
}

// Combined items from Smart Refrigerator and Smart Kitchen
const allInventoryItems: InventoryItem[] = [
  // From Refrigerator
  { id: '1', name: 'Milk', quantity: '1.2L', freshness: 'fresh', location: 'Main Shelf - Front', category: 'Dairy', source: 'refrigerator' },
  { id: '2', name: 'Greek Yogurt', quantity: '500g', freshness: 'fresh', location: 'Main Shelf - Back', category: 'Dairy', source: 'refrigerator' },
  { id: '3', name: 'Eggs', quantity: '12 count', freshness: 'fresh', location: 'Main Shelf - Side', category: 'Dairy', source: 'refrigerator' },
  { id: '4', name: 'Butter', quantity: '250g', freshness: 'fresh', location: 'Main Shelf - Corner', category: 'Dairy', source: 'refrigerator' },
  { id: '5', name: 'Cheese', quantity: '400g', freshness: 'fresh', location: 'Main Shelf - Center', category: 'Dairy', source: 'refrigerator' },
  { id: '6', name: 'Onions', quantity: '800g', freshness: 'fresh', location: 'Crisper - Left Side', category: 'Vegetables', source: 'refrigerator' },
  { id: '7', name: 'Avocado', quantity: '3 pieces', freshness: 'fresh', location: 'Crisper - Center', category: 'Vegetables', source: 'refrigerator' },
  { id: '8', name: 'Tomatoes', quantity: '500g', freshness: 'fresh', location: 'Crisper - Right Side', category: 'Vegetables', source: 'refrigerator' },
  { id: '9', name: 'Lettuce', quantity: '1 head', freshness: 'fresh', location: 'Crisper - Back Left', category: 'Vegetables', source: 'refrigerator' },
  { id: '10', name: 'Spinach', quantity: '200g', freshness: 'fresh', location: 'Crisper - Back Right', category: 'Vegetables', source: 'refrigerator' },
  { id: '11', name: 'Bell Peppers', quantity: '3 pieces', freshness: 'fresh', location: 'Crisper - Front', category: 'Vegetables', source: 'refrigerator' },
  { id: '12', name: 'Broccoli', quantity: '1 head', freshness: 'fresh', location: 'Crisper - Side', category: 'Vegetables', source: 'refrigerator' },
  { id: '13', name: 'Carrots', quantity: '500g', freshness: 'expiring', location: 'Crisper - Bottom', category: 'Vegetables', source: 'refrigerator' },
  { id: '14', name: 'Nutrient-Rich Apple Juice', quantity: '1L', freshness: 'fresh', location: 'Door - Top Shelf', category: 'Beverages', source: 'refrigerator' },
  { id: '15', name: 'Orange Juice', quantity: '750ml', freshness: 'fresh', location: 'Door - Middle Shelf', category: 'Beverages', source: 'refrigerator' },
  { id: '16', name: 'Juice Boxes', quantity: '6 pack', freshness: 'fresh', location: 'Door - Bottom Shelf', category: 'Beverages', source: 'refrigerator' },
  { id: '17', name: 'Sparkling Water', quantity: '1.5L', freshness: 'fresh', location: 'Door - Side', category: 'Beverages', source: 'refrigerator' },
  { id: '18', name: 'Chicken Breast', quantity: '1kg', freshness: 'fresh', location: 'Freezer - Main Tray', category: 'Meat', source: 'refrigerator' },
  { id: '19', name: 'Organic Apples', quantity: '1kg', freshness: 'fresh', location: 'Freezer - Fruit Section', category: 'Fruits', source: 'refrigerator' },
  { id: '20', name: 'Strawberries', quantity: '500g', freshness: 'fresh', location: 'Freezer - Berry Section', category: 'Fruits', source: 'refrigerator' },
  { id: '21', name: 'Fresh Herbs', quantity: '100g', freshness: 'fresh', location: 'Freezer - Herb Tray', category: 'Herbs', source: 'refrigerator' },
  
  // From Kitchen
  { id: '22', name: 'Basmati Rice', quantity: '2.5kg', stockLevel: 'low', location: 'Pantry Shelf 1', category: 'Grains', source: 'kitchen' },
  { id: '23', name: 'Whole Wheat Flour', quantity: '1kg', stockLevel: 'medium', location: 'Pantry Shelf 1', category: 'Baking', source: 'kitchen' },
  { id: '24', name: 'Pasta', quantity: '500g', stockLevel: 'high', location: 'Pantry Shelf 1', category: 'Grains', source: 'kitchen' },
  { id: '25', name: 'Lentils', quantity: '800g', stockLevel: 'medium', location: 'Pantry Shelf 1', category: 'Legumes', source: 'kitchen' },
  { id: '26', name: 'Sustainable Rice Pack', quantity: '1kg', stockLevel: 'high', location: 'Pantry Shelf 1', category: 'Grains', source: 'kitchen' },
  { id: '27', name: 'Al Breakfast Cereals', quantity: '2 boxes', stockLevel: 'medium', location: 'Pantry Shelf 2', category: 'Breakfast', source: 'kitchen' },
  { id: '28', name: 'Oats', quantity: '1kg', stockLevel: 'high', location: 'Pantry Shelf 2', category: 'Breakfast', source: 'kitchen' },
  { id: '29', name: 'Bread', quantity: '2 loaves', stockLevel: 'medium', location: 'Pantry Shelf 2', category: 'Bakery', source: 'kitchen' },
  { id: '30', name: 'Sugar', quantity: '1kg', stockLevel: 'high', location: 'Pantry Shelf 2', category: 'Sweeteners', source: 'kitchen' },
  { id: '31', name: 'Salt', quantity: '500g', stockLevel: 'high', location: 'Pantry Shelf 2', category: 'Seasonings', source: 'kitchen' },
  { id: '32', name: 'Honey', quantity: '50g', stockLevel: 'empty', location: 'Spice Rack', category: 'Sweeteners', source: 'kitchen' },
  { id: '33', name: 'Spices', quantity: '12 bottles', stockLevel: 'medium', location: 'Spice Rack', category: 'Seasonings', source: 'kitchen' },
  { id: '34', name: 'Sauces', quantity: '6 bottles', stockLevel: 'medium', location: 'Spice Rack', category: 'Condiments', source: 'kitchen' },
  { id: '35', name: 'Baking Powder', quantity: '200g', stockLevel: 'low', location: 'Spice Rack', category: 'Baking', source: 'kitchen' },
  { id: '36', name: 'Coffee', quantity: '200g', stockLevel: 'low', location: 'Beverage Station', category: 'Beverages', source: 'kitchen' },
  { id: '37', name: 'Tea', quantity: '40 bags', stockLevel: 'medium', location: 'Beverage Station', category: 'Beverages', source: 'kitchen' },
  { id: '38', name: 'Green Tea', quantity: '30 bags', stockLevel: 'high', location: 'Beverage Station', category: 'Beverages', source: 'kitchen' },
  { id: '39', name: 'Kids Snacks', quantity: '8 packs', stockLevel: 'medium', location: 'Snack Cabinet', category: 'Snacks', source: 'kitchen' },
  { id: '40', name: 'Freeze-Dried Banana Snacks', quantity: '4 packs', stockLevel: 'low', location: 'Snack Cabinet', category: 'Snacks', source: 'kitchen' },
  { id: '41', name: 'Probiotic Yogurt Cubes', quantity: '6 packs', stockLevel: 'medium', location: 'Snack Cabinet', category: 'Snacks', source: 'kitchen' },
  { id: '42', name: 'Dish Soap', quantity: '1 bottle', stockLevel: 'low', location: 'Cleaning Cabinet', category: 'Cleaning', source: 'kitchen' },
  { id: '43', name: 'Paper Towels', quantity: '4 rolls', stockLevel: 'high', location: 'Cleaning Cabinet', category: 'Cleaning', source: 'kitchen' },
  { id: '44', name: 'Laundry Detergent', quantity: '1 bottle', stockLevel: 'medium', location: 'Cleaning Cabinet', category: 'Cleaning', source: 'kitchen' },
  { id: '45', name: 'Smart Cleaning Pods', quantity: '12 pods', stockLevel: 'high', location: 'Cleaning Cabinet', category: 'Cleaning', source: 'kitchen' },
  { id: '46', name: 'Plasma Cleaning Spray', quantity: '2 bottles', stockLevel: 'medium', location: 'Cleaning Cabinet', category: 'Cleaning', source: 'kitchen' },
  { id: '47', name: 'Organic Baby Powder', quantity: '1 container', stockLevel: 'low', location: 'Cleaning Cabinet', category: 'Baby Care', source: 'kitchen' },
  { id: '48', name: 'Premium Organic Tofu', quantity: '400g', stockLevel: 'low', location: 'Specialty Items', category: 'Plant Protein', source: 'kitchen' },
];

const categories = ['All Categories', 'Vegetables', 'Dairy', 'Beverages', 'Grains', 'Meat', 'Fruits', 'Herbs', 'Baking', 'Breakfast', 'Snacks', 'Cleaning', 'Baby Care', 'Plant Protein'];

interface InventoryExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InventoryExplorerModal = ({ isOpen, onClose }: InventoryExplorerModalProps) => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
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

  const filteredItems = allInventoryItems.filter(item => {
    const matchesCategory = selectedCategory === 'All Categories' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalItems = allInventoryItems.length;

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
          <div className="h-full flex flex-col">
            {/* Search and Filters */}
            <div className="mb-6 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search all items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-card/50 border border-border/50 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-neon-cyan/50 transition-colors"
                />
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "secondary"}
                    className={`cursor-pointer whitespace-nowrap transition-all duration-200 ${
                      selectedCategory === category 
                        ? 'bg-primary text-primary-foreground shadow-neon' 
                        : 'hover:bg-secondary/80'
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            {/* All Items Grid */}
            <div className="flex-1 overflow-auto">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Warehouse className="h-5 w-5 text-neon-cyan" />
                  <span className="text-lg font-semibold text-foreground">Complete Inventory Overview</span>
                  <Badge variant="outline" className="ml-2">
                    {filteredItems.length} of {totalItems} items
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl bg-card/30 border border-border/30 hover:border-neon-cyan/50 transition-all duration-300 hover:shadow-neon/50"
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
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Source</span>
                            <Badge 
                              variant="secondary" 
                              className={`text-xs ${
                                item.source === 'refrigerator' ? 'bg-neon-cyan/10 text-neon-cyan' : 'bg-neon-purple/10 text-neon-purple'
                              }`}
                            >
                              {item.source === 'refrigerator' ? 'Fridge' : 'Kitchen'}
                            </Badge>
                          </div>
                          
                          <div className="pt-2 border-t border-border/30">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{item.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredItems.length === 0 && (
                  <div className="text-center py-12">
                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No items found matching your search criteria.</p>
                  </div>
                )}
              </div>

              {/* Items Requiring Attention */}
              <div className="border-t border-border/30 pt-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Items Requiring Attention</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {allInventoryItems
                    .filter(item => item.stockLevel === 'low' || item.stockLevel === 'empty' || item.freshness === 'expiring')
                    .slice(0, 8)
                    .map((item) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-lg bg-card/50 border border-border/30 hover:border-neon-cyan/50 transition-all duration-300"
                      >
                        <div className="space-y-2">
                          <h4 className="font-medium text-foreground text-sm">{item.name}</h4>
                          <div className="text-xs text-muted-foreground">{item.location}</div>
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
        </div>
      </DialogContent>
    </Dialog>
  );
};