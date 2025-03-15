import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.history.scrollRestoration = "manual"; // Disable browser’s native scroll restoration
    window.scrollTo(0, 0); // Instantly set scroll position to top
  }, [pathname]);

  return null;
};

export default ScrollToTop;