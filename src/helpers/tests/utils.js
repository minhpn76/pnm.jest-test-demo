import { QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { setupReactQuery } from '../../config/react-query-config';

export const renderWithRouterReactQuery = (ui) => {
  const queryClient = setupReactQuery();
  const history = createMemoryHistory();
  return {
    ...render(
      <QueryClientProvider client={queryClient}>
        <Router location={history.location} navigator={history}>
          {ui}
        </Router>
      </QueryClientProvider>
    ),
    history,
  };
};