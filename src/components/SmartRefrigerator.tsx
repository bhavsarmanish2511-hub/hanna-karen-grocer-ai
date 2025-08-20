import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Snowflake, Thermometer, Droplets, Clock } from 'lucide-react';

interface FridgeItem {
  id: string;
  name: string;
  quantity: string;
  freshness: 'fresh' | 'expiring' | 'expired';
  compartment: string;
  expiryDays: number;
  temperature?: string;
}

const fridgeItems: FridgeItem[] = [
  { id: '1', name: 'Organic Milk', quantity: '1.2L', freshness: 'fresh', compartment: 'Dairy', expiryDays: 5, temperature: '4°C' },
  { id: '2', name: 'Greek Yogurt', quantity: '500g', freshness: 'fresh', compartment: 'Dairy', expiryDays: 7 },
  { id: '3', name: 'Baby Carrots', quantity: '300g', freshness: 'expiring', compartment: 'Vegetables', expiryDays: 2 },
  { id: '4', name: 'Apple Juice (Ron)', quantity: '750ml', freshness: 'fresh', compartment: 'Beverages', expiryDays: 10 },
  { id: '5', name: 'Cheese Slices', quantity: '200g', freshness: 'expiring', compartment: 'Dairy', expiryDays: 1 },
  { id: '6', name: 'Leftover Pasta', quantity: '1 container', freshness: 'expired', compartment: 'Leftovers', expiryDays: -1 },
];

const compartments = ['All', 'Dairy', 'Vegetables', 'Beverages', 'Leftovers', 'Freezer'];

export const SmartRefrigerator = ({ onDeepDive }: { onDeepDive?: () => void }) => {
  const [selectedCompartment, setSelectedCompartment] = useState('All');
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredItems = selectedCompartment === 'All' 
    ? fridgeItems 
    : fridgeItems.filter(item => item.compartment === selectedCompartment);

  const getFreshnessColor = (freshness: string) => {
    switch (freshness) {
      case 'fresh': return 'text-status-fresh border-status-fresh/30 bg-status-fresh/10';
      case 'expiring': return 'text-status-expiring border-status-expiring/30 bg-status-expiring/10';
      case 'expired': return 'text-status-expired border-status-expired/30 bg-status-expired/10';
      default: return 'text-foreground';
    }
  };

  return (
    <Card className="bg-gradient-card border-border/50 shadow-glow transition-all duration-300 hover:shadow-neon cursor-pointer group" onClick={onDeepDive}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-neon-cyan/20">
              <Snowflake className="h-6 w-6 text-neon-cyan" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground group-hover:text-neon-cyan transition-colors">Smart Refrigerator</h2>
              <p className="text-muted-foreground group-hover:text-neon-cyan/70 transition-colors">Real-time inventory tracking • Click to explore</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Thermometer className="h-4 w-4" />
            <span>3.8°C • Optimal</span>
          </div>
        </div>

        {/* Compartment Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {compartments.map((compartment) => (
            <Badge
              key={compartment}
              variant={selectedCompartment === compartment ? "default" : "secondary"}
              className={`cursor-pointer whitespace-nowrap transition-all duration-200 ${
                selectedCompartment === compartment 
                  ? 'bg-primary text-primary-foreground shadow-purple' 
                  : 'hover:bg-secondary/80'
              }`}
              onClick={() => setSelectedCompartment(compartment)}
            >
              {compartment}
            </Badge>
          ))}
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.slice(0, isExpanded ? filteredItems.length : 6).map((item) => (
            <div
              key={item.id}
              className="group relative p-4 rounded-lg bg-card/50 border border-border/30 hover:border-neon-cyan/50 transition-all duration-300 hover:shadow-neon/50"
            >
              {/* Freshness Indicator */}
              <div className={`absolute top-2 right-2 w-3 h-3 rounded-full ${getFreshnessColor(item.freshness).split(' ')[2]}`} />
              
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground group-hover:text-neon-cyan transition-colors">
                  {item.name}
                </h3>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{item.compartment}</span>
                  <span className="font-mono text-foreground">{item.quantity}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className={`text-xs ${getFreshnessColor(item.freshness).split(' ')[0]}`}>
                    {item.expiryDays > 0 ? `${item.expiryDays} days left` : 
                     item.expiryDays === 0 ? 'Expires today' : 'Expired'}
                  </span>
                </div>
                {item.temperature && (
                  <div className="flex items-center gap-2">
                    <Droplets className="h-3 w-3 text-neon-cyan" />
                    <span className="text-xs text-muted-foreground">{item.temperature}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Expand/Collapse Button */}
        {filteredItems.length > 6 && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-neon-cyan hover:text-neon-purple transition-colors text-sm font-medium"
            >
              {isExpanded ? 'Show Less' : `Show All ${filteredItems.length} Items`}
            </button>
          </div>
        )}

        {/* Status Summary */}
        <div className="mt-6 p-4 rounded-lg bg-muted/20 border border-border/30">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-status-fresh">
                {fridgeItems.filter(item => item.freshness === 'fresh').length}
              </div>
              <div className="text-xs text-muted-foreground">Fresh Items</div>
            </div>
            <div>
              <div className="text-lg font-bold text-status-expiring">
                {fridgeItems.filter(item => item.freshness === 'expiring').length}
              </div>
              <div className="text-xs text-muted-foreground">Expiring Soon</div>
            </div>
            <div>
              <div className="text-lg font-bold text-status-expired">
                {fridgeItems.filter(item => item.freshness === 'expired').length}
              </div>
              <div className="text-xs text-muted-foreground">Expired</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};