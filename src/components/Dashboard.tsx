import { SmartRefrigerator } from './SmartRefrigerator';
import { SmartKitchen } from './SmartKitchen';
import { GroceryList } from './GroceryList';
import { PurchaseHistory } from './PurchaseHistory';
import { InventoryExplorer } from './InventoryExplorer';
import { KarenAI } from './KarenAI';

export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-deep-space relative overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-deep-space via-muted to-deep-space opacity-80" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
      
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-neon bg-clip-text text-transparent mb-2">
                Smart Home Dashboard
              </h1>
              <p className="text-muted-foreground text-lg">Welcome back, Hanna • Year 2035</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Current Time</div>
              <div className="text-xl font-mono text-neon-cyan">14:32:08 PST</div>
            </div>
          </div>
        </header>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Smart Refrigerator - Takes full width on mobile, 2/3 on large screens */}
          <div className="lg:col-span-2">
            <SmartRefrigerator />
          </div>
          
          {/* AI Grocery List */}
          <div className="lg:col-span-1">
            <GroceryList />
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Smart Kitchen */}
          <SmartKitchen />
          
          {/* Purchase History */}
          <PurchaseHistory />
        </div>

        {/* Inventory Explorer - Full Width */}
        <div className="mb-8">
          <InventoryExplorer />
        </div>
      </div>

      {/* Karen AI Assistant Widget */}
      <KarenAI />
    </div>
  );
};