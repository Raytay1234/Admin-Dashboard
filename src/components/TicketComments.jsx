import { useState } from "react";

export default function TicketComments({ ticket, onAdd }) {
    const [text, setText] = useState("");

    return (
        <div className="bg-gray-900 p-4 rounded-xl mt-4">
            <h3 className="text-gray-100 mb-2">Comments</h3>

            {ticket.comments.map((c, i) => (
                <p key={i} className="text-gray-300 mb-1">
                    <strong>{c.author}</strong>: {c.text}
                </p>
            ))}

            <input
                className="w-full p-2 mt-2 rounded text-black"
                placeholder="Write a comment..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        onAdd({ author: "Admin", text });
                        setText("");
                    }
                }}
            />
        </div>
    );
}
