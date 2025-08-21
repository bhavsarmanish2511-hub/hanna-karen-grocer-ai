import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ShoppingCart, 
  Bot, 
  Trash2, 
  Plus, 
  Minus,
  Package,
  DollarSign,
  Clock,
  Truck,
  Store,
  CreditCard
} from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  estimatedPrice: string;
  aiSuggested: boolean;
  urgency: 'high' | 'medium' | 'low';
  lastPurchased?: string;
  preferredStore?: string;
}

const cartItems: CartItem[] = [
  { id: '1', name: 'Onions', quantity: 1, unit: 'kg', category: 'Vegetables', estimatedPrice: '$2.50', aiSuggested: true, urgency: 'medium', lastPurchased: '2024-01-10', preferredStore: 'Fresh Market' },
  { id: '2', name: 'Avocado', quantity: 3, unit: 'pieces', category: 'Vegetables', estimatedPrice: '$4.20', aiSuggested: true, urgency: 'high', lastPurchased: '2024-01-08', preferredStore: 'Fresh Market' },
  { id: '3', name: 'Tomato', quantity: 500, unit: 'g', category: 'Vegetables', estimatedPrice: '$3.80', aiSuggested: true, urgency: 'medium', lastPurchased: '2024-01-09', preferredStore: 'SuperMart' },
  { id: '4', name: 'Milk', quantity: 2, unit: 'L', category: 'Dairy', estimatedPrice: '$4.50', aiSuggested: true, urgency: 'high', lastPurchased: '2024-01-07', preferredStore: 'Daily Needs' },
  { id: '5', name: 'Greek Yogurt', quantity: 1, unit: 'container', category: 'Dairy', estimatedPrice: '$5.20', aiSuggested: true, urgency: 'medium', lastPurchased: '2024-01-05', preferredStore: 'Fresh Market' },
  { id: '6', name: 'Premium Organic Tofu', quantity: 1, unit: 'pack', category: 'Plant Protein', estimatedPrice: '$6.90', aiSuggested: true, urgency: 'low', lastPurchased: '2024-01-02', preferredStore: 'Organic Store' },
  { id: '7', name: 'Nutrient-Rich Apple Juice', quantity: 1, unit: 'L', category: 'Beverages', estimatedPrice: '$3.20', aiSuggested: true, urgency: 'medium', lastPurchased: '2024-01-06', preferredStore: 'Kids Corner' },
  { id: '8', name: 'Kids Snacks', quantity: 2, unit: 'packs', category: 'Snacks', estimatedPrice: '$4.20', aiSuggested: true, urgency: 'high', lastPurchased: '2024-01-04', preferredStore: 'Kids Corner' },
  { id: '9', name: 'Chicken Breast', quantity: 1, unit: 'kg', category: 'Meat', estimatedPrice: '$12.50', aiSuggested: true, urgency: 'medium', lastPurchased: '2024-01-03', preferredStore: 'Butcher Shop' },
  { id: '10', name: 'Organic Apples', quantity: 1, unit: 'kg', category: 'Fruits', estimatedPrice: '$5.80', aiSuggested: true, urgency: 'low', lastPurchased: '2024-01-08', preferredStore: 'Fresh Market' },
  { id: '11', name: 'Dish Soap', quantity: 1, unit: 'bottle', category: 'Cleaning', estimatedPrice: '$3.90', aiSuggested: true, urgency: 'medium', lastPurchased: '2023-12-28', preferredStore: 'SuperMart' },
  { id: '12', name: 'Coffee', quantity: 1, unit: 'pack', category: 'Beverages', estimatedPrice: '$8.50', aiSuggested: true, urgency: 'high', lastPurchased: '2024-01-01', preferredStore: 'Coffee House' },
  { id: '13', name: 'Basmati Rice', quantity: 1, unit: 'kg', category: 'Grains', estimatedPrice: '$7.20', aiSuggested: true, urgency: 'low', lastPurchased: '2023-12-25', preferredStore: 'Asian Market' },
  { id: '14', name: 'Lettuce', quantity: 1, unit: 'head', category: 'Vegetables', estimatedPrice: '$2.80', aiSuggested: true, urgency: 'medium', lastPurchased: '2024-01-09', preferredStore: 'Fresh Market' },
];

interface CartDeepDiveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDeepDiveModal = ({ isOpen, onClose }: CartDeepDiveModalProps) => {
  const [items, setItems] = useState<CartItem[]>(cartItems);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'urgency' | 'price' | 'category'>('urgency');

