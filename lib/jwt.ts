import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'change-me';

export type JwtPayload = {
  sub: string;
  login: string;
};

export function signJwt(payload: JwtPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
}

export function verifyJwt(token: string) {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}
