import React, { useCallback, useEffect, useState } from 'react';

import { Button, Card, Col, Flex, Form, Input, Row, Typography } from 'antd';
import Link from 'antd/es/typography/Link';

import { InterfaceLabels } from '@/host-constants';
import { getRequiredRule } from '@/utils/formUtils';

import styles from './AuthPage.module.scss';
import { localStorageAuth } from './localStorageAuth';
import { TokenResponse } from './type/TokenResponse';
import { useToken } from '@/hook/useToken';
import { DEFAULT_ROUTER_PATH } from '@/navigation/Navigation';
import { AuthService } from '@/services/AuthService';
import { MessageService } from '@/services/MessageService';

const { Item } = Form;

export interface AuthForm {
  email: string;
  password: string;
}
export interface RegisterForm extends AuthForm {
  repeatPassword: string;
}

export const AuthPage = () => {
  const [form] = Form.useForm<RegisterForm>();
  const { isAuthenticated } = useToken();

  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) window.location.assign(DEFAULT_ROUTER_PATH);
  }, [isAuthenticated]);

  const showError = useCallback((e: any) => {
    const msg =
      e?.response?.data?.message ||
      e?.response?.data?.join?.('\n') ||
      e?.message ||
      e?.message?.join?.('\n') ||
      String(e);
    MessageService.warn(msg);
  }, []);

  const saveTokenAndNavigate = useCallback((data: TokenResponse) => {
    const token = localStorageAuth.setCurrentToken(data);
    if (!token?.payload) return MessageService.error('Failed to get auth token payload');
    MessageService.success();
    const path = localStorageAuth.popRequestedPath();
    setTimeout(() => window.location.assign(path || DEFAULT_ROUTER_PATH), 800);
  }, []);

  const handleLogin = (value: AuthForm) => {
    setLoading(true);
    AuthService.login(value)
      .then(({ data }) => saveTokenAndNavigate(data))
      .catch((e) => {
        showError(e);
        form.resetFields(['password']);
      })
      .finally(() => setLoading(false));
  };

  const handleRegister = (value: RegisterForm) => {
    if (value.password !== value.repeatPassword) return MessageService.warn(InterfaceLabels.AUTH_REPASSWORD_NOT_MATCH);
    setLoading(true);
    AuthService.registration({ email: value.email, password: value.password })
      .then(({ data }) => saveTokenAndNavigate(data))
      .catch((e) => {
        showError(e);
        form.resetFields(['password', 'repeatPassword']);
      })
      .finally(() => setLoading(false));
  };

  const handleFinish = (values: AuthForm | RegisterForm) => {
    isRegister ? handleRegister(values as RegisterForm) : handleLogin(values as AuthForm);
  };

  const getSwitchAuthTypeButton = useCallback(
    (type: 'SINGIN' | 'SINGUP') => {
      const shouldRender = (type === 'SINGIN' && isRegister) || (type === 'SINGUP' && !isRegister);
      if (!shouldRender) return null;
      const label = type === 'SINGIN' ? InterfaceLabels.AUTH_TO_AUTHORIZATION : InterfaceLabels.AUTH_TO_SIGNUP;
      return (
        <Link
          className={styles.cardFormSwitchAuthTypeButton}
          onClick={() => {
            setIsRegister((prev) => !prev);
            form.resetFields(['password', 'repeatPassword']);
          }}
        >
          {label}
        </Link>
      );
    },
    [isRegister]
  );

  return (
    <Row justify={'center'} align={'middle'} className={styles.wrapper}>
      <Col xs={20} sm={15} md={11} lg={9} xl={7}>
        <Row justify={'center'}>
          <Typography.Title level={1} className={styles.cardTitle}>
            {isRegister ? InterfaceLabels.AUTH_SIGNUP : InterfaceLabels.AUTH_SIGNIN}
          </Typography.Title>
          <Card className={styles.card}>
            <Form layout="vertical" labelWrap onFinish={handleFinish} form={form}>
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
                extra={getSwitchAuthTypeButton('SINGUP')}
              >
                <Input type={'password'} />
              </Item>
              {isRegister && (
                <Item
                  label={InterfaceLabels.AUTH_REPASSWORD}
                  name={'repeatPassword'}
                  rules={[getRequiredRule()]}
                  className={styles.cardFormItem}
                  extra={getSwitchAuthTypeButton('SINGIN')}
                >
                  <Input type={'password'} />
                </Item>
              )}
              <Flex justify="center">
                <Button type="primary" htmlType="submit" loading={loading} className={styles.cardFormButton}>
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
