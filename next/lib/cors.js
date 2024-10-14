import Cors from 'cors';

export const cors = Cors({
  methods: ['GET', 'POST', 'PUT'],
  origin: function (origin, callback) {
    const allowedDomains = ['https://getdoa.com', 'https://sedekahje.com', 'http://localhost:3000'];

    if (allowedDomains.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
});

export function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}
