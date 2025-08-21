import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Bot, 
  CheckCircle2, 
  Circle,
  Clock,
  ShoppingCart,
  Users,
  Baby,
  Heart,
  Lightbulb,
  TrendingUp,
  Calendar,
  MapPin
} from 'lucide-react';

interface GroceryItem {
  id: string;
  name: string;
  category: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
  forWho: 'family' | 'ron' | 'hanna';
  aiConfidence: number;
  estimatedPrice: string;
  healthBenefit?: string;
  lastPurchased?: string;
  completed: boolean;
}

const groceryItems: GroceryItem[] = [
  {
    id: '1',
    name: 'Organic Milk (2L)',
    category: 'Dairy',
    reason: 'Running low - family essential',
    priority: 'high',
    forWho: 'family',
    aiConfidence: 95,
    estimatedPrice: '$4.50',
    healthBenefit: 'Rich in calcium and protein',
    lastPurchased: '2024-01-07',
    completed: false
  },
  {
    id: '2',
    name: 'Honey Nut Cheerios',
    category: 'Breakfast',
    reason: "Ron's favorite cereal - almost empty",
    priority: 'high',
    forWho: 'ron',
    aiConfidence: 98,
    estimatedPrice: '$5.20',
    healthBenefit: 'Whole grain goodness for growing kids',
    lastPurchased: '2024-01-03',
    completed: false
  },
  {
    id: '3',
    name: 'Greek Yogurt (500g)',
    category: 'Dairy',
    reason: 'Perfect for healthy breakfast',
    priority: 'medium',
    forWho: 'hanna',
    aiConfidence: 87,
    estimatedPrice: '$3.80',
    healthBenefit: 'High in probiotics and protein',
    lastPurchased: '2024-01-05',
    completed: false
  },
  {
    id: '4',
    name: 'Fresh Avocados (3 pack)',
    category: 'Vegetables',
    reason: 'Healthy fats for the family',
    priority: 'medium',
    forWho: 'family',
    aiConfidence: 92,
    estimatedPrice: '$4.20',
    healthBenefit: 'Rich in healthy monounsaturated fats',
    lastPurchased: '2024-01-08',
    completed: true
  },
  {
    id: '5',
    name: 'Organic Apple Juice (1L)',
    category: 'Beverages',
    reason: "Ron's lunchbox essential",
    priority: 'medium',
    forWho: 'ron',
    aiConfidence: 89,
    estimatedPrice: '$3.20',
    healthBenefit: 'Vitamin C boost for immunity',
    lastPurchased: '2024-01-06',
    completed: false
  },
  {
    id: '6',
    name: 'Whole Grain Bread',
    category: 'Bakery',
    reason: 'Family staple - getting low',
    priority: 'high',
    forWho: 'family',
    aiConfidence: 94,
    estimatedPrice: '$2.80',
    healthBenefit: 'High fiber for digestive health',
    lastPurchased: '2024-01-04',
    completed: false
  },
  {
    id: '7',
    name: 'Premium Coffee Beans',
    category: 'Beverages',
    reason: "Hanna's morning essential",
    priority: 'high',
    forWho: 'hanna',
    aiConfidence: 96,
    estimatedPrice: '$8.50',
    healthBenefit: 'Antioxidants for brain health',
    lastPurchased: '2024-01-01',
    completed: false
  },
  {
    id: '8',
    name: 'Organic Chicken Breast (1kg)',
    category: 'Meat',
    reason: 'Lean protein for family meals',
    priority: 'medium',
    forWho: 'family',
    aiConfidence: 85,
    estimatedPrice: '$12.50',
    healthBenefit: 'High-quality protein for muscle health',
    lastPurchased: '2024-01-03',
    completed: false
  }
];

interface GroceryListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GroceryListModal = ({ isOpen, onClose }: GroceryListModalProps) => {
  const [items, setItems] = useState<GroceryItem[]>(groceryItems);
  const [filterPriority, setFilterPriority] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [filterPerson, setFilterPerson] = useState<'all' | 'family' | 'ron' | 'hanna'>('all');
  const [showCompleted, setShowCompleted] = useState<boolean>(true);

