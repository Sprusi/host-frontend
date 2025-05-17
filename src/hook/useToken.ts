import { useMemo } from 'react';

import { localStorageAuth } from '@/components/login/localStorageAuth';

export const useToken = () => {
  const { token, payload } = localStorageAuth.getCurrentToken() || {};

  const isAuthenticated = useMemo(() => {
    if (!token?.accessToken || !payload?.roles) return false;
    return (payload?.exp || 0) * 1000 > Date.now() + 2000;
  }, [token, payload]);

  return { token, payload, isAuthenticated };
};
