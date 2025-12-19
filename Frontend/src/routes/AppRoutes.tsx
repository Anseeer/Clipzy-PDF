import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import { LoginPage } from "../pages/LoginPage";
import { RegistrationPage } from "../pages/RegistrationPage";
import { HomePage } from "../pages/HomePage";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={
                <PublicRoute>
                    <LandingPage />
                </PublicRoute>
            } />
            <Route path="/login" element={
                <PublicRoute>
                    <LoginPage />
                </PublicRoute>
            } />
            <Route path="/register" element={
                <PublicRoute>
                    <RegistrationPage />
                </PublicRoute>
            } />
            <Route path="/home" element={
                <ProtectedRoute>
                    <HomePage />
                </ProtectedRoute>
            } />
        </Routes>
    );
}

export default AppRoutes;