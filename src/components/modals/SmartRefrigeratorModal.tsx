import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Snowflake, Thermometer, Droplets, Clock, Package, Layers3 } from 'lucide-react';

interface FridgeItem {
  id: string;
  name: string;
  quantity: string;
  freshness: 'fresh' | 'expiring' | 'expired';
  compartment: string;
  expiryDays: number;
  temperature?: string;
  location: string;
}

interface FridgeCompartment {
  id: string;
  name: string;
  temperature: string;
  items: FridgeItem[];
  icon: any;
  color: string;
}

const fridgeCompartments: FridgeCompartment[] = [
  {
    id: 'main-shelf',
    name: 'Main Shelf',
    temperature: '3.8°C',
    icon: Layers3,
    color: 'text-neon-cyan',
    items: [
      { id: '1', name: 'Organic Milk', quantity: '1.2L', freshness: 'fresh', compartment: 'Dairy', expiryDays: 5, temperature: '4°C', location: 'Main Shelf - Front' },
      { id: '2', name: 'Greek Yogurt', quantity: '500g', freshness: 'fresh', compartment: 'Dairy', expiryDays: 7, location: 'Main Shelf - Back' },
    ]
  },
  {
    id: 'crisper-drawer',
    name: 'Crisper Drawer',
    temperature: '4.2°C',
    icon: Package,
    color: 'text-status-fresh',
    items: [
      { id: '3', name: 'Baby Carrots', quantity: '300g', freshness: 'expiring', compartment: 'Vegetables', expiryDays: 2, location: 'Crisper - Left Side' },
      { id: '8', name: 'Fresh Spinach', quantity: '200g', freshness: 'fresh', compartment: 'Vegetables', expiryDays: 4, location: 'Crisper - Right Side' },
    ]
  },
  {
    id: 'door-storage',
    name: 'Door Storage',
    temperature: '5.1°C',
    icon: Droplets,
    color: 'text-neon-purple',
    items: [
      { id: '4', name: 'Apple Juice (Ron)', quantity: '750ml', freshness: 'fresh', compartment: 'Beverages', expiryDays: 10, location: 'Door - Top Shelf' },
      { id: '9', name: 'Condiment Bottle', quantity: '300ml', freshness: 'fresh', compartment: 'Condiments', expiryDays: 30, location: 'Door - Bottom Shelf' },
    ]
  },
  {
    id: 'freezer',
    name: 'Freezer Section',
    temperature: '-18°C',
    icon: Snowflake,
    color: 'text-neon-cyan',
    items: [
      { id: '10', name: 'Frozen Berries', quantity: '500g', freshness: 'fresh', compartment: 'Frozen', expiryDays: 90, location: 'Freezer - Top Tray' },
      { id: '11', name: 'Ice Cream (Ron)', quantity: '1L', freshness: 'fresh', compartment: 'Frozen Treats', expiryDays: 60, location: 'Freezer - Bottom Tray' },
    ]
  }
];

interface SmartRefrigeratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SmartRefrigeratorModal = ({ isOpen, onClose }: SmartRefrigeratorModalProps) => {
  const [selectedCompartment, setSelectedCompartment] = useState<string | null>(null);

  const getFreshnessColor = (freshness: string) => {
    switch (freshness) {
      case 'fresh': return 'text-status-fresh border-status-fresh/30 bg-status-fresh/10';
      case 'expiring': return 'text-status-expiring border-status-expiring/30 bg-status-expiring/10';
      case 'expired': return 'text-status-expired border-status-expired/30 bg-status-expired/10';
      default: return 'text-foreground';
    }
  };

