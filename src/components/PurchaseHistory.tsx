import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { History, TrendingUp, Store, Calendar } from 'lucide-react';

interface Purchase {
  id: string;
  date: string;
  store: string;
  items: number;
  total: number;
  category: string;
  status: 'delivered' | 'processing' | 'cancelled';
}

const purchases: Purchase[] = [
  { id: '1', date: '2035-08-18', store: 'FreshMart 2035', items: 12, total: 67.50, category: 'Weekly Shop', status: 'delivered' },
  { id: '2', date: '2035-08-15', store: 'OrganicHub', items: 8, total: 45.20, category: 'Organic Produce', status: 'delivered' },
  { id: '3', date: '2035-08-12', store: 'QuickGrocer AI', items: 5, total: 23.80, category: 'Emergency Items', status: 'delivered' },
  { id: '4', date: '2035-08-10', store: 'FreshMart 2035', items: 15, total: 89.30, category: 'Monthly Stock', status: 'delivered' },
  { id: '5', date: '2035-08-08', store: 'BabyMart Express', items: 6, total: 34.60, category: 'Ron\'s Essentials', status: 'processing' },
  { id: '6', date: '2035-08-05', store: 'FreshMart 2035', items: 10, total: 56.90, category: 'Weekly Shop', status: 'delivered' },
];

const weeklyData = [
  { week: 'This Week', amount: 157.30, trend: '+12%' },
  { week: 'Last Week', amount: 140.50, trend: '-5%' },
  { week: '2 Weeks Ago', amount: 148.20, trend: '+8%' },
  { week: '3 Weeks Ago', amount: 137.40, trend: '+3%' },
];

export const PurchaseHistory = () => {
  const [viewMode, setViewMode] = useState<'weekly' | 'monthly'>('weekly');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-status-fresh border-status-fresh/30 bg-status-fresh/10';
      case 'processing': return 'text-status-expiring border-status-expiring/30 bg-status-expiring/10';
      case 'cancelled': return 'text-status-expired border-status-expired/30 bg-status-expired/10';
      default: return 'text-foreground';
    }
  };

  const totalSpent = purchases.reduce((sum, purchase) => sum + purchase.total, 0);
  const avgOrderValue = totalSpent / purchases.length;

  return (
    <Card className="bg-gradient-card border-border/50 shadow-glow transition-all duration-300 hover:shadow-purple">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-neon-purple/20">
              <History className="h-6 w-6 text-neon-purple" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Purchase History</h2>
              <p className="text-muted-foreground">Your grocery spending insights</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge
              variant={viewMode === 'weekly' ? "default" : "secondary"}
              className={`cursor-pointer ${viewMode === 'weekly' ? 'bg-primary shadow-purple' : ''}`}
              onClick={() => setViewMode('weekly')}
            >
              Weekly
            </Badge>
            <Badge
              variant={viewMode === 'monthly' ? "default" : "secondary"}
              className={`cursor-pointer ${viewMode === 'monthly' ? 'bg-primary shadow-purple' : ''}`}
              onClick={() => setViewMode('monthly')}
            >
              Monthly
            </Badge>
          </div>
        </div>

        {/* Analytics Summary */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-3 rounded-lg bg-muted/20 border border-border/30">
            <div className="text-lg font-bold text-neon-cyan">${totalSpent.toFixed(2)}</div>
            <div className="text-xs text-muted-foreground">Total Spent</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted/20 border border-border/30">
            <div className="text-lg font-bold text-neon-purple">{purchases.length}</div>
            <div className="text-xs text-muted-foreground">Orders</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted/20 border border-border/30">
            <div className="text-lg font-bold text-neon-pink">${avgOrderValue.toFixed(2)}</div>
            <div className="text-xs text-muted-foreground">Avg Order</div>
          </div>
        </div>

        {/* Weekly Trend View */}
        {viewMode === 'weekly' && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Weekly Spending Trend
            </h3>
            <div className="space-y-2">
              {weeklyData.map((week, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-card/30 border border-border/30">
                  <span className="text-sm text-foreground">{week.week}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-foreground">${week.amount.toFixed(2)}</span>
                    <span className={`text-xs font-medium ${
                      week.trend.startsWith('+') ? 'text-status-fresh' : 'text-status-expired'
                    }`}>
                      {week.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Purchases */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Recent Orders
          </h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {purchases.slice(0, 5).map((purchase) => (
              <div
                key={purchase.id}
                className="group p-3 rounded-lg bg-card/50 border border-border/30 hover:border-neon-purple/50 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Store className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground group-hover:text-neon-purple transition-colors">
                      {purchase.store}
                    </span>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(purchase.status)}`}>
                    {purchase.status.toUpperCase()}
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="space-y-1">
                    <div className="text-muted-foreground">
                      {new Date(purchase.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        weekday: 'short'
                      })}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {purchase.items} items • {purchase.category}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-foreground">${purchase.total.toFixed(2)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-6 p-4 rounded-lg bg-muted/20 border border-border/30">
          <div className="text-center">
            <div className="text-xs text-muted-foreground mb-1">Most Frequent Store</div>
            <div className="text-sm font-medium text-neon-cyan">FreshMart 2035</div>
          </div>
        </div>
      </div>
    </Card>
  );
};