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
