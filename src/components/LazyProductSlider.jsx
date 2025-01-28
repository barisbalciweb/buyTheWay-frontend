import React, { lazy, Suspense, useEffect, useState, useRef } from "react";
import { ClipLoader } from "react-spinners";

const ProductSlider = lazy(() => import("./ProductSlider"));

const LazyProductSlider = ({ products }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    // CREATE AN INTERSECTION OBSERVER
    const observer = new IntersectionObserver(
      ([entry]) => {
        // CHECK IF THE ELEMENT IS INTERSECTING (VISIBLE IN VIEWPORT)
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    // START OBSERVING THE TARGET ELEMENT (sliderRef)
    if (sliderRef.current) observer.observe(sliderRef.current);

    // CLEAN UP: UNOBSERVE THE ELEMENT WHEN COMPONENT UNMOUNTS OR sliderRef CHANGES
    return () => {
      if (sliderRef.current) observer.unobserve(sliderRef.current);
    };
  }, []);

  return (
    <div ref={sliderRef} style={{ minHeight: "300px" }}>
      {isVisible && (
        <Suspense fallback={<ClipLoader size={"20vw"} />}>
          <ProductSlider products={products} />
        </Suspense>
      )}
    </div>
  );
};

export default LazyProductSlider;
