import { render } from '@testing-library/react';
import { Modal } from '@/components/Modal';

describe('Modal component', () => {
  it('should render Modal component', () => {
    render(<Modal orderId="ORD-5" orderStatus="Aberta" />);
  });

  it('renders Modal component unchanged', async () => {
    const component = render(<Modal orderId="ORD-5" orderStatus="Aberta" />);

    expect(component).toMatchSnapshot();
  });
});
