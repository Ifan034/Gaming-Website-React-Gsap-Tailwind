import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { plugin } from "postcss";

// ScrollTrigger is set to register plugin
gsap.registerPlugin(ScrollTrigger);

const AnimatedTitle = ({ title, containerClass }) => {
  // add refference to dom in excess to use useRef
  const containerRef = useRef(null);
  //  when mount containerRef useEffect will run
  useEffect(() => {
    const ctx = gsap.context(() => {
      //scrollTrigger is set to containerRef.current
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "100 bottom",
          end: "center bottom",
          //animate when reverse toggle
          toggleActions: "play none none reverse",
        },
      });
      // animation for title ".animated-word"
      titleAnimation.to(
        ".animated-word",
        {
          opacity: 1,
          transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)",
          ease: "power2.inOut",
          stagger: 0.02,
        },
        0
      );
    }, containerRef);
    // Clean up on unmount these component
    return () => ctx.revert(); 
    
  }, []); // empty array means it will run one time

  return (
    // add ref={containerRef} to div
    <div ref={containerRef} className={("animated-title", containerClass)}>
      {/* title divide into two lines  and word render with span */}
      {title.split("<br />").map((line, index) => (
        <div
          // each line of index unique with key={index}
          key={index}
          className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
        >
          {line.split(" ").map((word, idx) => (
            <span
              key={idx}
              className="animated-word"
              // dangerouslySetInnerHTML it helps rendering html
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default AnimatedTitle;