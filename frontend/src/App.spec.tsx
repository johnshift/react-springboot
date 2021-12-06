import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('should display Hello', () => {
    render(<App />);

    expect(screen.getByText('Hello World!')).toBeInTheDocument();
  });
});
