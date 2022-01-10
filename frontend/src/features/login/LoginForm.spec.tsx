import { render, screen, act } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';

import LoginForm from './LoginForm';

describe('LoginForm', () => {
  test('visibility', () => {
    const close = jest.fn();
    render(<LoginForm onClose={close} />);

    // title
    const title = screen.getByText('veils');
    expect(title).toBeInTheDocument();

    // username field
    const usernameField = screen.getByPlaceholderText(/username or email/i);
    expect(usernameField).toBeInTheDocument();

    // password field
    const passwordInput = screen.getByPlaceholderText(/password/i);
    expect(passwordInput).toBeInTheDocument();

    // show password btn
    const showPassword = screen.getByRole('button', { name: 'show password' });
    expect(showPassword).toBeInTheDocument();

    // register link
    const registerLink = screen.getByRole('link', { name: /create an account/i });
    expect(registerLink).toBeInTheDocument();
    expect(registerLink).toHaveAttribute('href', '/register');

    // login btn
    const loginBtn = screen.getByRole('button', { name: /login/i });
    expect(loginBtn).toBeInTheDocument();
  });

  test('show password button working', async () => {
    const close = jest.fn();
    render(<LoginForm onClose={close} />);

    const showPasswordBtn = screen.getByRole('button', {
      name: 'show password',
    });
    const passwordInput = screen.getByPlaceholderText('Password');

    expect(passwordInput).toHaveAttribute('type', 'password');

    await act(async () => {
      userEvent.click(showPasswordBtn);
    });
    expect(passwordInput).toHaveAttribute('type', 'text');
  });

  test('escape key onClose works', () => {
    const close = jest.fn();
    render(<LoginForm onClose={close} />);

    userEvent.keyboard('{Escape}');
    expect(close).toHaveBeenCalled();
  });
});
