import React, { useCallback, useEffect, useState } from 'react';

import { Card, Table, Typography } from 'antd';

import { dataMapper } from './utils';
import { InterfaceLabels } from '@/host-constants';

import { Person } from '../profile/type/Person';

import styles from './AdminPanel.module.scss';
import ModalPersonEdit from './modal-edit/ModalPersonEdit';
import { useColumns } from './useColumns';
import { ProfileService } from '@/services';
import { MessageService } from '@/services/MessageService';

export const AdminPanel = () => {
  const [users, setUsers] = useState<Person[]>([]);
  const [updateNeeded, setUpdateNeeded] = useState(true);
  const [loading, setLoading] = useState(false);

  const [modalPerson, setModalPerson] = useState<Person>();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!updateNeeded) return;
    getData();
  }, [updateNeeded]);

  const getData = useCallback(() => {
    setLoading(true);
    ProfileService.getAllUsers()
      .then(({ data }) => setUsers(dataMapper(data)))
      .catch(({ message }) => MessageService.warn(message))
      .finally(() => {
        setUpdateNeeded(false);
        setLoading(false);
      });
  }, []);

  const columns = useColumns(setModalPerson, setModalOpen);

  return (
    <div className={styles.wrapper}>
      <Typography.Title level={2}>{InterfaceLabels.MP_ADMIN_PANEL}</Typography.Title>
      <Card title={InterfaceLabels.MP_ALL_USERS}>
        <Table dataSource={users} loading={loading} columns={columns} rowKey={'id'} bordered />
      </Card>

      <ModalPersonEdit
        recordState={[modalPerson, setModalPerson]}
        modalOpenState={[modalOpen, setModalOpen]}
        setUpdateNeeded={setUpdateNeeded}
      />
    </div>
  );
};
