import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton({ scrollRef }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = scrollRef?.current || window;

    const onScroll = () => {
      const scrollTop = el === window ? window.scrollY : el.scrollTop;
      setVisible(scrollTop > 300);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [scrollRef]);

  const scrollToTop = () => {
    const el = scrollRef?.current || window;
    if (el === window) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      el.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`
        fixed top-6 left-6 z-50 p-3 rounded-full
        bg-green-500 text-black shadow-lg
        transition-all duration-300
        ${visible
          ? "opacity-100 scale-100"
          : "opacity-0 scale-90 pointer-events-none"}
      `}
    >
      <ArrowUp size={18} />
    </button>
  );
}
