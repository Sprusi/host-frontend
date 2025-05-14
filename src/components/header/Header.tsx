import React, { useMemo } from 'react';

import { SettingOutlined } from '@ant-design/icons';
import { Dropdown, Layout, MenuProps, Space, Tag, Typography } from 'antd';

import { InterfaceLabels } from '@/host-constants';

import styles from './Header.module.scss';

const { Header: AntdHeader } = Layout;

export const Header = () => {
  const settingsItems: MenuProps['items'] = useMemo(
    () => [
      {
        key: 'exit',
        danger: true,
        label: InterfaceLabels.HEADER_SETTINGS_EXIT,
      },
    ],
    []
  );

  const projectCardTypes = useMemo(
    () =>
      ({
        gym: { text: InterfaceLabels.HEADER_GYM_PROJECT_TYPE, color: 'orange' },
        shop: { text: InterfaceLabels.HEADER_SHOP_PROJECT_TYPE, color: 'green' },
      }[location.pathname.split('/')[1] || 'gym']),
    [location.pathname]
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
      <Dropdown menu={{ items: settingsItems }} trigger={['click']}>
        <SettingOutlined className={styles.headerSettings} />
      </Dropdown>
    </AntdHeader>
  );
};
