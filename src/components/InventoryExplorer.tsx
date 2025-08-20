import { useState } from 'react';
import { Card } from '@/components/ui/card';
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
  Layers
} from 'lucide-react';

interface InventoryCategory {
  id: string;
  name: string;
  icon: any;
  itemCount: number;
  subcategories: InventorySubcategory[];
  color: string;
}

interface InventorySubcategory {
  id: string;
  name: string;
  items: InventoryItem[];
}

interface InventoryItem {
  id: string;
  name: string;
  quantity: string;
  freshness?: 'fresh' | 'expiring' | 'expired';
  stockLevel?: 'high' | 'medium' | 'low' | 'empty';
  location: string;
}

const inventoryData: InventoryCategory[] = [
  {
    id: 'vegetables',
    name: 'Fresh Vegetables',
    icon: Carrot,
    itemCount: 12,
    color: 'text-status-fresh',
    subcategories: [
      {
        id: 'leafy',
        name: 'Leafy Greens',
        items: [
          { id: '1', name: 'Spinach', quantity: '200g', freshness: 'fresh', location: 'Fridge Crisper' },
          { id: '2', name: 'Lettuce', quantity: '1 head', freshness: 'expiring', location: 'Fridge Crisper' },
        ]
      },
      {
        id: 'root',
        name: 'Root Vegetables',
        items: [
          { id: '3', name: 'Baby Carrots', quantity: '300g', freshness: 'expiring', location: 'Fridge Drawer' },
          { id: '4', name: 'Potatoes', quantity: '1kg', freshness: 'fresh', location: 'Pantry Basket' },
        ]
      }
    ]
  },
  {
    id: 'beverages',
    name: 'Beverages',
    icon: Coffee,
    itemCount: 8,
    color: 'text-neon-cyan',
    subcategories: [
      {
        id: 'hot',
        name: 'Hot Beverages',
        items: [
          { id: '5', name: 'Ground Coffee', quantity: '200g', stockLevel: 'low', location: 'Coffee Station' },
          { id: '6', name: 'Green Tea', quantity: '50 bags', stockLevel: 'high', location: 'Pantry Shelf 2' },
        ]
      },
      {
        id: 'cold',
        name: 'Cold Beverages',
        items: [
          { id: '7', name: 'Apple Juice (Ron)', quantity: '750ml', freshness: 'fresh', location: 'Fridge Door' },
          { id: '8', name: 'Sparkling Water', quantity: '6 bottles', stockLevel: 'medium', location: 'Fridge Shelf' },
        ]
      }
    ]
  },
  {
    id: 'consumables',
    name: 'Consumables',
    icon: Package,
    itemCount: 15,
    color: 'text-neon-purple',
    subcategories: [
      {
        id: 'snacks',
        name: 'Snacks & Treats',
        items: [
          { id: '9', name: 'Granola Bars', quantity: '8 bars', stockLevel: 'medium', location: 'Pantry Shelf 1' },
          { id: '10', name: 'Kids Crackers (Ron)', quantity: '2 packs', stockLevel: 'low', location: 'Pantry Shelf 2' },
        ]
      },
      {
        id: 'household',
        name: 'Household Items',
        items: [
          { id: '11', name: 'Paper Towels', quantity: '4 rolls', stockLevel: 'high', location: 'Storage Closet' },
          { id: '12', name: 'Dish Soap', quantity: '1 bottle', stockLevel: 'medium', location: 'Under Sink' },
        ]
      }
    ]
  },
  {
    id: 'groceries',
    name: 'Grocery Staples',
    icon: Archive,
    itemCount: 20,
    color: 'text-neon-pink',
    subcategories: [
      {
        id: 'grains',
        name: 'Grains & Cereals',
        items: [
          { id: '13', name: 'Basmati Rice', quantity: '2.5kg', stockLevel: 'high', location: 'Pantry Shelf 1' },
          { id: '14', name: 'Kids Cereal (Ron)', quantity: '1 box', stockLevel: 'medium', location: 'Pantry Shelf 2' },
        ]
      },
      {
        id: 'condiments',
        name: 'Oils & Condiments',
        items: [
          { id: '15', name: 'Olive Oil', quantity: '250ml', stockLevel: 'low', location: 'Counter Top' },
          { id: '16', name: 'Soy Sauce', quantity: '500ml', stockLevel: 'high', location: 'Pantry Shelf 1' },
        ]
      }
    ]
  }
];

