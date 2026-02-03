// src/pages/TicketDetails.jsx
import { useParams } from "react-router-dom";
import { useState } from "react";
import Layout from "../components/Layout.jsx";
import useTickets from "../hooks/useTickets";

export default function TicketDetails() {
    const { id } = useParams();
    const { tickets, updateStatus, addComment } = useTickets();

    const ticket = tickets.find((t) => t.id === id);
    const [status, setStatus] = useState(ticket?.status || "");
    const [comment, setComment] = useState("");

    if (!ticket) {
        return (
            <Layout>
                <p className="text-red-400">Ticket not found</p>
            </Layout>
        );
    }

    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        setStatus(newStatus);
        updateStatus(ticket.id, newStatus);
    };

    const handleAddComment = () => {
        if (!comment.trim()) return;
        addComment(ticket.id, comment.trim(), "Admin"); // replace with logged-in user if available
        setComment("");
    };

    return (
        <Layout>
            <div className="max-w-3xl space-y-6">
                <h1 className="text-2xl font-bold mb-2">{ticket.subject}</h1>
                <p className="text-gray-400 mb-6">
                    {ticket.id} • {ticket.createdBy}
                </p>

                <div className="bg-gray-800 p-6 rounded-xl shadow-md space-y-4">
                    <p className="text-gray-300">{ticket.message}</p>

                    <div className="flex gap-4">
                        <span className="text-sm text-gray-400">Priority: {ticket.priority}</span>
                        <span className="text-sm text-gray-400">Status: {ticket.status}</span>
                    </div>

                    {/* Status update */}
                    <div className="flex items-center gap-4 pt-4">
                        <label className="text-sm text-gray-400">Update Status:</label>
                        <select
                            value={status}
                            onChange={handleStatusChange}
                            className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2"
                        >
                            <option>Open</option>
                            <option>Pending</option>
                            <option>Resolved</option>
                            <option>Closed</option>
                        </select>
                    </div>

                    {/* Add comment */}
                    <div className="pt-4">
                        <label className="text-sm text-gray-400">Add Comment:</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows={3}
                            placeholder="Write a comment..."
                            className="w-full mt-1 p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-100"
                        />
                        <button
                            onClick={handleAddComment}
                            className="mt-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white font-medium"
                        >
                            Add Comment
                        </button>
                    </div>

                    {/* Comments List */}
                    {ticket.comments.length > 0 && (
                        <div className="pt-4 border-t border-gray-600 space-y-2">
                            <h3 className="text-sm font-semibold text-gray-300">Comments:</h3>
                            {ticket.comments.map((c) => (
                                <div key={c.id} className="text-sm text-gray-400">
                                    <strong>{c.author}:</strong> {c.text} <span className="text-gray-500 text-xs">({new Date(c.createdAt).toLocaleString()})</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
