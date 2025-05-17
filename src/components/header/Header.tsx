import React, { useMemo, useState } from 'react';

import { SettingOutlined } from '@ant-design/icons';
import { Dropdown, Layout, Menu, Space, Tag, Typography } from 'antd';

import { InterfaceLabels } from '@/host-constants';

import styles from './Header.module.scss';
import { useMenu } from './useMenu';
import { useSettingItem } from './useSettingItem';

const { Header: AntdHeader } = Layout;

export const Header = () => {
  const [loading, setLoading] = useState(false);

  const { menuItems, activeMenuKey, onMenuClick } = useMenu();
  const { settingsItems } = useSettingItem(setLoading);

  const projectCardTypes = useMemo(
    () =>
      ({
        gym: { text: InterfaceLabels.HEADER_GYM_PROJECT_TYPE, color: 'orange' },
        shop: { text: InterfaceLabels.HEADER_SHOP_PROJECT_TYPE, color: 'green' },
      }[activeMenuKey]),
    [activeMenuKey]
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
        <SettingOutlined className={styles.headerIcon} spin={loading} />
      </Dropdown>
    </AntdHeader>
  );
};
