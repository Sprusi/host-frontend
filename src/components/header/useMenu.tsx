import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IdcardOutlined } from '@ant-design/icons';
import { MenuInfo } from 'rc-menu/lib/interface';

import { InterfaceLabels } from '@/host-constants';

import styles from './Header.module.scss';

export const useMenu = () => {
  const navigate = useNavigate();
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
      {
        key: 'profile',
        icon: <IdcardOutlined className={`${styles.headerIcon} ${styles.headerIconProfile}`} />,
      },
    ],
    []
  );

  const onMenuClick = useCallback((e: MenuInfo) => {
    if (e.key === 'profile') return navigate(`/${e.key}`);
    setActiveMenuKey(e.key);
    window.location.assign(`/${e.key}`);
  }, []);

  return { menuItems, activeMenuKey, onMenuClick };
};
