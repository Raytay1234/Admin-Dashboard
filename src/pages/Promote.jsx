import { useState, useContext } from "react";
import { motion as Motion } from "framer-motion";
import PromoContext from "../context/PromoContext";

export default function Promote() {
  const { promotions, addPromotion, togglePromotion, removePromotion } =
    useContext(PromoContext);

  const [form, setForm] = useState({
    title: "",
    discount: "",
    description: "",
    targetType: "all",
    targetValue: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.discount || !form.startDate || !form.endDate)
      return;

    addPromotion({
      id: Date.now(),
      title: form.title,
      discount: Number(form.discount),
      description: form.description,
      targetType: form.targetType,
      targetValue: form.targetValue,
      startDate: form.startDate,
      endDate: form.endDate,
      active: true,
    });

    setForm({
      title: "",
      discount: "",
      description: "",
      targetType: "all",
      targetValue: "",
      startDate: "",
      endDate: "",
    });
  };

  return (
    <div className="p-6 lg:p-8 space-y-8 bg-gray-900 min-h-screen text-gray-100">
      <div>
        <h1 className="text-3xl font-bold text-white">Promotions</h1>
        <p className="text-gray-400">
          Create and manage promotional campaigns
        </p>
      </div>

      {/* Existing Promotions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promotions.length === 0 && (
          <p className="text-gray-400">No promotions created yet.</p>
        )}

        {promotions.map((promo) => (
          <Motion.div
            key={promo.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-2xl shadow-lg ${
              promo.active ? "bg-green-600" : "bg-gray-700"
            }`}
          >
            <h3 className="text-lg font-semibold">{promo.title}</h3>
            <p className="text-sm mt-1">{promo.description}</p>

            <div className="text-sm mt-2 space-y-1">
              <p>Discount: {promo.discount}%</p>
              <p>Target: {promo.targetType}</p>
              {promo.targetValue && (
                <p>Value: {promo.targetValue}</p>
              )}
              <p>
                {promo.startDate} → {promo.endDate}
              </p>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => togglePromotion(promo.id)}
                className="bg-yellow-500 px-3 py-1 rounded-lg text-black text-sm"
              >
                {promo.active ? "Deactivate" : "Activate"}
              </button>

              <button
                onClick={() => removePromotion(promo.id)}
                className="bg-red-500 px-3 py-1 rounded-lg text-white text-sm"
              >
                Delete
              </button>
            </div>
          </Motion.div>
        ))}
      </div>

      {/* Create Promotion */}
      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Create Promotion</h2>

        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Promotion title"
            className="bg-gray-700 border border-gray-600 rounded-xl px-4 py-2"
          />

          <input
            name="discount"
            type="number"
            value={form.discount}
            onChange={handleChange}
            placeholder="Discount %"
            className="bg-gray-700 border border-gray-600 rounded-xl px-4 py-2"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="md:col-span-2 bg-gray-700 border border-gray-600 rounded-xl px-4 py-2"
          />

          <select
            name="targetType"
            value={form.targetType}
            onChange={handleChange}
            className="bg-gray-700 border border-gray-600 rounded-xl px-4 py-2"
          >
            <option value="all">All Products</option>
            <option value="category">Category</option>
            <option value="product">Specific Product</option>
          </select>

          <input
            name="targetValue"
            value={form.targetValue}
            onChange={handleChange}
            placeholder="Category name or Product ID"
            className="bg-gray-700 border border-gray-600 rounded-xl px-4 py-2"
          />

          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            className="bg-gray-700 border border-gray-600 rounded-xl px-4 py-2"
          />

          <input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            className="bg-gray-700 border border-gray-600 rounded-xl px-4 py-2"
          />

          <button
            type="submit"
            className="md:col-span-2 bg-green-600 hover:bg-green-700 py-3 rounded-2xl font-semibold"
          >
            Publish Promotion
          </button>
        </form>
      </div>
    </div>
  );
}
