import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import EventDetailsPage from "./pages/EventDetailsPage";
import BookConfirmationPage from "./pages/BookConfirmationPage";
import AuthPage from "./pages/AuthPage";
import MyBookingsPage from "./pages/MyBookingsPage";
import ProtectedAdminRoute from "./components/routes/ProtectedAdminRoute";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminEventListPage from "./pages/admin/AdminEventListPage";
import CreateEventPage from "./pages/admin/CreateEventPage";
import EditEventPage from "./pages/admin/EditEventPage";

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
            {/* Public and User Routes */}
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

            {/* Admin Routes */}
            <Route path="/admin" element={<ProtectedAdminRoute />}>
              <Route element={<AdminDashboardPage />}>
                <Route
                  index
                  element={<Navigate to="/admin/events" replace />}
                />
                <Route path="events" element={<AdminEventListPage />} />
                <Route path="events/new" element={<CreateEventPage />} />
                <Route path="events/edit/:id" element={<EditEventPage />} />
              </Route>
            </Route>
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
