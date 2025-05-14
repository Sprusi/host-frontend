import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ConfigProvider } from 'antd';
//@ts-ignore
import GymFrontend from 'GymFrontend/GymFrontend';

import { Header } from '@/components/header/Header';
import { AuthPage } from '@/components/login/AuthPage';

import { hostTheme } from '@/styles/hostTheme';

interface ExtendedWindow extends Window {
  IS_MICROFRONTEND?: boolean;
}

export const DEFAULT_ROUTER_PATH = '/gym';

const Navigation = () => {
  useEffect(() => {
    (window as ExtendedWindow).IS_MICROFRONTEND = true;
  }, []);

  return (
    <ConfigProvider theme={hostTheme}>
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route
          path="gym/*"
          element={
            <>
              <Header />
              <GymFrontend />
            </>
          }
        />
        <Route path="*" element={<Navigate replace to={DEFAULT_ROUTER_PATH} />} />
        <Route path="/" element={<Navigate replace to={DEFAULT_ROUTER_PATH} />} />
      </Routes>
    </ConfigProvider>
  );
};

export default Navigation;
