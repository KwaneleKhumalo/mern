import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import App from './App';
import LoginScreen from './pages/LoginScreen';
import RegistrationScreen from './pages/RegistrationScreen'
import HomeScreen from './pages/HomeScreen'
import DashboardScreen from './pages/DashboardScreen';
import ProfileScreen from './pages/ProfileScreen';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegistrationScreen />} />
      <Route path="/dashboard" element={<DashboardScreen />} />
      <Route path='/profile' element={<ProfileScreen />} />
    </Route>
  )
)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);

