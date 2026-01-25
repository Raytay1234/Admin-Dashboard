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
    <div className="p-6 lg:p-8 space-y-10 text-gray-100">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Help & Support</h1>
        <p className="text-gray-400">Search for answers or contact support</p>
      </div>

      {/* FAQ Search */}
      <div>
        <input
          type="text"
          placeholder="Search help topics..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-3 rounded-xl border dark:border-gray-700 bg-gray-900 text-gray-100 focus:ring-2 focus:ring-green-500 outline-none"
        />
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-900 p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">FAQs</h2>

        {filteredFaqs.length === 0 && (
          <p className="text-sm text-gray-500">No results found.</p>
        )}

        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => (
            <details key={idx} className="border dark:border-gray-700 rounded-lg p-4">
              <summary className="cursor-pointer font-medium">{faq.q}</summary>
              <p className="mt-2 text-sm text-gray-400">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>

      {/* Support Ticket */}
      <div className="bg-gray-900 p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">Contact Support</h2>

        <form onSubmit={submitTicket} className="space-y-4 max-w-xl">
          <input
            type="email"
            required
            placeholder="Your email"
            value={ticket.email}
            onChange={(e) => setTicket({ ...ticket, email: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border dark:border-gray-700 bg-gray-800 text-gray-100"
          />

          <input
            type="text"
            required
            placeholder="Subject"
            value={ticket.subject}
            onChange={(e) => setTicket({ ...ticket, subject: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border dark:border-gray-700 bg-gray-800 text-gray-100"
          />

          <textarea
            required
            rows="4"
            placeholder="Describe your issue"
            value={ticket.message}
            onChange={(e) => setTicket({ ...ticket, message: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border dark:border-gray-700 bg-gray-800 text-gray-100 resize-none"
          />

          <button className="bg-green-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700">
            Submit Ticket
          </button>
        </form>
      </div>
    </div>
  );
}
