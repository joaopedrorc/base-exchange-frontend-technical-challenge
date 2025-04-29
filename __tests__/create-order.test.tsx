import { render } from '@testing-library/react';
import CreateOrder from '@/app/create-order/page';

jest.mock('next/navigation', () => {
  return {
    useRouter: () => ({
      push: () => {},
    }),
  };
});

describe('CreateOrder page', () => {
  it('should render CreateOrder page', async () => {
    const ui = await CreateOrder(); // executa a função assíncrona
    const { getByText } = render(ui);

    expect(getByText('Votar')).toBeInTheDocument();
    expect(getByText('Crie uma Nova Ordem')).toBeInTheDocument();
  });

  it('renders CreateOrder unchanged', async () => {
    const ui = await CreateOrder();
    expect(ui).toMatchSnapshot();
  });
});
