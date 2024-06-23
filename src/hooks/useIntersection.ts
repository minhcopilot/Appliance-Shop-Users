import { useState, useEffect, Ref, RefObject } from "react";

export const useIntersection = (
  element: RefObject<HTMLDivElement> | null,
  rootMargin: string
) => {
  const [isVisible, setState] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setState(entry.isIntersecting);
      },
      { rootMargin }
    );

    element?.current && observer.observe(element?.current);

    return () => {
      element?.current && observer.unobserve(element.current);
    };
  }, [element]);

  return isVisible;
};
