import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Card, Col, Flex, Form, Input, Row, Typography } from 'antd';

import { getRequiredRule } from './utils';
import { InterfaceLabels } from '@/host-constants';

import styles from './AuthPage.module.scss';
import { localStorageAuth } from './localStorageAuth';
import { DEFAULT_ROUTER_PATH } from '@/navigation/Navigation';
import { AuthService } from '@/services/AuthService';
import { MessageService } from '@/services/MessageService';

const { Item } = Form;

export interface AuthForm {
  login: string;
  password: string;
}
export interface RegisterForm extends AuthForm {
  repeatPassword: string;
}

export const AuthPage = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  const { token, payload } = localStorageAuth.getCurrentToken() || {};
  const isAuthenticated = useMemo(() => {
    if (!token?.accessToken || !payload?.roles) return false;
    return (payload?.exp || 0) * 1000 > Date.now() + 2000;
  }, [token, payload]);

  useEffect(() => {
    if (isAuthenticated) navigate(DEFAULT_ROUTER_PATH);
  }, [isAuthenticated, navigate]);

  const handleLogin = (value: AuthForm) => {
    setLoading(true);
    AuthService.login(value)
      .then(({ data }) => {
        const token = localStorageAuth.setCurrentToken(data);
        if (!token?.payload) return MessageService.error('Failed to get auth token payload');
        MessageService.success();
        const requestedPath = localStorageAuth.popRequestedPath();
        setTimeout(() => navigate(requestedPath || DEFAULT_ROUTER_PATH, { replace: false }), 800);
      })
      .catch((e) => MessageService.error(e?.message || e, e))
      .finally(() => setLoading(false));
  };

  const handleRegister = (value: RegisterForm) => {
    if (!value) return;
    setIsRegister(false);
  };

  const handleFinish = (values: AuthForm | RegisterForm) => {
    isRegister ? handleRegister(values as RegisterForm) : handleLogin(values as AuthForm);
  };

  return (
    <Row justify={'center'} align={'middle'} className={styles.wrapper}>
      <Col xs={20} sm={12} md={10} lg={8} xl={7}>
        <Row justify={'center'}>
          <Typography.Title level={1}>
            {isRegister ? InterfaceLabels.AUTH_SIGNUP : InterfaceLabels.AUTH_SIGNIN}
          </Typography.Title>
          <Card className={styles.card}>
            <Form layout="vertical" labelWrap onFinish={handleFinish}>
              <Item
                label={InterfaceLabels.AUTH_EMAIL}
                name={'email'}
                rules={[getRequiredRule()]}
                className={styles.cardFormItem}
              >
                <Input />
              </Item>
              <Item
                label={InterfaceLabels.AUTH_PASSWORD}
                name={'password'}
                rules={[getRequiredRule()]}
                className={styles.cardFormItem}
              >
                <Input type={'password'} />
              </Item>
              {isRegister && (
                <Item name={'repeatPassword'} rules={[getRequiredRule()]} className={styles.cardFormItem}>
                  <Input type={'password'} />
                </Item>
              )}
              <Flex justify="center">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  disabled={isRegister}
                  className={styles.cardFormButton}
                >
                  {isRegister ? InterfaceLabels.AUTH_TO_SIGNUP : InterfaceLabels.AUTH_TO_SIGNIN}
                </Button>
              </Flex>
            </Form>
          </Card>
        </Row>
      </Col>
    </Row>
  );
};
