import { useState } from "react";
import useTickets from "../hooks/useTickets";

export default function CreateTicket() {
  const { addTicket } = useTickets();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTicket = {
      id: Date.now(),
      title,
      description,
      priority,
      status: "Open",
      createdAt: new Date().toISOString(),
    };

    addTicket(newTicket);

    setTitle("");
    setDescription("");
    setPriority("Low");

    alert("Ticket created successfully!");
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 text-gray-100">
      <h1 className="text-3xl font-bold">Create Ticket</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-6 rounded-xl shadow-md flex flex-col gap-4"
      >
        <div>
          <label className="block mb-1">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 rounded bg-gray-800"
          />
        </div>

        <div>
          <label className="block mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            className="w-full p-2 rounded bg-gray-800"
          />
        </div>

        <div>
          <label className="block mb-1">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-2 rounded bg-gray-800"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded">
          Submit Ticket
        </button>
      </form>
    </div>
  );
}