  const toggleItem = (id: string) => {
    setItems(items => 
      items.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-status-expired border-status-expired/30 bg-status-expired/10';
      case 'medium': return 'text-status-expiring border-status-expiring/30 bg-status-expiring/10';
      case 'low': return 'text-status-fresh border-status-fresh/30 bg-status-fresh/10';
      default: return 'text-foreground';
    }
  };

  const getPersonIcon = (person: string) => {
    switch (person) {
      case 'ron': return <Baby className="h-3 w-3" />;
      case 'hanna': return <Heart className="h-3 w-3" />;
      case 'family': return <Users className="h-3 w-3" />;
      default: return <Users className="h-3 w-3" />;
    }
  };

  const getPersonColor = (person: string) => {
    switch (person) {
      case 'ron': return 'bg-neon-purple/10 text-neon-purple border-neon-purple/30';
      case 'hanna': return 'bg-neon-pink/10 text-neon-pink border-neon-pink/30';
      case 'family': return 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30';
      default: return 'bg-muted/10 text-muted-foreground border-muted/30';
    }
  };

  const filteredItems = items.filter(item => {
    const priorityMatch = filterPriority === 'all' || item.priority === filterPriority;
    const personMatch = filterPerson === 'all' || item.forWho === filterPerson;
    const completedMatch = showCompleted || !item.completed;
    return priorityMatch && personMatch && completedMatch;
  });

  const totalItems = items.length;
  const completedItems = items.filter(item => item.completed).length;
  const totalEstimatedCost = items.reduce((sum, item) => 
    sum + parseFloat(item.estimatedPrice.replace('$', '')), 0
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] bg-gradient-card border-border/50 shadow-neon animate-scale-in">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <div className="p-2 rounded-lg bg-neon-purple/20 animate-glow-pulse">
              <Bot className="h-6 w-6 text-neon-purple" />
            </div>
            AI Grocery Intelligence
            <Badge variant="outline" className="ml-2 bg-neon-purple/10 text-neon-purple border-neon-purple/30">
              Smart Analysis
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <div className="h-full flex flex-col">
            {/* Summary Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 animate-fade-in">
              <div className="p-4 rounded-lg bg-gradient-subtle border border-neon-cyan/30">
                <div className="flex items-center gap-2 mb-2">
                  <ShoppingCart className="h-4 w-4 text-neon-cyan" />
                  <span className="text-sm text-muted-foreground">Total Items</span>
                </div>
                <div className="text-2xl font-bold text-foreground">{totalItems}</div>
                <div className="text-xs text-muted-foreground">{completedItems} completed</div>
              </div>
              
              <div className="p-4 rounded-lg bg-gradient-subtle border border-neon-purple/30">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-neon-purple" />
                  <span className="text-sm text-muted-foreground">AI Confidence</span>
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {Math.round(items.reduce((sum, item) => sum + item.aiConfidence, 0) / items.length)}%
                </div>
                <div className="text-xs text-muted-foreground">Average accuracy</div>
              </div>
              
              <div className="p-4 rounded-lg bg-gradient-subtle border border-neon-pink/30">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-neon-pink" />
                  <span className="text-sm text-muted-foreground">Estimated Cost</span>
                </div>
                <div className="text-2xl font-bold text-foreground">${totalEstimatedCost.toFixed(2)}</div>
                <div className="text-xs text-muted-foreground">For this list</div>
              </div>
              
              <div className="p-4 rounded-lg bg-gradient-subtle border border-status-fresh/30">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="h-4 w-4 text-status-fresh" />
                  <span className="text-sm text-muted-foreground">Smart Insights</span>
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {items.filter(item => item.priority === 'high').length}
                </div>
                <div className="text-xs text-muted-foreground">High priority items</div>
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-4 mb-6 animate-fade-in">
              <div className="flex gap-2">
                <span className="text-sm text-muted-foreground self-center">Priority:</span>
                {['all', 'high', 'medium', 'low'].map((priority) => (
                  <Badge
                    key={priority}
                    variant={filterPriority === priority ? "default" : "secondary"}
                    className={`cursor-pointer transition-all duration-200 ${
                      filterPriority === priority 
                        ? 'bg-primary text-primary-foreground shadow-neon' 
                        : 'hover:bg-secondary/80'
                    }`}
                    onClick={() => setFilterPriority(priority as any)}
                  >
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </Badge>
                ))}
              </div>
              
              <div className="flex gap-2">
                <span className="text-sm text-muted-foreground self-center">For:</span>
                {['all', 'family', 'ron', 'hanna'].map((person) => (
                  <Badge
                    key={person}
                    variant={filterPerson === person ? "default" : "secondary"}
                    className={`cursor-pointer transition-all duration-200 ${
                      filterPerson === person 
                        ? 'bg-primary text-primary-foreground shadow-neon' 
                        : 'hover:bg-secondary/80'
                    }`}
                    onClick={() => setFilterPerson(person as any)}
                  >
                    {person.charAt(0).toUpperCase() + person.slice(1)}
                  </Badge>
                ))}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => setShowCompleted(!showCompleted)}
              >
                {showCompleted ? 'Hide' : 'Show'} Completed
              </Button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-auto">
              <div className="space-y-4">
                {filteredItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`group relative p-6 rounded-xl border transition-all duration-300 hover:shadow-neon/50 animate-fade-in ${
                      item.completed 
                        ? 'bg-card/20 border-border/20 opacity-70' 
                        : 'bg-card/30 border-border/30 hover:border-neon-cyan/50'
                    }`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex items-start gap-4">
                      {/* Completion Toggle */}
                      <button
                        onClick={() => toggleItem(item.id)}
                        className="mt-1 transition-colors hover:text-neon-cyan"
                      >
                        {item.completed ? (
                          <CheckCircle2 className="h-5 w-5 text-status-fresh" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground" />
                        )}
                      </button>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h4 className={`font-semibold text-lg transition-colors ${
                            item.completed 
                              ? 'text-muted-foreground line-through' 
                              : 'text-foreground group-hover:text-neon-cyan'
                          }`}>
                            {item.name}
                          </h4>
                          
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                            {item.priority.toUpperCase()}
                          </div>
                          
