import { useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Search, MoreHorizontal, CheckCircle, XCircle, RefreshCw, Eye, Copy } from 'lucide-react';

interface Order {
  id: string;
  email: string;
  plan_name: string;
  price_amount: number;
  price_currency: string;
  payment_status: string;
  payment_id: string | null;
  pay_address: string | null;
  pay_amount: number | null;
  pay_currency: string | null;
  device: string | null;
  device_info: string | null;
  created_at: string;
  activated_at: string | null;
}

interface OrdersTableProps {
  orders: Order[];
  onRefresh: () => void;
}

const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  waiting: { label: 'En attente', variant: 'secondary' },
  pending: { label: 'En cours', variant: 'secondary' },
  confirming: { label: 'Confirmation', variant: 'secondary' },
  confirmed: { label: 'Confirmé', variant: 'default' },
  finished: { label: 'Terminé', variant: 'default' },
  failed: { label: 'Échoué', variant: 'destructive' },
  expired: { label: 'Expiré', variant: 'destructive' },
  refunded: { label: 'Remboursé', variant: 'outline' },
};

const OrdersTable = ({ orders, onRefresh }: OrdersTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const { toast } = useToast();

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.plan_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.payment_id?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.payment_status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    setIsLoading(orderId);
    try {
      const updateData: Record<string, unknown> = { payment_status: newStatus };
      
      if (newStatus === 'finished' || newStatus === 'confirmed') {
        updateData.activated_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('orders')
        .update(updateData)
        .eq('id', orderId);

      if (error) throw error;

      toast({
        title: 'Statut mis à jour',
        description: `Le statut a été changé en "${statusConfig[newStatus]?.label || newStatus}"`,
      });
      
      onRefresh();
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de mettre à jour le statut',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(null);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copié !',
      description: 'Texte copié dans le presse-papiers',
    });
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par email, plan ou ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filtrer par statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="waiting">En attente</SelectItem>
            <SelectItem value="pending">En cours</SelectItem>
            <SelectItem value="finished">Terminé</SelectItem>
            <SelectItem value="failed">Échoué</SelectItem>
            <SelectItem value="expired">Expiré</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={onRefresh}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Actualiser
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-md border border-border/50 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Email</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Montant</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Payment ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  Aucune commande trouvée
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{order.email}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => copyToClipboard(order.email)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    {order.device && (
                      <span className="text-xs text-muted-foreground block">
                        {order.device}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{order.plan_name}</TableCell>
                  <TableCell>
                    ${Number(order.price_amount).toFixed(2)}
                    {order.pay_amount && order.pay_currency && (
                      <span className="text-xs text-muted-foreground block">
                        {order.pay_amount} {order.pay_currency.toUpperCase()}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusConfig[order.payment_status]?.variant || 'outline'}>
                      {statusConfig[order.payment_status]?.label || order.payment_status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {order.payment_id ? (
                      <div className="flex items-center gap-1">
                        <span className="font-mono text-xs">
                          {order.payment_id.slice(0, 10)}...
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => copyToClipboard(order.payment_id!)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {format(new Date(order.created_at), 'dd MMM yyyy', { locale: fr })}
                    </span>
                    <span className="text-xs text-muted-foreground block">
                      {format(new Date(order.created_at), 'HH:mm', { locale: fr })}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={isLoading === order.id}
                        >
                          {isLoading === order.id ? (
                            <RefreshCw className="h-4 w-4 animate-spin" />
                          ) : (
                            <MoreHorizontal className="h-4 w-4" />
                          )}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, 'finished')}>
                          <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                          Marquer comme terminé
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, 'failed')}>
                          <XCircle className="h-4 w-4 mr-2 text-red-500" />
                          Marquer comme échoué
                        </DropdownMenuItem>
                        {order.pay_address && (
                          <DropdownMenuItem onClick={() => copyToClipboard(order.pay_address!)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Copier adresse crypto
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="text-sm text-muted-foreground">
        {filteredOrders.length} commande(s) affichée(s) sur {orders.length}
      </div>
    </div>
  );
};

export default OrdersTable;
