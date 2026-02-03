// src/components/ScrollToTopButton.jsx
import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTopButton({ scrollRef }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!scrollRef?.current) return;

    const handleScroll = () => {
      setVisible(scrollRef.current.scrollTop > 200);
    };

    const container = scrollRef.current;
    container.addEventListener("scroll", handleScroll);

    return () => container.removeEventListener("scroll", handleScroll);
  }, [scrollRef]);

  const scrollToTop = () => {
    if (!scrollRef?.current) return;
    scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-green-600 text-white shadow-lg hover:bg-green-500 transition"
      title="Scroll to top"
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
}
