import React, { FC, useMemo } from 'react';

import { Flex, Result, Space } from 'antd';
import Title from 'antd/es/typography/Title';

import { InterfaceLabels } from '@/host-constants';

import styles from './ErrorView.module.scss';
import { ERROR_CODES } from './ErrorView.settings';

interface ErrorViewProps {
  error?: string | Error;
}

export const ErrorView: FC<ErrorViewProps> = ({ error }) => {
  const errorCode = useMemo(() => {
    if (error) return Number(error);
    const lastSegment = window.location.pathname.split('/').pop();
    return Number(lastSegment);
  }, [error]);

  const errorType = Number.isNaN(errorCode) ? 'any' : errorCode;
  const { message, status } = ERROR_CODES[errorType] || {
    message: InterfaceLabels.NO_CONNECTION_TO_SERVER,
    status: 500,
  };

  return (
    <Flex justify="center" align="center" className={styles.container}>
      <Result
        status={status}
        subTitle={
          <Space direction={'vertical'}>
            <Title level={3} className={styles.title}>
              {message}
            </Title>
            <Title level={5} className={styles.message}>
              {InterfaceLabels.ERROR('' + (error || errorCode))}
            </Title>
          </Space>
        }
      />
    </Flex>
  );
};
