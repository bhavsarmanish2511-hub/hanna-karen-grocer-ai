import { useState } from 'react';
import { SmartRefrigerator } from './SmartRefrigerator';
import { SmartKitchen } from './SmartKitchen';
import { GroceryList } from './GroceryList';
import { PurchaseHistory } from './PurchaseHistory';
import { InventoryExplorer } from './InventoryExplorer';
import { CartOverview } from './CartOverview';
import { SmartRefrigeratorModal } from './modals/SmartRefrigeratorModal';
import { SmartKitchenModal } from './modals/SmartKitchenModal';
import { ShelfInventoryModal } from './modals/ShelfInventoryModal';
import { CartDeepDiveModal } from './modals/CartDeepDiveModal';
import { GroceryListModal } from './modals/GroceryListModal';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Clock } from 'lucide-react';

export const Dashboard = () => {
  const [fridgeModalOpen, setFridgeModalOpen] = useState(false);
  const [kitchenModalOpen, setKitchenModalOpen] = useState(false);
  const [inventoryModalOpen, setInventoryModalOpen] = useState(false);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [groceryModalOpen, setGroceryModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-deep-space relative overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-deep-space via-muted to-deep-space opacity-80" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
      
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header */}
        <header className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-neon bg-clip-text text-transparent mb-2">
                Smart Home Dashboard
              </h1>
              <p className="text-muted-foreground text-lg">Welcome back, Hanna • Year 2035</p>
            </div>
            <div className="flex items-center gap-4">
              {/* Smart Cart Button */}
              <Button
                onClick={() => setCartModalOpen(true)}
                className="bg-gradient-primary hover:bg-gradient-primary/80 text-primary-foreground shadow-neon hover:scale-105 transition-all duration-300 animate-glow-pulse"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Smart Cart
              </Button>
              
              <div className="text-right">
                <div className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Current Time
                </div>
                <div className="text-xl font-mono text-neon-cyan">14:32:08 PST</div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Smart Refrigerator - Takes 2 columns on large screens */}
          <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <SmartRefrigerator onDeepDive={() => setFridgeModalOpen(true)} />
          </div>
          
          {/* AI Grocery List */}
          <div className="lg:col-span-1 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <GroceryList onDeepDive={() => setGroceryModalOpen(true)} />
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Smart Kitchen */}
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <SmartKitchen onDeepDive={() => setKitchenModalOpen(true)} />
          </div>
          
          {/* Purchase History */}
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <PurchaseHistory />
          </div>
        </div>

        {/* Inventory Explorer - Full Width */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <InventoryExplorer onDeepDive={() => setInventoryModalOpen(true)} />
        </div>
      </div>

      {/* Deep Dive Modals */}
      <SmartRefrigeratorModal 
        isOpen={fridgeModalOpen} 
        onClose={() => setFridgeModalOpen(false)}
      />
      <SmartKitchenModal 
        isOpen={kitchenModalOpen} 
        onClose={() => setKitchenModalOpen(false)}
      />
      <ShelfInventoryModal 
        isOpen={inventoryModalOpen} 
        onClose={() => setInventoryModalOpen(false)}
      />
      <CartDeepDiveModal 
        isOpen={cartModalOpen} 
        onClose={() => setCartModalOpen(false)}
      />
      <GroceryListModal 
        isOpen={groceryModalOpen} 
        onClose={() => setGroceryModalOpen(false)}
      />
    </div>
  );
};