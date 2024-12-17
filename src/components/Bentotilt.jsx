import { useRef, useState } from "react";

// children: The content passed to this component
// className: Additional CSS classes for customization
export const Bentotilt = ({ children, className = "" }) => {
  // State to store the dynamic transform style for the tilt effect.
  const [transformStyle, setTransformStyle] = useState("");

  // This allows access to the element's dimensions and position for mouse calculations.
  const itemRef = useRef(null);

  // Handler for mouse movement over the element.
  const handleMouseMove = (event) => {
    // React refs need to be checked. If the ref is not attached, exit early.
    if (!itemRef.current) return;

    // Get the dimensions and position of the element.
    // .getBoundingClientRect() returns a DOMRect object, describing the dimensions and position of the element.
    const { left, top, width, height } = itemRef.current.getBoundingClientRect();

    // Calculate the mouse's relative position within the element.
    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    // Calculate tilt angles based on the mouse position.
    // Vertical tilt angle.
    const tiltX = (relativeY - 0.5) * 5;
    // Horizontal tilt angle.
    const tiltY = (relativeX - 0.5) * -5;

    // Construct the transform style for the tilt effect.
    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;

    // Update the state with the new transform style.
    setTransformStyle(newTransform);
  };

  // Handler for when the mouse leaves the element.
  const handleMouseLeave = () => {
    // Reset the transform style to remove the tilt effect.
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef} // Attach the ref to this div.
      className={className} // Apply the passed className.
      onMouseMove={handleMouseMove} // Attach the mouse move handler.
      onMouseLeave={handleMouseLeave} // Attach the mouse leave handler.
      style={{ transform: transformStyle }} // Dynamically set the transform style.
    >
      {/* Render any child elements passed to the component */}
      {children}
    </div>
  );
};
