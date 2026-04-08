
const categoryImages = {
  electronics:
    "https://images.unsplash.com/photo-1510557880182-3c7b3c1c3f73?auto=format&fit=crop&w=800&q=60",
  fashion:
    "https://images.unsplash.com/photo-1521335629791-ce4aec67dd47?auto=format&fit=crop&w=800&q=60",
  gaming:
    "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=800&q=60",
  home:
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=60",
  uncategorized:
    "https://placehold.co/600x400?text=Product",
};

export default function getProductImage(category) {
  const key = category?.toLowerCase();
  return categoryImages[key] || categoryImages.uncategorized;
}