                          <Badge variant="outline" className={`text-xs ${getPersonColor(item.forWho)}`}>
                            {getPersonIcon(item.forWho)}
                            <span className="ml-1">{item.forWho.charAt(0).toUpperCase() + item.forWho.slice(1)}</span>
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Lightbulb className="h-3 w-3 text-neon-purple" />
                              <span className="text-sm text-muted-foreground">AI Reason:</span>
                            </div>
                            <p className="text-sm text-foreground pl-5">{item.reason}</p>
                            
                            {item.healthBenefit && (
                              <div className="mt-2">
                                <div className="flex items-center gap-2">
                                  <Heart className="h-3 w-3 text-neon-pink" />
                                  <span className="text-sm text-muted-foreground">Health Benefit:</span>
                                </div>
                                <p className="text-sm text-neon-pink pl-5">{item.healthBenefit}</p>
                              </div>
                            )}
                          </div>
                          
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Category</span>
                              <Badge variant="secondary" className="text-xs">
                                {item.category}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Estimated Price</span>
                              <span className="text-sm font-mono text-foreground">
                                {item.estimatedPrice}
                              </span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">AI Confidence</span>
                              <div className="flex items-center gap-2">
                                <div className="w-16 h-2 bg-muted/20 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-neon-cyan rounded-full transition-all duration-300"
                                    style={{ width: `${item.aiConfidence}%` }}
                                  />
                                </div>
                                <span className="text-xs text-neon-cyan font-mono">
                                  {item.aiConfidence}%
                                </span>
                              </div>
                            </div>
                            
                            {item.lastPurchased && (
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Last Purchased</span>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(item.lastPurchased).toLocaleDateString()}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-4 border-t border-border/30 flex gap-4 animate-fade-in">
              <Button className="flex-1 bg-gradient-primary hover:bg-gradient-primary/80 text-primary-foreground shadow-neon">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart (${totalEstimatedCost.toFixed(2)})
              </Button>
              <Button variant="outline" className="border-neon-purple/50 text-neon-purple hover:bg-neon-purple/10">
                <Clock className="h-4 w-4 mr-2" />
                Schedule Order
              </Button>
              <Button variant="outline" className="border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10">
                <MapPin className="h-4 w-4 mr-2" />
                Find Stores
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};