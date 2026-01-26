import { useEffect, useState } from "react";

export default function useTickets() {
  // ✅ Lazy initialization (NO effect needed)
  const [tickets, setTickets] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("tickets")) || [];
    } catch {
      return [];
    }
  });

  // ✅ Effect is now ONLY syncing to external system (localStorage)
  useEffect(() => {
    localStorage.setItem("tickets", JSON.stringify(tickets));
  }, [tickets]);

  const addTicket = (ticket) => {
    setTickets((prev) => [...prev, ticket]);
  };

  const updateStatus = (id, status) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status } : t
      )
    );
  };

  return {
    tickets,
    addTicket,
    updateStatus,
  };
}
