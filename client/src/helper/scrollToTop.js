export const scrollToTop = (behavior = "instant") => {
  if (typeof window !== "undefined") {
    window.scrollTo({
      top: 0,
      behavior,
    });
  };
};
