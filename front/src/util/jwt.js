import jwt from 'jsonwebtoken';

const secreatkey = 'everything';

export default function decodePayload(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secreatkey, (err, payload) => {
      if (err) {
        reject(err);
      } else {
        resolve(payload);
      }
    });
  });
}
