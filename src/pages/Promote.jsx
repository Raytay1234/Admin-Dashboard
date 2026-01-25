// src/pages/Promote.jsx
export default function Promote() {
    return (
        <div className="p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-100">Promote Products</h1>
                <p className="text-gray-400">Create and manage promotional campaigns</p>
            </div>

            {/* Promotion Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <PromoCard
                    title="Flash Sale"
                    description="Boost sales with time-limited discounts"
                    color="bg-red-500"
                />
                <PromoCard
                    title="New Arrival"
                    description="Highlight new products in your store"
                    color="bg-blue-500"
                />
                <PromoCard
                    title="Top Deal"
                    description="Promote your best-selling items"
                    color="bg-green-500"
                />
            </div>

            {/* Create Promotion */}
            <div className="bg-gray-900 p-6 rounded-xl shadow-md text-gray-100">
                <h2 className="text-lg font-semibold mb-4">Create Promotion</h2>

                <form className="grid gap-4 md:grid-cols-2">
                    <input
                        type="text"
                        placeholder="Promotion title"
                        className="input bg-gray-800 text-gray-100 border-gray-700"
                    />
                    <input
                        type="text"
                        placeholder="Discount (e.g. 20%)"
                        className="input bg-gray-800 text-gray-100 border-gray-700"
                    />
                    <textarea
                        placeholder="Promotion description"
                        className="input md:col-span-2 h-24 bg-gray-800 text-gray-100 border-gray-700"
                    />

                    <button className="md:col-span-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl font-medium">
                        Publish Promotion
                    </button>
                </form>
            </div>
        </div>
    );
}

function PromoCard({ title, description, color }) {
    return (
        <div className={`${color} text-white p-6 rounded-xl shadow-md`}>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm opacity-90 mt-1">{description}</p>
        </div>
    );
}
