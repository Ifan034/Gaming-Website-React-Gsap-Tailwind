// Import React hooks and dependencies
import React, { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti"; // Importing an icon component

// Define the BentoCard component with destructured props: src, title, description, isComingSoon
export const BentoCard = ({ src, title, description, isComingSoon }) => {
  // State to track the mouse cursor's position
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  // State to control the hover effect's opacity
  const [hoverOpacity, setHoverOpacity] = useState(0);

  // A ref to reference the "coming soon" button element
  const hoverButtonRef = useRef(null);

  //***====> Event handler to update cursor position relative to the button's position <====***//
  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return; // Exit if the ref isn't assigned yet

    // Get the bounding rectangle of the button
    // The getBoundingClientRect() method is a built-in function in JavaScript that allows you to get the position and size of an element relative to the viewport
    const rect = hoverButtonRef.current.getBoundingClientRect();

    // Calculate the cursor position state relative to the button
    setCursorPosition({
      // clientX and clientY give the mouse pointer's position within the viewport.
      x: event.clientX - rect.left, // X-coordinate within the button
      y: event.clientY - rect.top, // Y-coordinate within the button
    });
  };

  // Event handler to make the hover effect visible
  const handleMouseEnter = () => setHoverOpacity(1);

  // Event handler to hide the hover effect 
  const handleMouseLeave = () => setHoverOpacity(0);

  // JSX rendering the BentoCard component
  return (
    // Main container with relative positioning and full size
    <div className="relative size-full">
      {/* Video background that loops, mutes, and auto-plays */}
      <video
        src={src} // Video source passed via props
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      
      {/* Foreground content positioned on top of the video */}
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        
        {/* ====---Title and description---==== */}
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {/* Render description only if it exists */}
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>

        {/* Conditional rendering for "Coming Soon" button */}
        {isComingSoon && (
          <div
            ref={hoverButtonRef} // Assign the ref to this button
            onMouseMove={handleMouseMove} // Update cursor position on mouse move
            onMouseEnter={handleMouseEnter} // Show hover effect
            onMouseLeave={handleMouseLeave} // Hide hover effect
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
          >
            {/* Radial gradient hover effect */}
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity, // Control opacity dynamically
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
                // Gradient starts from the cursor position and fades out
              }}
            />
            {/* Icon with z-index to stay on top of the gradient */}
            <TiLocationArrow className="relative z-20" />

            {/* Text with z-index to stay on top */}
            <p className="relative z-20">coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
};
