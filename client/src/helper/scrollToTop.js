export const scrollToTop = (behavior = "instant") => {
  if (typeof window !== "undefined") {
    window.scrollTo({
      top: 0,
      behavior,
    });
  };
};

export const scrollToService = (behavior = "smooth") => {
  if (typeof window !== "undefined") {
    console.log(window.innerHeight)
    window.scrollTo({
      top: window.innerHeight / 1.5,
      behavior,
    });
  };
};

