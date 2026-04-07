import crypto from 'crypto';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/time.js';
import { Session } from '../models/session.js';

export const createSession = async (userId) => {
  const accessToken = crypto.randomBytes(30).toString('base64');
  const refreshToken = crypto.randomBytes(30).toString('base64');

  return Session.create({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });
};

const isProduction = process.env.NODE_ENV === 'production';

const getCookieOptions = (maxAge) => ({
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? 'none' : 'lax',
  maxAge,
  path: '/',
});

export const setSessionCookies = (res, session) => {
  res.cookie('accessToken', session.accessToken, getCookieOptions(FIFTEEN_MINUTES));
  res.cookie('refreshToken', session.refreshToken, getCookieOptions(ONE_DAY));
  res.cookie('sessionId', session._id.toString(), getCookieOptions(ONE_DAY));
};
