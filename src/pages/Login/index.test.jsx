import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithRouterReactQuery } from '../../helpers/tests/utils';
import * as Service from '../../services/index';
import Login from './index';

describe('Login form', () => {
  test('Should be display validate message', async () => {
    renderWithRouterReactQuery(<Login />)
    const loginBtn = screen.getByText('Log in')
    fireEvent.click(loginBtn)

    const emailError = await screen.findByText('Email is required')
    expect(emailError).toBeInTheDocument()

    const passwordError = await screen.findByText('Password is required')
    expect(passwordError).toBeInTheDocument()
  });


  test('Should be redirect to home page', async () => {
    const { history } = renderWithRouterReactQuery(<Login />)

    const inputText = screen.getByTestId('email')
    const passwordText = screen.getByTestId('password')
    fireEvent.input(inputText, { target: { value: 'admin' } });
    fireEvent.input(passwordText, { target: { value: 'admin' } });

    const loginBtn = screen.getByText('Log in')
    fireEvent.click(loginBtn)
    
    await waitFor(() => {
      expect(history.location.pathname).toBe('/')
    })
  });

  test('Should be display error message', async () => {
    const jestSpy = jest.spyOn(Service, 'useLogin').mockImplementation(
      jest.fn().mockReturnValue({
        error: { message: 'Error message' },
        isPending: false,
        mutateAsync: jest.fn()
      })
    );

    renderWithRouterReactQuery(<Login />)

    const inputText = screen.getByTestId('email')
    const passwordText = screen.getByTestId('password')
    fireEvent.input(inputText, { target: { value: 'admin' } });
    fireEvent.input(passwordText, { target: { value: 'admin' } });

    const loginBtn = screen.getByText('Log in')
    fireEvent.click(loginBtn)
    
    
    const errorMessage = await screen.findByText('Error message')
    expect(errorMessage).toBeInTheDocument()
    jestSpy.mockRestore()
  });


  test('Should be redirect to register page', async () => {
    const { history } = renderWithRouterReactQuery(<Login />)

    const signUpBtn = screen.getByText('Sign up')
    fireEvent.click(signUpBtn)
    expect(history.location.pathname).toBe('/register')
  });
});