import { render, screen } from '@testing-library/react';
import Home from './index';

describe('Home page', () => {
  test('Should be display full welcome message', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      if (key === 'username') {
        return 'MinhPN';
      }
      return null;
    });
    render(<Home />)
    const welcomeText = screen.getByText(/Welcome to Jest Demo, MinhPN!/i);
    expect(welcomeText).toBeInTheDocument();
  });

  test('Should be display welcome message without name', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
    render(<Home />)
    const welcomeText = screen.getByText(/Welcome to Jest Demo/i);
    expect(welcomeText).toBeInTheDocument();
  });

});