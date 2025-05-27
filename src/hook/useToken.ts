import { useMemo } from 'react';

import { localStorageAuth } from '@/components/login/localStorageAuth';

export const useToken = () => {
  const { token, payload } = localStorageAuth.getCurrentToken() || {};
  const isAuthenticated = useMemo(() => !!token?.accessToken && !!payload?.roles, [token, payload]);

  return { token, payload, isAuthenticated };
};
