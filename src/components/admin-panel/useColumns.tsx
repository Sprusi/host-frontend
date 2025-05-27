import { useMemo } from 'react';

import { EditOutlined } from '@ant-design/icons';

import { InterfaceLabels } from '@/host-constants';

import { Person } from '../profile/type/Person';

export const useColumns = (setModalPerson: (l: Person) => void, setModalOpen: (l: boolean) => void) =>
  useMemo(() => {
    const columns = [
      { title: InterfaceLabels.MP_COLUMNS.id, dataIndex: 'id', key: 'id' },
      { title: InterfaceLabels.MP_COLUMNS.fullName, dataIndex: 'fullName', key: 'fullName' },
      {
        title: InterfaceLabels.MP_COLUMNS.roles,
        dataIndex: 'roles',
        key: 'roles',
        render: (value: string[]) => value.join(', '),
      },
      {
        title: '',
        dataIndex: 'action',
        key: 'action',
        render: (_: string, record: Person) => (
          <EditOutlined
            onClick={() => {
              setModalPerson(record);
              setModalOpen(true);
            }}
          />
        ),
        width: 60,
        align: 'center' as const,
      },
    ];
    return columns;
  }, []);
