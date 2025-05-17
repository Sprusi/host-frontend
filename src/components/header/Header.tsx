import React, { useCallback, useMemo, useState } from 'react';

import { SettingOutlined } from '@ant-design/icons';
import { Dropdown, Layout, Menu, MenuProps, Space, Tag, Typography } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';

import { InterfaceLabels } from '@/host-constants';

import styles from './Header.module.scss';
import { AuthService } from '@/services/AuthService';

const { Header: AntdHeader } = Layout;

export const Header = () => {
  const [activeMenuKey, setActiveMenuKey] = useState(location.pathname.split('/')[1] || 'gym');

  const onMenuClick = useCallback((e: MenuInfo) => {
    setActiveMenuKey(e.key);
    window.location.assign(`/${e.key}`);
  }, []);

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

  const projectCardTypes = useMemo(
    () =>
      ({
        gym: { text: InterfaceLabels.HEADER_GYM_PROJECT_TYPE, color: 'orange' },
        shop: { text: InterfaceLabels.HEADER_SHOP_PROJECT_TYPE, color: 'green' },
      }[activeMenuKey]),
    [activeMenuKey]
  );

  const settingsItems: MenuProps['items'] = useMemo(
    () => [
      {
        key: 'exit',
        danger: true,
        label: <span onClick={() => AuthService.logout()}>{InterfaceLabels.HEADER_SETTINGS_EXIT}</span>,
      },
    ],
    []
  );

  return (
    <AntdHeader className={styles.header}>
      <Space size="large">
        <Typography.Text strong className={styles.headerLogoText}>
          {InterfaceLabels.HEADER_LOGO_TEXT}
        </Typography.Text>
        {projectCardTypes?.text && (
          <Tag color={projectCardTypes?.color} className={styles.headerLogoTag}>
            {projectCardTypes?.text}
          </Tag>
        )}
      </Space>
      <Menu
        theme="dark"
        mode="horizontal"
        items={menuItems}
        onClick={onMenuClick}
        selectedKeys={activeMenuKey ? [activeMenuKey] : []}
        className={styles.headerMenu}
      />
      <Dropdown menu={{ items: settingsItems }} trigger={['click']}>
        <SettingOutlined className={styles.headerSettings} />
      </Dropdown>
    </AntdHeader>
  );
};
