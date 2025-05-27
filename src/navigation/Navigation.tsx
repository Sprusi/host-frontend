import React, { Suspense, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AdminPanel } from '@/components/admin-panel/AdminPanel';
import { FullScreenLoader } from '@/components/fullscreen-loader/FullScreenLoader';
import { Header } from '@/components/header/Header';
import { AuthPage } from '@/components/login/AuthPage';
import { Profile } from '@/components/profile/Profile';

import { getDefaultPath, hasAccess } from '@/utils/SecurityUtils';

import GymFrontend from '../microfrontends/GymFrontend';

import ShopFrontend from '@/microfrontends/ShopFrontend';

interface ExtendedWindow extends Window {
  IS_MICROFRONTEND?: boolean;
}

const Navigation = () => {
  useEffect(() => {
    (window as ExtendedWindow).IS_MICROFRONTEND = true;
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<AuthPage />} />
      {hasAccess('profile') && (
        <Route
          path="/profile"
          element={
            <>
              <Header />
              <Profile />
            </>
          }
        />
      )}
      {hasAccess('managerPanel') && (
        <Route
          path="/managerPanel"
          element={
            <>
              <Header />
              <AdminPanel />
            </>
          }
        />
      )}
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
      <Route path="*" element={<Navigate replace to={getDefaultPath()} />} />
      <Route path="/" element={<Navigate replace to={getDefaultPath()} />} index />
    </Routes>
  );
};

export default Navigation;
