import React, { FC } from 'react';

import { Spin, SpinProps } from 'antd';

import styles from './FullScreenLoader.module.scss';

export const FullScreenLoader: FC<SpinProps> = ({ children, className, ...restProps }) => {
  return (
    <Spin {...restProps} className={`${styles.spin} ${className}`}>
      {children}
    </Spin>
  );
};
