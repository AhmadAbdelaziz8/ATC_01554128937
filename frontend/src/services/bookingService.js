const BASE_URL = import.meta.env.VITE_API_URL;
export async function bookEvent(eventId, token) {
  const response = await fetch(`${BASE_URL}/api/bookings/${eventId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    let errorMsg = "Booking failed";
    try {
      const errorData = await response.json();
      errorMsg = errorData.message || errorMsg;
    } catch {
      console.error("Error booking event:", response.statusText);
    }
    throw new Error(errorMsg);
  }

  return response.json();
}

export async function getUserBookings(token) {
  const response = await fetch(`${BASE_URL}/api/bookings`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    let errorMsg = "Failed to fetch bookings";
    try {
      const errorData = await response.json();
      errorMsg = errorData.message || errorMsg;
    } catch {
      console.error("Error fetching bookings:", response.statusText);
    }
    throw new Error(errorMsg);
  }

  return response.json();
}

export async function cancelBooking(bookingId, token) {
  const response = await fetch(`${BASE_URL}/api/bookings/${bookingId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    let errorMsg = "Failed to cancel booking";
    try {
      const errorData = await response.json();
      errorMsg = errorData.message || errorMsg;
    } catch {
      console.error("Error canceling booking:", response.statusText);
    }
    throw new Error(errorMsg);
  }

  return response.json();
}
