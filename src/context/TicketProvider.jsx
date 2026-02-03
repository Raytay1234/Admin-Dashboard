// src/context/TicketProvider.jsx
import { useEffect, useState } from "react";
import TicketContext from "./TicketContext.js";
import { loadTickets, createTicketObject, createCommentObject } from "../utils/tickets.js";

export default function TicketProvider({ children }) {
    const [tickets, setTickets] = useState(loadTickets);

    // Persist to localStorage
    useEffect(() => {
        localStorage.setItem("tickets", JSON.stringify(tickets));
    }, [tickets]);

    const createTicket = (ticketData) => {
        const newTicket = createTicketObject(ticketData);
        setTickets((prev) => [newTicket, ...prev]);
    };

    const updateStatus = (id, status) => {
        setTickets((prev) =>
            prev.map((t) => (t.id === id ? { ...t, status } : t))
        );
    };

    const addComment = (id, text, author) => {
        setTickets((prev) =>
            prev.map((t) =>
                t.id === id
                    ? { ...t, comments: [...t.comments, createCommentObject(text, author)] }
                    : t
            )
        );
    };

    return (
        <TicketContext.Provider value={{ tickets, createTicket, updateStatus, addComment }}>
            {children}
        </TicketContext.Provider>
    );
}
