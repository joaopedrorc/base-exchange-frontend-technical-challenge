import { ColumnDef } from '@tanstack/react-table';

export type Order = {
  id: string;
  asset: string;
  side: string;
  price: string;
  amount: number;
  amountLeft: number;
  status: 'Aberta' | 'Parcial' | 'Executada' | 'Cancelada';
  dateAndTime: string;
};

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
    header: 'Preço',
  },
  {
    accessorKey: 'amount',
    header: 'Quantidade',
  },
  {
    accessorKey: 'amountLeft',
    header: 'Restante',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'dateAndTime',
    header: 'Data/Hora',
  },
];
