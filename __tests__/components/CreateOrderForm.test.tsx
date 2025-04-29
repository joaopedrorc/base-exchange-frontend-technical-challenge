import { render } from '@testing-library/react';
import { CreateOrderForm } from '@/components/CreateOrderForm';

describe('CreateOrderForm component', () => {
  it('should render CreateOrderForm component', () => {
    render(<CreateOrderForm />);
  });

  it('renders CreateOrderForm component unchanged', async () => {
    const component = render(<CreateOrderForm />);

    expect(component).toMatchSnapshot();
  });
});
