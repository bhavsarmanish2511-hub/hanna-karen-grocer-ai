import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Bot, Trash2, Plus, Minus } from 'lucide-react';
import { useState } from 'react';

interface CartItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  estimatedPrice: string;
  aiSuggested: boolean;
}

const initialCartItems: CartItem[] = [
  { id: '1', name: 'Onions', quantity: 1, unit: 'kg', category: 'Vegetables', estimatedPrice: '$2.50', aiSuggested: true },
  { id: '2', name: 'Avocado', quantity: 3, unit: 'pieces', category: 'Vegetables', estimatedPrice: '$4.20', aiSuggested: true },
  { id: '3', name: 'Tomato', quantity: 500, unit: 'g', category: 'Vegetables', estimatedPrice: '$3.80', aiSuggested: true },
  { id: '4', name: 'Milk', quantity: 2, unit: 'L', category: 'Dairy', estimatedPrice: '$4.50', aiSuggested: true },
  { id: '5', name: 'Greek Yogurt', quantity: 1, unit: 'container', category: 'Dairy', estimatedPrice: '$5.20', aiSuggested: true },
  { id: '6', name: 'Premium Organic Tofu', quantity: 1, unit: 'pack', category: 'Plant Protein', estimatedPrice: '$6.90', aiSuggested: true },
  { id: '7', name: 'Nutrient-Rich Apple Juice', quantity: 1, unit: 'L', category: 'Beverages', estimatedPrice: '$3.20', aiSuggested: true },
  { id: '8', name: 'Kids Snacks', quantity: 2, unit: 'packs', category: 'Snacks', estimatedPrice: '$4.20', aiSuggested: true },
  { id: '9', name: 'Chicken Breast', quantity: 1, unit: 'kg', category: 'Meat', estimatedPrice: '$12.50', aiSuggested: true },
  { id: '10', name: 'Organic Apples', quantity: 1, unit: 'kg', category: 'Fruits', estimatedPrice: '$5.80', aiSuggested: true },
  { id: '11', name: 'Dish Soap', quantity: 1, unit: 'bottle', category: 'Cleaning', estimatedPrice: '$3.90', aiSuggested: true },
  { id: '12', name: 'Coffee', quantity: 1, unit: 'pack', category: 'Beverages', estimatedPrice: '$8.50', aiSuggested: true },
  { id: '13', name: 'Basmati Rice', quantity: 1, unit: 'kg', category: 'Grains', estimatedPrice: '$7.20', aiSuggested: true },
  { id: '14', name: 'Lettuce', quantity: 1, unit: 'head', category: 'Vegetables', estimatedPrice: '$2.80', aiSuggested: true },
];

export const CartOverview = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCartItems(items => items.filter(item => item.id !== id));
    } else {
      setCartItems(items => 
        items.map(item => 
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => 
    sum + (parseFloat(item.estimatedPrice.replace('$', '')) * item.quantity), 0
  );

  return (
    <Card className="bg-gradient-card border-border/50 shadow-glow transition-all duration-300 hover:shadow-neon">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-neon-cyan/20 animate-glow-pulse">
            <ShoppingCart className="h-6 w-6 text-neon-cyan" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Smart Cart</h2>
            <p className="text-muted-foreground flex items-center gap-1">
              <Bot className="h-3 w-3" />
              AI-Prepared by Karen
            </p>
          </div>
        </div>

        {/* Cart Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6 p-4 rounded-lg bg-muted/20 border border-neon-cyan/30">
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Total Items</div>
            <div className="text-lg font-bold text-foreground">{totalItems}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Categories</div>
            <div className="text-lg font-bold text-neon-purple">
              {new Set(cartItems.map(item => item.category)).size}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Estimated Total</div>
            <div className="text-lg font-bold text-neon-cyan">${totalPrice.toFixed(2)}</div>
          </div>
        </div>

        {/* Cart Items */}
        <div className="space-y-3 max-h-96 overflow-y-auto mb-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="group relative p-4 rounded-lg bg-card/50 border border-border/30 hover:border-neon-cyan/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-foreground group-hover:text-neon-cyan transition-colors">
                      {item.name}
                    </h4>
                    {item.aiSuggested && (
                      <Badge variant="outline" className="text-xs px-2 py-0 bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30">
                        <Bot className="h-3 w-3 mr-1" />
                        AI
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {item.category}
                    </Badge>
                    <span className="text-sm font-mono text-foreground">
                      {item.estimatedPrice} each
                    </span>
                  </div>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-6 w-6 p-0 hover:bg-neon-cyan/10 hover:border-neon-cyan/50"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-sm font-mono px-2 py-1 bg-muted/20 rounded">
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
                
                <div className="flex flex-col items-end gap-2">
                  <div className="text-sm font-mono text-foreground">
                    ${(parseFloat(item.estimatedPrice.replace('$', '')) * item.quantity).toFixed(2)}
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0 text-status-expired hover:bg-status-expired/10"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {cartItems.length === 0 && (
          <div className="text-center py-8">
            <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Your cart is empty</p>
          </div>
        )}
      </div>
    </Card>
  );
};