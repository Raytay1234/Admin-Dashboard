import Layout from "../components/Layout.jsx";

export default function Help() {
  const faqs = [
    {
      q: "How do I add new products?",
      a: "Go to Products → Add Product, fill in the details and save.",
    },
    {
      q: "How can I promote a product?",
      a: "Use the Promote tab to create promotional campaigns.",
    },
    {
      q: "Why are my charts not displaying?",
      a: "Ensure the container has a defined height and width.",
    },
    {
      q: "How do I enable dark mode?",
      a: "Use the theme toggle in the top navigation bar.",
    },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Help & Support
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Find answers or get help using the dashboard
          </p>
        </div>

        {/* Quick Help Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <HelpCard
            title="Documentation"
            text="Learn how every feature works"
            action="View Docs"
          />
          <HelpCard
            title="Live Support"
            text="Chat with our support team"
            action="Start Chat"
          />
          <HelpCard
            title="Report a Bug"
            text="Let us know if something is broken"
            action="Report"
          />
        </div>

        {/* FAQ Section */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group border border-gray-200 dark:border-gray-700 rounded-lg p-4"
              >
                <summary className="cursor-pointer font-medium flex justify-between items-center">
                  {faq.q}
                  <span className="text-gray-400 group-open:rotate-180 transition">
                    ▼
                  </span>
                </summary>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-green-600 text-white rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">Still need help?</h3>
            <p className="text-sm opacity-90">
              Contact our support team for further assistance
            </p>
          </div>
          <button className="bg-white text-green-600 px-5 py-2 rounded-xl font-medium hover:bg-gray-100">
            Contact Support
          </button>
        </div>
      </div>
    </Layout>
  );
}

function HelpCard({ title, text, action }) {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md">
      <h3 className="font-semibold text-lg mb-1">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        {text}
      </p>
      <button className="text-green-600 font-medium hover:underline">
        {action}
      </button>
    </div>
  );
}
