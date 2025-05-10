import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import EventDetailsPage from "./pages/EventDetailsPage";
import BookConfirmationPage from "./pages/BookConfirmationPage";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <main className="container mx-auto p-4 mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events/:eventId" element={<EventDetailsPage />} />
          <Route
            path="/booking-confirmation/:eventId"
            element={<BookConfirmationPage />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
