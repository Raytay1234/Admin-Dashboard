

const baseProducts = [
    { id: "A", name: "UI Kit Pro", category: "UI Kit", price: 5461, stock: 12, image: "https://picsum.photos/seed/A/300/200" },
    { id: "B", name: "UX Starter Kit", category: "UX Kit", price: 3240, stock: 0, image: "https://picsum.photos/seed/B/300/200" },
    { id: "C", name: "Template Pack", category: "Template", price: 4120, stock: 5, image: "https://picsum.photos/seed/C/300/200" },
    { id: "D", name: "Component Bundle", category: "Component", price: 2899, stock: 0, image: "https://picsum.photos/seed/D/300/200" },
    { id: "E", name: "Plugin Extra", category: "Plugin", price: 5200, stock: 3, image: "https://picsum.photos/seed/E/300/200" },
    {id : "F", name: "Icon Set", category: "Icon", price: 1999, stock: 8, image: "https://picsum.photos/seed/F/300/200"},
];

// Generate 100 products
export const productsData = Array.from({ length: 100 }, (_, i) => {
    const base = baseProducts[i % baseProducts.length];

    return {
        ...base,
        id: `${base.id}-${i + 1}`, // Start IDs from 1
        name: `${base.name} ${i + 1}`,
        price: base.price + (i % 20) * 15, // smaller increments to keep prices realistic
        stock: i % 5 === 0 ? 0 : ((i % 15) + 1), // more predictable stock distribution
        image: `https://picsum.photos/seed/${base.id}${i + 1}/300/200`, // unique image per product
    };
});
