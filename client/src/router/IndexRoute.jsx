import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import LoadingComponent from "../components/LoadingComponent";
import GuestPath from "./GuestPath";

const AboutPage = lazy(() => import("../pages/AboutPage"));
const AuthPage = lazy(() => import("../pages/AuthPage"));
const LandingPage = lazy(() => import("../pages/LandingPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

export default function IndexRoute() {
    return (
        <Suspense fallback={<LoadingComponent fullscreen={true} />}>
            <Routes>
                <Route path="/" element={<GuestPath children={<LandingPage />} />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/auth">
                    <Route index element={<Navigate to="/auth/login" />} />
                    <Route path="login" element={<GuestPath children={<AuthPage type="login" />} />} />
                    <Route path="register" element={<GuestPath children={<AuthPage type="register" />} />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Suspense>
    )
}
