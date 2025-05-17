import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { MenuProps } from 'antd';

import { InterfaceLabels } from '@/host-constants';

import { localStorageAuth } from '../login/localStorageAuth';

import { useToken } from '@/hook/useToken';
import { AuthService } from '@/services/AuthService';
import { MessageService } from '@/services/MessageService';

export const useSettingItem = (setLoading: (l: boolean) => void) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useToken();

  const handleLogout = useCallback(() => {
    setLoading(true);
    AuthService.logout()
      .then(() => MessageService.success())
      .catch((e) => console.error(e))
      .finally(() => {
        setLoading(false);
        localStorageAuth.clearAllAuthData();
      });
  }, []);

  const handleLogin = () => navigate('/login');

  const settingsItems: MenuProps['items'] = useMemo(
    () => [
      isAuthenticated
        ? {
            key: 'exit',
            danger: true,
            label: <span onClick={handleLogout}>{InterfaceLabels.HEADER_SETTINGS_EXIT}</span>,
          }
        : {
            key: 'auth',
            label: <span onClick={handleLogin}>{InterfaceLabels.AUTH_AUTH}</span>,
          },
    ],
    [isAuthenticated]
  );

  return { settingsItems };
};
