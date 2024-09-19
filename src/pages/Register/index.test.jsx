import { fireEvent, screen } from '@testing-library/react';
import { renderWithRouterReactQuery } from '../../helpers/tests/utils';
import Register from './index';

describe('Login form', () => {
  
  test('Should be redirect to login page', async () => {
    const { history } = renderWithRouterReactQuery(<Register />)

    const loginBtn = screen.getByText('Log in')
    fireEvent.click(loginBtn)
    expect(history.location.pathname).toBe('/login')
  });
});