import { render } from '@testing-library/react';
import Home from '@/app/page';

jest.mock('next/navigation', () => {
  return {
    useRouter: () => ({
      push: () => {},
    }),
  };
});

describe('Home page', () => {
  it('should render Home page', async () => {
    const ui = await Home(); // executa a função assíncrona
    const { getByText } = render(ui);

    expect(getByText('Filtros')).toBeInTheDocument();
  });

  it('renders Home unchanged', async () => {
    const ui = await Home();
    expect(ui).toMatchSnapshot();
  });
});
