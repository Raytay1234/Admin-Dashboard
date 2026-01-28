import { useState } from "react";

export default function Help() {
  const [search, setSearch] = useState("");
  const [ticket, setTicket] = useState({
    email: "",
    subject: "",
    message: "",
  });

  const faqs = [
    { q: "How do I add new products?", a: "Go to Products → Add Product." },
    { q: "How do I promote a product?", a: "Use the Promote page." },
    { q: "Why are charts not showing?", a: "Ensure the container has a height." },
    { q: "How do I enable dark mode?", a: "Use the toggle in the navbar." },
    { q: "How do I contact support?", a: "Submit a support ticket below." },
  ];

  const filteredFaqs = faqs.filter((f) =>
    f.q.toLowerCase().includes(search.toLowerCase())
  );

  const submitTicket = (e) => {
    e.preventDefault();
    alert("Support ticket submitted!");
    setTicket({ email: "", subject: "", message: "" });
  };

  return (
    <div className="p-6 lg:p-12 space-y-12 text-gray-100 max-w-7xl mx-auto">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          Help & Support
        </h1>
        <p className="text-gray-400 text-lg">
          Search for answers or contact support directly.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search help topics..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-5 py-4 rounded-2xl border border-gray-700 bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        />
        <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400">
          🔍
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* FAQs */}
        <div className="bg-gray-900 p-6 rounded-2xl shadow-md border border-gray-800">
          <h2 className="text-xl font-semibold mb-4 text-white">FAQs</h2>

          {filteredFaqs.length === 0 && (
            <p className="text-sm text-gray-500">No results found.</p>
          )}

          <div className="space-y-3">
            {filteredFaqs.map((faq, idx) => (
              <details
                key={idx}
                className="group border border-gray-700 rounded-xl p-4 bg-gray-800 hover:bg-gray-700 transition"
              >
                <summary className="cursor-pointer font-medium flex justify-between items-center">
                  <span>{faq.q}</span>
                  <span className="transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-2 text-gray-300 text-sm">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* Support Ticket Form */}
        <div className="bg-gray-900 p-6 rounded-2xl shadow-md border border-gray-800">
          <h2 className="text-xl font-semibold mb-4 text-white">Contact Support</h2>

          <form onSubmit={submitTicket} className="space-y-4">
            <input
              type="email"
              required
              placeholder="Your email"
              value={ticket.email}
              onChange={(e) => setTicket({ ...ticket, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-700 bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />

            <input
              type="text"
              required
              placeholder="Subject"
              value={ticket.subject}
              onChange={(e) => setTicket({ ...ticket, subject: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-700 bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />

            <textarea
              required
              rows="5"
              placeholder="Describe your issue"
              value={ticket.message}
              onChange={(e) => setTicket({ ...ticket, message: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-700 bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none transition"
            />

            <button
              type="submit"
              className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition"
            >
              Submit Ticket
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
