import { createContext, useEffect, useState } from "react";

const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
    const [tickets, setTickets] = useState(() =>
        JSON.parse(localStorage.getItem("tickets")) || []
    );

    useEffect(() => {
        localStorage.setItem("tickets", JSON.stringify(tickets));
    }, [tickets]);

    const createTicket = ({ title, description, priority, attachments, user }) => {
        setTickets((prev) => [
            {
                id: crypto.randomUUID(),
                title,
                description,
                priority,
                status: "Open",
                attachments,
                comments: [],
                createdBy: user,
                createdAt: new Date().toISOString(),
            },
            ...prev,
        ]);
    };

    const updateStatus = (id, status) => {
        setTickets((prev) =>
            prev.map((t) => (t.id === id ? { ...t, status } : t))
        );
    };

    const addComment = (id, comment) => {
        setTickets((prev) =>
            prev.map((t) =>
                t.id === id
                    ? { ...t, comments: [...t.comments, comment] }
                    : t
            )
        );
    };

    return (
        <TicketContext.Provider
            value={{ tickets, createTicket, updateStatus, addComment }}
        >
            {children}
        </TicketContext.Provider>
    );
};

export default TicketContext;
