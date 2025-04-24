import { Order, columns } from '@/components/Datagrid/columns';
import { Datagrid } from '@/components/Datagrid/Datagrid';

async function getData(): Promise<Order[]> {
  // Fetch data from your API here.
  return [
    {
      id: 'ORD-0001',
      asset: 'PETR4',
      side: 'Compra',
      price: '28,45',
      amount: 100,
      amountLeft: 100,
      status: 'Aberta',
      dateAndTime: '2025-04-24 09:15:32',
    },
    {
      id: 'ORD-0002',
      asset: 'VALE3',
      side: 'Venda',
      price: '67,20',
      amount: 150,
      amountLeft: 50,
      status: 'Parcial',
      dateAndTime: '2025-04-24 10:42:11',
    },
    {
      id: 'ORD-0003',
      asset: 'ITUB4',
      side: 'Compra',
      price: '29,90',
      amount: 200,
      amountLeft: 0,
      status: 'Executada',
      dateAndTime: '2025-04-23 16:03:45',
    },
    {
      id: 'ORD-0004',
      asset: 'B3SA3',
      side: 'Venda',
      price: '12,75',
      amount: 300,
      amountLeft: 0,
      status: 'Cancelada',
      dateAndTime: '2025-04-22 13:20:17',
    },
    {
      id: 'ORD-0005',
      asset: 'BBAS3',
      side: 'Compra',
      price: '45,10',
      amount: 80,
      amountLeft: 20,
      status: 'Parcial',
      dateAndTime: '2025-04-24 11:01:55',
    },
    {
      id: 'ORD-0005',
      asset: 'BBAS3',
      side: 'Compra',
      price: '45,10',
      amount: 80,
      amountLeft: 20,
      status: 'Parcial',
      dateAndTime: '2025-04-24 11:01:55',
    },
    {
      id: 'ORD-0005',
      asset: 'BBAS3',
      side: 'Compra',
      price: '45,10',
      amount: 80,
      amountLeft: 20,
      status: 'Parcial',
      dateAndTime: '2025-04-24 11:01:55',
    },
    {
      id: 'ORD-0005',
      asset: 'BBAS3',
      side: 'Compra',
      price: '45,10',
      amount: 80,
      amountLeft: 20,
      status: 'Parcial',
      dateAndTime: '2025-04-24 11:01:55',
    },
    {
      id: 'ORD-0005',
      asset: 'BBAS3',
      side: 'Compra',
      price: '45,10',
      amount: 80,
      amountLeft: 20,
      status: 'Parcial',
      dateAndTime: '2025-04-24 11:01:55',
    },
    {
      id: 'ORD-0005',
      asset: 'BBAS3',
      side: 'Compra',
      price: '45,10',
      amount: 80,
      amountLeft: 20,
      status: 'Parcial',
      dateAndTime: '2025-04-24 11:01:55',
    },
    {
      id: 'ORD-0005',
      asset: 'BBAS3',
      side: 'Compra',
      price: '45,10',
      amount: 80,
      amountLeft: 20,
      status: 'Parcial',
      dateAndTime: '2025-04-24 11:01:55',
    },
    {
      id: 'ORD-0005',
      asset: 'BBAS3',
      side: 'Compra',
      price: '45,10',
      amount: 80,
      amountLeft: 20,
      status: 'Parcial',
      dateAndTime: '2025-04-24 11:01:55',
    },
  ];
}

export default async function Home() {
  const data = await getData();

  return (
    <div className="">
      <Datagrid columns={columns} data={data} />
    </div>
  );
}
