import axios from 'axios';
import { setupAxios } from './axios-config';

jest.mock('axios');

describe('setupAxios', () => {
  it('should set axios default baseURL', () => {
    setupAxios();
    expect(axios.defaults.baseURL).toBe('http://localhost:3000');
  });
});
