import { useState } from "react";
import useTickets from "../hooks/useTickets";
import { motion as Motion } from "framer-motion";

export default function CreateTicket() {
  const { addTicket } = useTickets();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [success, setSuccess] = useState(false);

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

    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 text-gray-100">
      <h1 className="text-3xl font-bold">Create Ticket</h1>
      <p className="text-gray-400">Submit a new support ticket for customer issues</p>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-6 rounded-xl shadow-md flex flex-col gap-5"
      >
        {/* Title */}
        <div>
          <label className="block mb-1 text-gray-400 font-medium">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter ticket title"
            className="w-full p-3 rounded-xl bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 text-gray-400 font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={5}
            placeholder="Describe the issue in detail"
            className="w-full p-3 rounded-xl bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
        </div>

        {/* Priority */}
        <div>
          <label className="block mb-1 text-gray-400 font-medium">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-3 rounded-xl bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-semibold transition"
        >
          Submit Ticket
        </button>

        {/* Success Message */}
        {success && (
          <Motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-green-700/80 text-white px-4 py-2 rounded-lg text-center font-medium"
          >
            Ticket created successfully!
          </Motion.div>
        )}
      </form>
    </div>
  );
}