  const selectedCompartmentData = fridgeCompartments.find(c => c.id === selectedCompartment);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] bg-gradient-card border-border/50 shadow-neon">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <div className="p-2 rounded-lg bg-neon-cyan/20">
              <Snowflake className="h-6 w-6 text-neon-cyan" />
            </div>
            Smart Refrigerator - Deep Dive
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          {!selectedCompartment ? (
            /* Compartment Overview */
            <div className="h-full">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Thermometer className="h-5 w-5 text-neon-cyan" />
                  <span className="text-lg font-semibold text-foreground">Temperature Zones</span>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {fridgeCompartments.map((compartment) => {
                    const IconComponent = compartment.icon;
                    return (
                      <div
                        key={compartment.id}
                        onClick={() => setSelectedCompartment(compartment.id)}
                        className="group cursor-pointer p-6 rounded-xl bg-card/30 border border-border/30 hover:border-neon-cyan/50 transition-all duration-300 hover:shadow-neon/50 hover:scale-105"
                      >
                        <div className="text-center">
                          <div className={`mx-auto w-16 h-16 rounded-2xl bg-card/50 flex items-center justify-center mb-4 group-hover:bg-neon-cyan/10 transition-all duration-300`}>
                            <IconComponent className={`h-8 w-8 ${compartment.color} group-hover:text-neon-cyan`} />
                          </div>
                          <h3 className="font-bold text-foreground group-hover:text-neon-cyan transition-colors mb-2">
                            {compartment.name}
                          </h3>
                          <div className="space-y-1">
                            <div className="text-sm text-muted-foreground">{compartment.temperature}</div>
                            <Badge variant="outline" className="text-xs">
                              {compartment.items.length} items
                            </Badge>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* All Items Grid */}
              <div className="border-t border-border/30 pt-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">All Items Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-80 overflow-y-auto">
                  {fridgeCompartments.flatMap(comp => comp.items).map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-lg bg-card/50 border border-border/30 hover:border-neon-cyan/50 transition-all duration-300"
                    >
                      <div className={`absolute top-2 right-2 w-3 h-3 rounded-full ${getFreshnessColor(item.freshness).split(' ')[2]}`} />
                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground">{item.name}</h4>
                        <div className="text-sm text-muted-foreground">{item.location}</div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-mono text-foreground">{item.quantity}</span>
                          <span className={`text-xs ${getFreshnessColor(item.freshness).split(' ')[0]}`}>
                            {item.expiryDays > 0 ? `${item.expiryDays}d left` : 'Expired'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Compartment Detail View */
            <div className="h-full">
              <div className="flex items-center gap-2 mb-6">
                <Button variant="ghost" onClick={() => setSelectedCompartment(null)} className="text-neon-cyan">
                  ← Back to Overview
                </Button>
              </div>

              {selectedCompartmentData && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <selectedCompartmentData.icon className={`h-8 w-8 ${selectedCompartmentData.color}`} />
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">{selectedCompartmentData.name}</h2>
                      <p className="text-muted-foreground">Temperature: {selectedCompartmentData.temperature}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedCompartmentData.items.map((item) => (
                      <div
                        key={item.id}
                        className="p-6 rounded-xl bg-card/50 border border-border/30 hover:border-neon-cyan/50 transition-all duration-300 hover:shadow-neon/50"
                      >
                        <div className={`absolute top-4 right-4 w-4 h-4 rounded-full ${getFreshnessColor(item.freshness).split(' ')[2]}`} />
                        
                        <div className="space-y-4">
                          <h3 className="text-xl font-bold text-foreground">{item.name}</h3>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Quantity</span>
                              <div className="font-mono text-foreground text-lg">{item.quantity}</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Location</span>
                              <div className="text-foreground">{item.location}</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Category</span>
                              <Badge variant="outline">{item.compartment}</Badge>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Freshness</span>
                              <div className={`text-xs font-medium ${getFreshnessColor(item.freshness).split(' ')[0]}`}>
                                {item.expiryDays > 0 ? `${item.expiryDays} days left` : 'Expired'}
                              </div>
                            </div>
                          </div>

                          {item.temperature && (
                            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/20">
                              <Thermometer className="h-4 w-4 text-neon-cyan" />
                              <span className="text-sm text-foreground">Optimal Temp: {item.temperature}</span>
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