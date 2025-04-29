import { render } from '@testing-library/react';
import { Datagrid } from '@/components/Datagrid/Datagrid';

const dataMock = [
  {
    id: 'ORD-1',
    asset: 'PETR4',
    side: 'Compra',
    price: '28,45',
    amount: 100,
    amountLeft: 100,
    status: 'Aberta',
    dateAndTime: '24/04/2025, 09:15:32',
    history: ['Pedido criado em 24/04/2025, 09:15:32'],
  },
];

const mockColumns = [
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

jest.mock('next/navigation', () => {
  return {
    useRouter: () => ({
      push: () => {},
    }),
  };
});

describe('Datagrid component', () => {
  it('should render Datagrid component', () => {
    render(<Datagrid columns={mockColumns} data={dataMock} />);
  });

  it('renders Datagrid component unchanged', async () => {
    const component = render(
      <Datagrid columns={mockColumns} data={dataMock} />
    );

    expect(component).toMatchSnapshot();
  });
});
