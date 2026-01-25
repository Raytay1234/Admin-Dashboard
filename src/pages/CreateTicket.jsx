import { useState } from "react";

export default function CreateTicket() {
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

    // Store in localStorage (replace with API call in production)
    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
    localStorage.setItem("tickets", JSON.stringify([...tickets, newTicket]));
    alert("Ticket created successfully!");
    setTitle("");
    setDescription("");
    setPriority("Low");
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 text-gray-100">
      <h1 className="text-3xl font-bold mb-6">Create Ticket</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-6 rounded-xl shadow-md flex flex-col gap-4"
      >
        <div>
          <label className="block mb-1 text-gray-200">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 rounded-md text-gray-100 bg-gray-800"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-200">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={5}
            className="w-full p-2 rounded-md text-gray-100 bg-gray-800"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-200">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-2 rounded-md text-gray-100 bg-gray-800"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Submit Ticket
        </button>
      </form>
    </div>
  );
}
