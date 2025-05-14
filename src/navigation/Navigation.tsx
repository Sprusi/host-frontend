import React, { Suspense, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Header } from '@/components/header/Header';
import { AuthPage } from '@/components/login/AuthPage';

import GymFrontend from '../microfrontends/GymFrontend';

import { FullScreenLoader } from '@/fullscreen-loader/FullScreenLoader';
import ShopFrontend from '@/microfrontends/ShopFrontend';

interface ExtendedWindow extends Window {
  IS_MICROFRONTEND?: boolean;
}

export const DEFAULT_ROUTER_PATH = '/gym';

const Navigation = () => {
  useEffect(() => {
    (window as ExtendedWindow).IS_MICROFRONTEND = true;
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<AuthPage />} />
      <Route
        path="gym/*"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <Header />
            <GymFrontend />
          </Suspense>
        }
      />
      <Route
        path="shop/*"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <Header />
            <ShopFrontend />
          </Suspense>
        }
      />
      <Route path="*" element={<Navigate replace to={DEFAULT_ROUTER_PATH} />} />
      <Route path="/" element={<Navigate replace to={DEFAULT_ROUTER_PATH} />} index />
    </Routes>
  );
};

export default Navigation;
