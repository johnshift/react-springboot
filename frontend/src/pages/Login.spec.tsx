import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { LOGIN_INCORRECT_MSG, LOGIN_SUCCESS_MSG, LOGIN_URI } from '../common/constants';

import Login from './Login';

const typeAndLogin = () => {
  const principal = 'email@example.com';
  const password = '12345678';

  userEvent.type(screen.getByPlaceholderText('Username or Email'), principal);
  userEvent.type(screen.getByPlaceholderText('Password'), password);
  userEvent.click(screen.getByRole('button', { name: 'Login' }));
};

describe('Login', () => {
  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  test('Login Error', async () => {
    const errResponse = {
      type: 'AuthException',
      message: LOGIN_INCORRECT_MSG,
      timestamp: 1235
    };

    mock.onPost(LOGIN_URI).reply(400, errResponse);

    render(<Login />);

    await act(async () => {
      typeAndLogin();
    });

    await waitFor(async () => {
      expect(screen.getByText(LOGIN_INCORRECT_MSG)).toBeInTheDocument();
    });
  });

  test('Login Success', async () => {
    mock.onPost(LOGIN_URI).replyOnce(200, undefined, {
      authorization: 'FUCK_YOU'
    });

    render(<Login />);

    await act(async () => {
      typeAndLogin();
    });

    await waitFor(async () => {
      expect(screen.getByText(LOGIN_SUCCESS_MSG)).toBeInTheDocument();
    });
  });
});
