import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Descriptions, DescriptionsProps, Row } from 'antd';

import { InterfaceLabels } from '@/host-constants';

import ModalProfileEdit from './modal-edit/ModalProfileEdit';
import styles from './Profile.module.scss';
import { Person } from './type/Person';
import { Sex } from './type/SexTypes';
import { useToken } from '@/hook/useToken';
import { ProfileService } from '@/services';
import { MessageService } from '@/services/MessageService';

export const Profile = () => {
  const { payload } = useToken();

  const [loading, setLoading] = useState(true);
  const [updateNeeded, setUpdateNeeded] = useState(true);
  const [person, setPerson] = useState<Person>();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!updateNeeded) return;
    getData();
  }, [updateNeeded]);

  const getData = useCallback(() => {
    if (!payload?.id) return;
    setLoading(true);
    ProfileService.getUserById(payload?.id)
      .then(({ data }) => setPerson(data))
      .catch(({ message }) => MessageService.warn(message))
      .finally(() => {
        setLoading(false);
        setUpdateNeeded(false);
      });
  }, [payload?.id]);

  const fullName = `${person?.firstName || ''} ${person?.middleName || ''} ${person?.lastName || ''}`.trim();

  const items: DescriptionsProps['items'] = useMemo(
    () => [
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
    ],
    [person]
  );

  const title = useMemo(
    () => (
      <Row justify="space-between">
        {fullName || person?.email}
        <Button onClick={() => setModalOpen(true)}>{InterfaceLabels.PERSON_PROFILE_EDIT}</Button>
      </Row>
    ),
    [person, fullName]
  );

  return (
    <div className={styles.wrapper}>
      <Card loading={loading}>
        <Card.Meta
          avatar={
            <Avatar
              size={{ xs: 0, sm: 70, md: 100, lg: 120, xl: 140, xxl: 140 }}
              icon={<UserOutlined />}
              src={person?.avatar}
            />
          }
          description={<Descriptions title={title} items={items} />}
        />
      </Card>
      <ModalProfileEdit person={person} setUpdateNeeded={setUpdateNeeded} modalOpenState={[modalOpen, setModalOpen]} />
    </div>
  );
};
