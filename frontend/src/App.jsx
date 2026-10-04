import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";

import { ToastProvider } from "./context/ToastContext";
import SignupPage from "./pages/SignupPage";
import VerifyEmail from "./pages/VerifyEmail";
import LoginPage from "./pages/LoginPage";
import EventsPage from "./pages/EventsPage";
import CreateEvent from "./pages/CreateEvent";
import EventDetailPage from "./pages/EventDetailPage";
import LandingPage from "./pages/LandingPage";
import ScrollToTop from "./components/ScrollToTop";

const LoggedOutOnly = () => {
  if (localStorage.getItem("token")) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

const App = () => {
  return (
    <ToastProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          {/* Authentication Routes */}
          <Route element={<LoggedOutOnly />}>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>

          {/* Core Event Routes */}
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/create" element={<CreateEvent />} />
          <Route path="/events/:publicId" element={<EventDetailPage />} />

        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
};

export default App;