  const categories = ['All', ...new Set(items.map(item => item.category))];
  
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setItems(items => items.filter(item => item.id !== id));
    } else {
      setItems(items => 
        items.map(item => 
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeItem = (id: string) => {
    setItems(items => items.filter(item => item.id !== id));
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'text-status-expired border-status-expired/30 bg-status-expired/10';
      case 'medium': return 'text-status-expiring border-status-expiring/30 bg-status-expiring/10';
      case 'low': return 'text-status-fresh border-status-fresh/30 bg-status-fresh/10';
      default: return 'text-foreground';
    }
  };

  const filteredItems = items
    .filter(item => selectedCategory === 'All' || item.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === 'urgency') {
        const urgencyOrder = { high: 3, medium: 2, low: 1 };
        return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
      } else if (sortBy === 'price') {
        return parseFloat(b.estimatedPrice.replace('$', '')) - parseFloat(a.estimatedPrice.replace('$', ''));
      } else {
        return a.category.localeCompare(b.category);
      }
    });

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => 
    sum + (parseFloat(item.estimatedPrice.replace('$', '')) * item.quantity), 0
  );

  const storeGroups = items.reduce((acc, item) => {
    const store = item.preferredStore || 'Unknown Store';
    if (!acc[store]) acc[store] = [];
    acc[store].push(item);
    return acc;
  }, {} as Record<string, CartItem[]>);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl h-[90vh] bg-gradient-card border-border/50 shadow-neon animate-scale-in">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <div className="p-2 rounded-lg bg-neon-cyan/20 animate-glow-pulse">
              <ShoppingCart className="h-6 w-6 text-neon-cyan" />
            </div>
            Smart Cart - Deep Analysis
            <Badge variant="outline" className="ml-2 bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30">
              <Bot className="h-3 w-3 mr-1" />
              AI-Curated
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <div className="h-full flex flex-col">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 animate-fade-in">
              <div className="p-4 rounded-lg bg-gradient-subtle border border-neon-cyan/30">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="h-4 w-4 text-neon-cyan" />
                  <span className="text-sm text-muted-foreground">Total Items</span>
                </div>
                <div className="text-2xl font-bold text-foreground">{totalItems}</div>
              </div>
              
              <div className="p-4 rounded-lg bg-gradient-subtle border border-neon-purple/30">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-4 w-4 text-neon-purple" />
                  <span className="text-sm text-muted-foreground">Estimated Total</span>
                </div>
                <div className="text-2xl font-bold text-foreground">${totalPrice.toFixed(2)}</div>
              </div>
              
              <div className="p-4 rounded-lg bg-gradient-subtle border border-neon-pink/30">
                <div className="flex items-center gap-2 mb-2">
                  <Store className="h-4 w-4 text-neon-pink" />
                  <span className="text-sm text-muted-foreground">Stores</span>
                </div>
                <div className="text-2xl font-bold text-foreground">{Object.keys(storeGroups).length}</div>
              </div>
              
              <div className="p-4 rounded-lg bg-gradient-subtle border border-status-expiring/30">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-status-expiring" />
                  <span className="text-sm text-muted-foreground">High Priority</span>
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {items.filter(item => item.urgency === 'high').length}
                </div>
              </div>
            </div>

            {/* Filters and Sort */}
            <div className="flex gap-4 mb-6 animate-fade-in">
              <div className="flex gap-2 overflow-x-auto">
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
              
              <div className="flex gap-2">
                <Badge
                  variant={sortBy === 'urgency' ? "default" : "secondary"}
                  className="cursor-pointer"
                  onClick={() => setSortBy('urgency')}
                >
                  Sort by Urgency
                </Badge>
                <Badge
                  variant={sortBy === 'price' ? "default" : "secondary"}
                  className="cursor-pointer"
                  onClick={() => setSortBy('price')}
                >
                  Sort by Price
                </Badge>
                <Badge
                  variant={sortBy === 'category' ? "default" : "secondary"}
                  className="cursor-pointer"
                  onClick={() => setSortBy('category')}
                >
                  Sort by Category
                </Badge>
              </div>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-auto">
              <div className="space-y-4">
                {filteredItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="group relative p-6 rounded-xl bg-card/30 border border-border/30 hover:border-neon-cyan/50 transition-all duration-300 hover:shadow-neon/50 animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h4 className="font-semibold text-foreground text-lg group-hover:text-neon-cyan transition-colors">
                            {item.name}
                          </h4>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(item.urgency)}`}>
                            {item.urgency.toUpperCase()} PRIORITY
                          </div>
                          {item.aiSuggested && (
                            <Badge variant="outline" className="text-xs px-2 py-0 bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30">
                              <Bot className="h-3 w-3 mr-1" />
                              AI
                            </Badge>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                          <div className="space-y-1">
                            <span className="text-xs text-muted-foreground">Category</span>
                            <Badge variant="secondary" className="text-xs">
                              {item.category}
                            </Badge>
                          </div>
                          
                          <div className="space-y-1">
                            <span className="text-xs text-muted-foreground">Unit Price</span>
                            <span className="text-sm font-mono text-foreground">
                              {item.estimatedPrice}
                            </span>
                          </div>
                          
                          <div className="space-y-1">
                            <span className="text-xs text-muted-foreground">Preferred Store</span>
                            <span className="text-sm text-foreground">
                              {item.preferredStore || 'Any Store'}
                            </span>
                          </div>
                          
                          <div className="space-y-1">
                            <span className="text-xs text-muted-foreground">Last Purchased</span>
                            <span className="text-sm text-muted-foreground">
                              {item.lastPurchased ? new Date(item.lastPurchased).toLocaleDateString() : 'Never'}
                            </span>
                          </div>
                        </div>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-muted-foreground">Quantity:</span>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-6 w-6 p-0 hover:bg-neon-cyan/10 hover:border-neon-cyan/50"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-mono px-3 py-1 bg-muted/20 rounded">
                            {item.quantity} {item.unit}
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-6 w-6 p-0 hover:bg-neon-cyan/10 hover:border-neon-cyan/50"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-3">
                        <div className="text-lg font-mono text-foreground">
                          ${(parseFloat(item.estimatedPrice.replace('$', '')) * item.quantity).toFixed(2)}
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-status-expired hover:bg-status-expired/10"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-4 border-t border-border/30 flex gap-4 animate-fade-in">
              <Button className="flex-1 bg-gradient-primary hover:bg-gradient-primary/80 text-primary-foreground shadow-neon">
                <CreditCard className="h-4 w-4 mr-2" />
                Order Online - ${totalPrice.toFixed(2)}
              </Button>
              <Button variant="outline" className="border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10">
                <Truck className="h-4 w-4 mr-2" />
                Schedule Delivery
              </Button>
              <Button variant="outline" className="border-neon-purple/50 text-neon-purple hover:bg-neon-purple/10">
                <Store className="h-4 w-4 mr-2" />
                Find Nearby Stores
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};