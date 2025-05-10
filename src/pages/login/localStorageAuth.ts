import { Token } from '@/pages/login/type/Token';
import { TokenPayload } from '@/pages/login/type/TokenPayload';
import { TokenResponse } from '@/pages/login/type/TokenResponse';
import { parseJwt } from '@/pages/login/utils';

import { MessageService } from '@/services/MessageService';

const PREFIX = window.location.origin;
const TOKEN_KEY = `${PREFIX}_tokenUL`;
const PATH_KEY = `${PREFIX}_requestedPathUL`;

const getCurrentToken = (): Token | null => {
  const item = localStorage.getItem(TOKEN_KEY);
  return item ? (JSON.parse(item) as Token) : null;
};

const setCurrentToken = (tokenResponse: TokenResponse, additionalPayload?: TokenPayload): Token => {
  if (!tokenResponse.accessToken) {
    MessageService.error('Invalid token');
    throw new Error('Invalid token');
  }
  const payload = parseJwt(tokenResponse.accessToken) as any;
  const token: Token = { token: tokenResponse, payload: { ...payload, ...additionalPayload } };
  localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
  return token;
};

const pushRequestedPath = (path: string) => {
  if (path) localStorage.setItem(PATH_KEY, path);
};

const popRequestedPath = (): string | undefined => {
  const path = localStorage.getItem(PATH_KEY);
  if (path) {
    localStorage.setItem(PATH_KEY, '');
    return path;
  }
  return undefined;
};

const clearToken = () => localStorage.removeItem(TOKEN_KEY);

const clearAllAuthData = () => {
  localStorage.removeItem('defaultPath');
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(PATH_KEY);
};

export const localStorageAuth = {
  getCurrentToken,
  setCurrentToken,
  pushRequestedPath,
  popRequestedPath,
  clearToken,
  clearAllAuthData,
};
