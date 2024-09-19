// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { QueryCache } from '@tanstack/react-query';
import axios from 'axios';
import { server } from './__mocks__/server';

const queryCache = new QueryCache();
// Establish API mocking before all tests.
beforeAll(() => {
  axios.interceptors.request.use(function (config) {
    config.headers['Content-Type'] = 'application/json';

    return config;
  });

  jest.spyOn(console, 'error').mockImplementation(() => {});
  server.listen();
});
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  server.resetHandlers();
  // clear react-query cache https://mswjs.io/docs/faq#react-query
  queryCache.clear();
});
// Clean up after the tests are finished.
afterAll(() => server.close());

