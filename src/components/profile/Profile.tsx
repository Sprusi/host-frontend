import React, { useCallback, useEffect, useState } from 'react';

import { UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Descriptions, DescriptionsProps } from 'antd';

import { InterfaceLabels } from '@/host-constants';

import styles from './Profile.module.scss';
import { Person } from './type/Person';
import { Sex } from './type/SexTypes';
import { useToken } from '@/hook/useToken';
import { ProfileService } from '@/services';
import { MessageService } from '@/services/MessageService';

export const Profile = () => {
  const { payload } = useToken();
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState<Person>();

  useEffect(() => {
    getData();
  }, []);

  const getData = useCallback(() => {
    if (!payload?.id) return;
    setLoading(true);
    ProfileService.getUserById(payload?.id)
      .then(({ data }) => setPerson(data))
      .catch(({ message }) => MessageService.warn(message))
      .finally(() => setLoading(false));
  }, [payload?.id]);

  const fullName = `${person?.firstName} ${person?.middleName} ${person?.lastName}`;

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'email',
      children: person?.email,
    },
    {
      key: '2',
      label: InterfaceLabels.PERSON_PHONE,
      children: person?.phone,
    },
    {
      key: '3',
      label: InterfaceLabels.PERSON_SEX,
      children: person?.sex && Sex[person?.sex],
    },
    {
      key: '4',
      label: InterfaceLabels.PERSON_AGE,
      children: person?.age,
    },
    {
      key: '5',
      label: InterfaceLabels.PERSON_HEIGHT,
      children: person?.height,
    },
    {
      key: '6',
      label: InterfaceLabels.PERSON_WEIGHT,
      children: person?.weight,
    },
  ];

  return (
    <div className={styles.wrapper}>
      <Card loading={loading}>
        <Card.Meta
          avatar={
            <Avatar
              size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 140, xxl: 140 }}
              icon={<UserOutlined />}
              src={person?.avatar}
            />
          }
          description={<Descriptions title={fullName || person?.email} items={items} />}
        />
      </Card>
    </div>
  );
};
