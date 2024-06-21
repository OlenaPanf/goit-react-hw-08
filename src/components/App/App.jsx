import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Layout from '../Layout/Layout';
import RestrictedRoute from "../RestrictedRoute";
import PrivateRoute from "../PrivateRoute";
import { refreshUser } from "../../redux/auth/operations";
import { selectIsRefreshing } from "../../redux/auth/selectors";
// import './App.css'

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const RegisterPage = lazy(() => import("../../pages/RegistrationPage/RegistrationPage"));
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
const ContactsPage = lazy(() => import("../../pages/ContactsPage/ContactsPage"));

export default function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);


  return isRefreshing ? (
    <div>REFRESHING USER...</div>
  ) : (
    <Layout>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RestrictedRoute component={<RegisterPage />} redirectTo="/" />} />
          <Route path="/login" element={<RestrictedRoute component={<LoginPage />} redirectTo="/contacts" />} />
          <Route path="/contacts" element={<PrivateRoute component={<ContactsPage />} redirectTo="/login" />} />
        </Routes>
      </Suspense>
    </Layout>
   
  );
}


 