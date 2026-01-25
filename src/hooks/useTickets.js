import { useContext } from "react";
import TicketContext from "../context/TicketContext";

export default function useTickets() {
  return useContext(TicketContext);
}
