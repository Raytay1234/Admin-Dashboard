// src/hooks/useTickets.js
import { useContext } from "react";
import TicketContext from "../context/TicketContext.js";

export default function useTickets() {
  const ctx = useContext(TicketContext);
  if (!ctx) throw new Error("useTickets must be used inside TicketProvider");
  return ctx;
}
