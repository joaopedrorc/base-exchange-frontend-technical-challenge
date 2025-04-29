import { render } from '@testing-library/react';
import { Footer } from '@/components/Footer';

describe('Footer component', () => {
  it('should render Footer component', () => {
    render(<Footer />);
  });

  it('renders Footer component unchanged', async () => {
    const component = render(<Footer />);

    expect(component).toMatchSnapshot();
  });
});
