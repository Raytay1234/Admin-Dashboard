// src/pages/Comments.jsx
import { useState } from "react";
import { motion as Motion } from "framer-motion";

// Mock comments generator
const generateComments = () =>
  Array.from({ length: 20 }).map((_, i) => ({
    id: `CMT${i + 1}`,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    avatar: `https://i.pravatar.cc/100?img=${i + 10}`,
    comment: `This is a sample comment number ${i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    date: new Date(
      Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30)
    ).toLocaleDateString("en-US"),
    status: Math.random() > 0.5 ? "Approved" : "Pending",
  }));

export default function Comments() {
  const [comments] = useState(generateComments);

  return (
    <div className="p-6 lg:p-8 space-y-6 bg-gray-900 min-h-screen">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">Comments</h1>
        <p className="text-gray-400 text-sm">
          Overview of all user comments and statuses
        </p>
      </div>

      {/* Comments Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {comments.map((c, idx) => (
          <Motion.div
            key={c.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.03 }}
            className="bg-gray-800 text-gray-100 rounded-2xl p-5 shadow-md flex flex-col gap-3 cursor-pointer
              hover:shadow-2xl hover:-translate-y-1 transition transform"
          >
            {/* Header: Avatar + Name + Status */}
            <div className="flex items-center gap-3">
              <img
                src={c.avatar}
                alt={c.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-green-500"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{c.name}</p>
                <p className="text-gray-400 text-sm truncate">{c.email}</p>
              </div>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full ${c.status === "Approved"
                    ? "bg-green-900/40 text-green-400"
                    : "bg-yellow-900/40 text-yellow-400"
                  }`}
              >
                {c.status}
              </span>
            </div>

            {/* Comment Body */}
            <p className="text-gray-300 text-sm">{c.comment}</p>

            {/* Footer: Date */}
            <div className="text-gray-500 text-xs self-end">{c.date}</div>
          </Motion.div>
        ))}
      </div>
    </div>
  );
}
