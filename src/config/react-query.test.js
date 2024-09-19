import { setupReactQuery } from './react-query-config';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('setupReactQuery', () => {
  let queryClient;

  beforeEach(() => {
    queryClient = setupReactQuery();
  });

  afterEach(() => {
    queryClient.clear();
  });

  test('Should setup React Query with custom options', () => {
    queryClient = setupReactQuery();
    expect(queryClient.getDefaultOptions()).toEqual({
      queries: {
        refetchOnWindowFocus: false,
        useErrorBoundary: expect.any(Function),
        retry: 0,
      },
    });
  });

  test('Should use Error Boundary', () => {
    const useErrorBoundaryResult = queryClient.getDefaultOptions().queries?.useErrorBoundary;
    const error = useErrorBoundaryResult(new Error(''));
    expect(error).toBe(true);
    const errorTokenExpired = useErrorBoundaryResult(new Error('canceled'));
    expect(errorTokenExpired).toBe(false);
  });
});

