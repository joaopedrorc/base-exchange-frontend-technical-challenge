import { render } from '@testing-library/react';
import OrderDetail from '@/app/order/[id]/page';

describe('OrderDetail page', () => {
  const orderId = 'ORD-1';

  it('should render OrderDetail page', async () => {
    const ui = await OrderDetail({ params: { id: orderId } });
    const { getByText } = render(ui);

    expect(getByText('Votar')).toBeInTheDocument();
    expect(getByText('Código da ação:')).toBeInTheDocument();
    expect(getByText('Tipo de operação:')).toBeInTheDocument();
    expect(getByText('Preço da ação:')).toBeInTheDocument();
    expect(getByText('Quantidade:')).toBeInTheDocument();
    expect(getByText('Quantidade restante:')).toBeInTheDocument();
    expect(getByText('Status:')).toBeInTheDocument();
    expect(getByText('Data/Hora:')).toBeInTheDocument();
  });

  it('renders OrderDetail unchanged', async () => {
    const ui = await OrderDetail({ params: { id: orderId } });
    expect(ui).toMatchSnapshot();
  });
});
