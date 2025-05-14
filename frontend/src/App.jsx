import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import EventDetailsPage from "./pages/EventDetailsPage";
import BookConfirmationPage from "./pages/BookConfirmationPage";
import AuthPage from "./pages/AuthPage";
import MyBookingsPage from "./pages/MyBookingsPage";

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <main className="container mx-auto p-4 mt-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/events/:eventId" element={<EventDetailsPage />} />
            <Route
              path="/booking-confirmation/:eventId"
              element={
                <ProtectedRoute>
                  <BookConfirmationPage />
                </ProtectedRoute>
              }
            />
            <Route path="/auth" element={<AuthPage />} />

            <Route
              path="/my-bookings"
              element={
                <ProtectedRoute>
                  <MyBookingsPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
