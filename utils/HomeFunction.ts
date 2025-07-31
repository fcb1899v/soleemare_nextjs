import { RefObject, useEffect, useLayoutEffect, useState } from "react";

export const useWindowSize = (): number[] => {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      const updateSize = (): void => {
        setSize([window.innerWidth, window.innerHeight]);
      };
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  };

  export const useOnScreen = (ref: RefObject<HTMLElement | null | undefined>) => {
    const [isIntersecting, setIntersecting] = useState(false);
    useEffect(() => {
      const blockRef = ref.current;
      const observer = new IntersectionObserver(([entry]) => {
        // 画面内に表示されているかどうかを判定
        setIntersecting(entry.isIntersecting);
      });
      if (blockRef) {
        const currentRef = ref.current;
        if (currentRef) observer.observe(currentRef);
        return () => {
          if (currentRef) observer.unobserve(currentRef);
        };
      }  
    }, [ref]);
    return isIntersecting;
  }
  