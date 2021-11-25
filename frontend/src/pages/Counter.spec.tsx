import '@testing-library/jest-dom';
import { render, fireEvent, screen, waitFor } from '@testing-library/preact';

import Counter from './Counter';

describe('Counter', () => {
  test('should display initial count', () => {
    const { container } = render(<Counter initialCount={5} />);
    expect(container.textContent).toMatch('Current value: 5');
  });

  test('should increment after "Increment" button is clicked', async () => {
    render(<Counter initialCount={5} />);

    fireEvent.click(screen.getByText('Increment'));
    await waitFor(() => {
      expect(screen.getByText('Current value: 6')).toBeInTheDocument();
    });
  });
});