export const InventoryExplorer = ({ onDeepDive }: { onDeepDive?: () => void }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedSubcategories, setExpandedSubcategories] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'categories' | 'shelves'>('categories');

  const toggleSubcategory = (subcategoryId: string) => {
    const newExpanded = new Set(expandedSubcategories);
    if (newExpanded.has(subcategoryId)) {
      newExpanded.delete(subcategoryId);
    } else {
      newExpanded.add(subcategoryId);
    }
    setExpandedSubcategories(newExpanded);
  };

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

  const filteredCategories = inventoryData.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.subcategories.some(sub =>
      sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  );

  return (
    <Card className="bg-gradient-card border-border/50 shadow-glow transition-all duration-300 hover:shadow-neon cursor-pointer group" onClick={onDeepDive}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-neon-cyan/20">
              <Layers className="h-6 w-6 text-neon-cyan" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground group-hover:text-neon-cyan transition-colors">Inventory Explorer</h2>
              <p className="text-muted-foreground group-hover:text-neon-cyan/70 transition-colors">Deep dive into your household inventory • Click to explore</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge
              variant={viewMode === 'categories' ? "default" : "secondary"}
              className={`cursor-pointer ${viewMode === 'categories' ? 'bg-primary shadow-neon' : ''}`}
              onClick={() => setViewMode('categories')}
            >
              Categories
            </Badge>
            <Badge
              variant={viewMode === 'shelves' ? "default" : "secondary"}
              className={`cursor-pointer ${viewMode === 'shelves' ? 'bg-primary shadow-neon' : ''}`}
              onClick={() => setViewMode('shelves')}
            >
              Shelves
            </Badge>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search inventory..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-card/50 border border-border/50 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-neon-cyan/50 transition-colors"
          />
        </div>

        {!selectedCategory ? (
          // Category Overview
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className="group cursor-pointer p-4 rounded-lg bg-card/50 border border-border/30 hover:border-neon-cyan/50 transition-all duration-300 hover:shadow-neon/50"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-lg bg-card/50 ${category.color}`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-neon-cyan transition-colors" />
                  </div>
                  <h3 className="font-semibold text-foreground group-hover:text-neon-cyan transition-colors mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.itemCount} items
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          // Category Detail View
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className="text-neon-cyan hover:text-neon-purple"
              >
                ← Back to Categories
              </Button>
            </div>

            {inventoryData
              .filter(cat => cat.id === selectedCategory)
              .map(category => (
                <div key={category.id}>
                  <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <category.icon className={`h-5 w-5 ${category.color}`} />
                    {category.name}
                  </h3>

                  <div className="space-y-4">
                    {category.subcategories.map(subcategory => (
                      <div key={subcategory.id} className="border border-border/30 rounded-lg overflow-hidden">
                        <button
                          onClick={() => toggleSubcategory(subcategory.id)}
                          className="w-full flex items-center justify-between p-4 bg-card/30 hover:bg-card/50 transition-all duration-200"
                        >
                          <div className="flex items-center gap-2">
                            <Utensils className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium text-foreground">{subcategory.name}</span>
                            <Badge variant="secondary" className="ml-2">
                              {subcategory.items.length} items
                            </Badge>
                          </div>
                          {expandedSubcategories.has(subcategory.id) ? (
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          )}
                        </button>

                        {expandedSubcategories.has(subcategory.id) && (
                          <div className="p-4 bg-card/20 border-t border-border/30">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {subcategory.items.map(item => (
                                <div
                                  key={item.id}
                                  className="p-3 rounded-lg bg-card/50 border border-border/30 hover:border-neon-cyan/50 transition-all duration-300"
                                >
                                  <div className="flex items-start justify-between mb-2">
                                    <h4 className="font-medium text-foreground">{item.name}</h4>
                                    {item.freshness && (
                                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getFreshnessColor(item.freshness)}`}>
                                        {item.freshness.toUpperCase()}
                                      </div>
                                    )}
                                    {item.stockLevel && !item.freshness && (
                                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStockColor(item.stockLevel)}`}>
                                        {item.stockLevel.toUpperCase()}
                                      </div>
                                    )}
                                  </div>
                                  <div className="space-y-1 text-sm">
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Quantity</span>
                                      <span className="font-mono text-foreground">{item.quantity}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Location</span>
                                      <span className="text-foreground">{item.location}</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </Card>
  );
};