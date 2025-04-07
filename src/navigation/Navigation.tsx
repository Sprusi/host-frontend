import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

//@ts-ignore
import GymFrontend from 'GymFrontend/GymFrontend';

const Navigation = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate replace to={'/gym'} />} />
      <Route path="/" element={<Navigate replace to={'/gym'} />} />
      <Route
        path="gym/*"
        element={
          <>
            <h1>HEDER</h1>
            <GymFrontend />
          </>
        }
      />
    </Routes>
  );
};

export default Navigation;
