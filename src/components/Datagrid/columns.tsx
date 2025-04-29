'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '../ui/button';
import { Order } from '@/types';
import { Badge } from '../ui/badge';
import { badgeTheme } from '@/lib/utils';

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'asset',
    header: 'Ação',
  },
  {
    accessorKey: 'side',
    header: 'Operação',
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <div>Preço</div>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price: string = row.getValue('price');

      return <div className="font-medium">R$ {price}</div>;
    },
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <div>Quantidade</div>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'amountLeft',
    header: 'Restante',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status: string = row.getValue('status');

      return <Badge className={`${badgeTheme[status]} w-full`}>{status}</Badge>;
    },
  },
  {
    accessorKey: 'dateAndTime',
    header: 'Data/Hora',
  },
];
