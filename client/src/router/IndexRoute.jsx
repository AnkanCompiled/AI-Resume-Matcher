import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import LoadingComponent from "../components/LoadingComponent";
import GuestRoute from "./GuestRoute";

const AboutPage = lazy(() => import("../pages/AboutPage"));
const LandingPage = lazy(() => import("../pages/LandingPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

export default function IndexRoute() {
    return (
        <Suspense fallback={<LoadingComponent fullscreen={true} />}>
            <Routes>
                <Route
                    path="/"
                    element={
                        <GuestRoute children={<LandingPage />} />
                    }
                />
                <Route
                    path="/about"
                    element={
                        <AboutPage />
                    }
                />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Suspense>
    )
}
