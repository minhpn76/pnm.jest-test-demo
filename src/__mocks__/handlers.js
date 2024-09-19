import { rest } from 'msw';
import qs from 'qs';
import { users } from './userData';

export const handlers = [
  // Mock a GET request to /api/user
  rest.post('/api/login', (req, res, ctx) => {
    const { username, password } = qs.parse(req.body);
    const user = users.find(item => item.loginId === username);

    if (user?.password === password) {
      const token = generateToken();
      return res(ctx.status(200), ctx.json({
        ...token,
        username
      }), ctx.delay(1500));
    } else {
      return res(
        ctx.status(400),
        ctx.json({
          message: 'Username or password is wrong',
        }),
      );
    }
  }),

  rest.post('/api/register', (req, res, ctx) => {
    const { username, password } = qs.parse(req.body);
    const user = users.find(item => item.loginId === username);

    if (user?.password === password) {
      const token = generateToken();
      return res(ctx.status(200), ctx.json({
        ...token,
        username
      }), ctx.delay(1500));
    } else {
      return res(
        ctx.status(400),
        ctx.json({
          message: 'Username or password is wrong',
        }),
      );
    }
  }),

  rest.get('/api/user', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: '123',
        name: 'John Doe',
      })
    );
  })
];


const generateToken = () => {
  const accessToken = btoa(new Date().toISOString());
  const refreshToken = btoa(String(new Date().getTime()));
  const expiryAt = new Date().getTime() + 30 * 60 * 1000; //in milliseconds, valid for 30min
  const apigeeToken = generateApigeeToken();
  const token = {
    tokentype: 'Bearer',
    tokenA: accessToken,
    tokenC: refreshToken,
    expiryAt,
    tokenB: { ...apigeeToken },
  };

  localStorage.setItem('token', JSON.stringify(token));
  return token;
};

const generateApigeeToken = () => {
  const access_token = btoa(String(new Date().getFullYear()));
  return { access_token };
};
