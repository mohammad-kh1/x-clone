import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import Sidebar from "./components/common/Sidebar.jsx";
import RightPanel from "./components/common/RightPanel.jsx";
import NotificationPage from "./pages/NotificationPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import { ToastBar } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./components/common/LoadingSpinner.jsx";
const App = () => {
  const {
    data: authUser,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        return data;
      } catch (error) {}
    },
  });

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-stretch">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  return (
    <div className="flex max-w-6xl mx-auto">
      <Sidebar />
      <Routes>
        <Route
          path="/"
          element={
            authUser.success == true ? <HomePage /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/signup"
          element={
            authUser.sucess == false ? <SignUpPage /> : <Navigate to="/" />
          }
        />
        <Route
          path="/login"
          element={
            authUser.sucess == false ? <LoginPage /> : <Navigate to="/" />
          }
        />
        <Route
          path="/notifications"
          element={
            authUser.success == true ? (
              <NotificationPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/profile/:username"
          element={
            authUser.success == true ? (
              <ProfilePage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
      <RightPanel />
    </div>
  );
};

export default App;
