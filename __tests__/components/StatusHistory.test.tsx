import { render } from '@testing-library/react';
import { StatusHistory } from '@/components/StatusHistory';

describe('StatusHistory component', () => {
  it('should render StatusHistory component', () => {
    render(<StatusHistory id="ORD-5" />);
  });

  it('renders StatusHistory component unchanged', async () => {
    const component = render(<StatusHistory id="ORD-5" />);

    expect(component).toMatchSnapshot();
  });
});
