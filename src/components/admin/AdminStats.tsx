import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, ShoppingCart, Clock, CheckCircle, XCircle, TrendingUp } from 'lucide-react';

interface Order {
  id: string;
  price_amount: number;
  payment_status: string;
  created_at: string;
}

interface AdminStatsProps {
  orders: Order[];
}

const AdminStats = ({ orders }: AdminStatsProps) => {
  // Calculate statistics
  const totalOrders = orders.length;
  const confirmedOrders = orders.filter(o => o.payment_status === 'finished' || o.payment_status === 'confirmed').length;
  const pendingOrders = orders.filter(o => o.payment_status === 'waiting' || o.payment_status === 'pending').length;
  const failedOrders = orders.filter(o => o.payment_status === 'failed' || o.payment_status === 'expired').length;
  
  const totalRevenue = orders
    .filter(o => o.payment_status === 'finished' || o.payment_status === 'confirmed')
    .reduce((sum, o) => sum + Number(o.price_amount), 0);

  // Calculate this month's revenue
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthlyRevenue = orders
    .filter(o => 
      (o.payment_status === 'finished' || o.payment_status === 'confirmed') &&
      new Date(o.created_at) >= startOfMonth
    )
    .reduce((sum, o) => sum + Number(o.price_amount), 0);

  const stats = [
    {
      title: 'Revenus Total',
      value: `$${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      description: 'Paiements confirmés',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'Ce Mois',
      value: `$${monthlyRevenue.toFixed(2)}`,
      icon: TrendingUp,
      description: 'Revenus du mois',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Commandes',
      value: totalOrders.toString(),
      icon: ShoppingCart,
      description: 'Total des commandes',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      title: 'Confirmées',
      value: confirmedOrders.toString(),
      icon: CheckCircle,
      description: 'Paiements réussis',
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
    },
    {
      title: 'En Attente',
      value: pendingOrders.toString(),
      icon: Clock,
      description: 'Paiements en cours',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
    },
    {
      title: 'Échouées',
      value: failedOrders.toString(),
      icon: XCircle,
      description: 'Paiements échoués',
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminStats;
