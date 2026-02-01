import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Order {
  id: string;
  price_amount: number;
  payment_status: string;
  created_at: string;
}

interface RevenueChartProps {
  orders: Order[];
}

const RevenueChart = ({ orders }: RevenueChartProps) => {
  const chartData = useMemo(() => {
    const last14Days = Array.from({ length: 14 }, (_, i) => {
      const date = subDays(new Date(), 13 - i);
      return {
        date: format(date, 'dd/MM', { locale: fr }),
        fullDate: date,
        revenus: 0,
        commandes: 0,
      };
    });

    const confirmedOrders = orders.filter(
      o => o.payment_status === 'finished' || o.payment_status === 'confirmed'
    );

    confirmedOrders.forEach(order => {
      const orderDate = new Date(order.created_at);
      const dayIndex = last14Days.findIndex(d => 
        orderDate >= startOfDay(d.fullDate) && orderDate <= endOfDay(d.fullDate)
      );
      
      if (dayIndex !== -1) {
        last14Days[dayIndex].revenus += Number(order.price_amount);
        last14Days[dayIndex].commandes += 1;
      }
    });

    return last14Days.map(d => ({
      date: d.date,
      revenus: d.revenus,
      commandes: d.commandes,
    }));
  }, [orders]);

  const totalRevenue = chartData.reduce((sum, d) => sum + d.revenus, 0);
  const totalOrders = chartData.reduce((sum, d) => sum + d.commandes, 0);

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle>Revenus des 14 derniers jours</CardTitle>
        <CardDescription>
          ${totalRevenue.toFixed(2)} de revenus • {totalOrders} commandes confirmées
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="date" 
                className="text-xs" 
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                className="text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
                formatter={(value: number, name: string) => [
                  name === 'revenus' ? `$${value.toFixed(2)}` : value,
                  name === 'revenus' ? 'Revenus' : 'Commandes'
                ]}
              />
              <Bar 
                dataKey="revenus" 
                fill="hsl(var(--primary))" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
