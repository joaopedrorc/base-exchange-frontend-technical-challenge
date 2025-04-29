import { render } from '@testing-library/react';
import { Header } from '@/components/Header';

describe('Header component', () => {
  it('should render Header component', () => {
    render(<Header />);
  });

  it('renders Header component unchanged', async () => {
    const component = render(<Header />);

    expect(component).toMatchSnapshot();
  });
});
