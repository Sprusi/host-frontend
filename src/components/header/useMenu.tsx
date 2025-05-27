import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IdcardOutlined, UserOutlined } from '@ant-design/icons';
import { ItemType } from 'antd/es/menu/interface';
import { MenuInfo } from 'rc-menu/lib/interface';

import { InterfaceLabels } from '@/host-constants';
import { hasAccess } from '@/utils/SecurityUtils';

import styles from './Header.module.scss';

export const useMenu = () => {
  const navigate = useNavigate();
  const [activeMenuKey, setActiveMenuKey] = useState(location.pathname.split('/')[1] || 'gym');

  const menuItems: ItemType[] = [
    {
      key: 'gym',
      label: InterfaceLabels.HEADER_GYM_PROJECT_TYPE,
    },
    {
      key: 'shop',
      label: InterfaceLabels.HEADER_SHOP_PROJECT_TYPE,
    },
  ];

  hasAccess('managerPanel') &&
    menuItems.push({
      key: 'managerPanel',
      icon: <IdcardOutlined className={`${styles.headerIcon} ${styles.headerIconManagerPanel}`} />,
    });

  hasAccess('profile') &&
    menuItems.push({
      key: 'profile',
      icon: <UserOutlined className={`${styles.headerIcon} ${styles.headerIconProfile}`} />,
    });

  const onMenuClick = useCallback((e: MenuInfo) => {
    setActiveMenuKey(e.key);
    if (e.key === 'profile') return navigate(`/${e.key}`);
    window.location.assign(`/${e.key}`);
  }, []);

  return { menuItems, activeMenuKey, onMenuClick };
};
