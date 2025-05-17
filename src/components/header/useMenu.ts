import { useCallback, useMemo, useState } from 'react';

import { MenuInfo } from 'rc-menu/lib/interface';

import { InterfaceLabels } from '@/host-constants';

export const useMenu = () => {
  const [activeMenuKey, setActiveMenuKey] = useState(location.pathname.split('/')[1] || 'gym');

  const menuItems = useMemo(
    () => [
      {
        key: 'gym',
        label: InterfaceLabels.HEADER_GYM_PROJECT_TYPE,
      },
      {
        key: 'shop',
        label: InterfaceLabels.HEADER_SHOP_PROJECT_TYPE,
      },
    ],
    []
  );

  const onMenuClick = useCallback((e: MenuInfo) => {
    setActiveMenuKey(e.key);
    window.location.assign(`/${e.key}`);
  }, []);

  return { menuItems, activeMenuKey, onMenuClick };
};
