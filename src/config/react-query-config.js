import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      useErrorBoundary: (error) => {
        // Request is canceled if token expired (handled in axios-config request interceptor)
        // Don't throw this error to error boundary
        if (error?.message === 'canceled') return false;
        return true;
      },
      retry: 0,
    },
  },
});

export const setupReactQuery = () => {
  return queryClient;
};
