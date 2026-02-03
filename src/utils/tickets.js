// src/utils/tickets.js

export const loadTickets = () => {
    try {
        const stored = localStorage.getItem("tickets");
        return stored ? JSON.parse(stored) : [];
    } catch (err) {
        console.warn("Invalid tickets in localStorage", err);
        return [];
    }
};

export const createTicketObject = ({
    title,
    description,
    priority = "Low",
    attachments = [],
    user,
}) => ({
    id: crypto.randomUUID(),
    subject: title,
    message: description,
    priority,
    status: "Open",
    attachments,
    comments: [],
    createdBy: user,
    createdAt: new Date().toISOString(),
});

export const createCommentObject = (text, author) => ({
    id: crypto.randomUUID(),
    text,
    author,
    createdAt: new Date().toISOString(),
});
