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
