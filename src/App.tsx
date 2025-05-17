import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ConfigProvider } from 'antd';
import ru_RU from 'antd/es/locale/ru_RU';

import ErrorBoundary from './components/error/ErrorBoundary';

import Navigation from './navigation/Navigation';
import { hostTheme } from './styles/hostTheme';

export const App = () => {
  return (
    <ConfigProvider theme={hostTheme} locale={ru_RU}>
      <ErrorBoundary>
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      </ErrorBoundary>
    </ConfigProvider>
  );
};
export default App;
