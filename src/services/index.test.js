import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import { getUser, login } from './api';
import { useGetMe, useLogin } from './index';

jest.mock('./api');

describe('React Query Hooks', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  const createWrapper = () => {
    const queryClient = new QueryClient();
    return ({ children }) => (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );
  };

  test('Should login successfully and store token in localStorage', async () => {
    const mockedResponse = { tokenA: '12345', username: 'admin' };
    login.mockResolvedValue(mockedResponse);

    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.mutate({ username: 'admin', password: 'admin' });
    });

    await waitFor(() => result.current.isSuccess);

    expect(localStorage.getItem('token')).toBe('12345');
    expect(localStorage.getItem('username')).toBe('admin');
  });

  test('Should login without data returned successfully', async () => {
    login.mockResolvedValue(undefined);
    Object.defineProperty(window, 'localStorage', {
      value: {
        setItem: jest.fn(),
      },
      writable: true,
    });
    const localStorageSpy = jest.spyOn(localStorage, 'setItem');

    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.mutate({ username: 'admin', password: 'admin' });
    });

    await waitFor(() => result.current.isSettled);

    expect(localStorage.setItem).not.toHaveBeenCalled();
    localStorageSpy.mockRestore();
  });

  test('Should fetch user data successfully', async () => {
    const mockedUserData = { id: 1, name: 'MinhPN' };
    getUser.mockResolvedValue(mockedUserData);

    const { result } = renderHook(() => useGetMe(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual(undefined);
    expect(getUser).toHaveBeenCalledTimes(1);
  });
});
