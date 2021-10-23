import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/preact';

import Home from './index';

describe('Home page components visibility', () => {
  test('Home button by label should be visible', () => {
    render(<Home />);

    expect(screen.getByLabelText('home sidebar')).toBeInTheDocument();
  });

  test('Home button should be visible', () => {
    render(<Home />);

    expect(screen.getByRole('button', { name: /home sidebar/i })).toBeInTheDocument();
  });

  test('Profile button by label should be visible', () => {
    render(<Home />);

    expect(screen.getByLabelText('profile-link')).toBeInTheDocument();
    // expect(screen.getByRole('button', { name: /profile sidebar/i })).toBeInTheDocument();
  });
  test('Profile button by role should be visible', () => {
    render(<Home />);

    expect(screen.getByRole('link', { name: /profile-link/i })).toBeInTheDocument();
  });

  test('Veil button should be visible', () => {
    render(<Home />);

    expect(screen.getByRole('button', { name: /veil sidebar/i })).toBeInTheDocument();
  });

  test('Groups button should be visible', () => {
    render(<Home />);

    expect(screen.getByRole('button', { name: /groups sidebar/i })).toBeInTheDocument();
  });

  test('Recent Activity should be visible', () => {
    render(<Home />);

    expect(screen.getByText(/Recent Activity/)).toBeInTheDocument();
  });

  test('Confirm Requests should be visible', () => {
    render(<Home />);

    expect(screen.getByText(/Confirm Requests/)).toBeInTheDocument();
  });
});
