import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/preact';

import Home from './index';

describe('HomePage sidebar', () => {
  test('Sidebar should be visible', () => {
    render(<Home />);

    expect(screen.getByRole('navigation', { name: /^sidebar$/i })).toBeInTheDocument();
  });

  test('Home navlink should be visible', () => {
    render(<Home />);

    expect(screen.getByRole('link', { name: /^home$/i })).toBeInTheDocument();
  });

  test('Profile navlink should be visible', () => {
    render(<Home />);

    expect(screen.getByRole('link', { name: /^profile$/i })).toBeInTheDocument();
  });

  test('Veil navlink should be visible', () => {
    render(<Home />);

    expect(screen.getByRole('link', { name: /^veil$/i })).toBeInTheDocument();
  });

  test('Groups navlink should be visible', () => {
    render(<Home />);

    expect(screen.getByRole('link', { name: /^groups$/i })).toBeInTheDocument();
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

describe('HomePage create post', () => {
  test('Profile Picture should be visible', () => {
    render(<Home />);

    expect(screen.getByRole('link', { name: /^profile picture$/i })).toBeInTheDocument();
  });

  test('Textarea should be visible', () => {
    render(<Home />);

    expect(screen.getByRole('textbox', { name: /^share your secrets$/i })).toBeInTheDocument();
  });

  test('Emoji Selection should be visible', () => {
    render(<Home />);

    expect(screen.getByRole('button', { name: /^select emoji$/i })).toBeInTheDocument();
  });

  test('Mention Selection should be visible', () => {
    render(<Home />);

    expect(screen.getByRole('button', { name: /^mention a person$/i })).toBeInTheDocument();
  });

  test('Schedule option should be visible', () => {
    render(<Home />);

    expect(screen.getByRole('button', { name: /^schedule when to post$/i })).toBeInTheDocument();
  });

  test('Create Post button should be visible', () => {
    render(<Home />);

    expect(screen.getByRole('button', { name: /^create post$/i })).toBeInTheDocument();
  });

  test('PostAs button should be visible', () => {
    render(<Home />);

    expect(screen.getByRole('button', { name: /^Post As$/i })).toBeInTheDocument();
  });
});
