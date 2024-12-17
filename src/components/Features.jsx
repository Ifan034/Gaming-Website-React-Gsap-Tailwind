// Import React and any necessary components
import React from "react";
import { TiLocationArrow } from "react-icons/ti"; // Importing an icon from react-icons
import { Bentotilt } from "./Bentotilt"; // A custom component for tilt effect
import { BentoCard } from "./BentoCard"; // A custom card component for features

// Define the Features component
const Features = () => (
  // Outer section with a black background and padding at the bottom
  <section className="bg-black pb-52">
    {/* Container for content with horizontal padding and responsive styles */}
    <div className="container mx-auto px-3 md:px-10">
      
      {/* Header Section */}
      <div className="px-5 py-32">
        {/* Subtitle */}
        <p className="font-circular-web text-lg text-blue-50">
          Into the Metagame Layer
        </p>
        {/* Description paragraph */}
        <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
          Immerse yourself in a rich and ever-expanding universe where a vibrant
          array of products converge into an interconnected overlay experience
          on your world.
        </p>
      </div>

      {/* First Featured Card with Video */}
      <Bentotilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
          src="videos/feature-1.mp4" // Video source
          title={
            <>
              radia<b>n</b>t {/* Dynamic title with bolded "n" */}
            </>
          }
          description="A cross-platform metagame app, turning your activities across Web2 and Web3 games into a rewarding adventure."
          isComingSoon // Shows a "Coming Soon" effect
        />
      </Bentotilt>

      {/* Grid of Feature Cards */}
      <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
        
        {/* First Grid Item */}
        <Bentotilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
          <BentoCard
            src="videos/feature-2.mp4" // Video source
            title={
              <>
                zig<b>m</b>a {/* Dynamic title with bolded "m" */}
              </>
            }
            description="An anime and gaming-inspired NFT collection - the IP primed for expansion."
            isComingSoon
          />
        </Bentotilt>

        {/* Second Grid Item */}
        <Bentotilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
          <BentoCard
            src="videos/feature-3.mp4" // Video source
            title={
              <>
                n<b>e</b>xus {/* Dynamic title with bolded "e" */}
              </>
            }
            description="A gamified social hub, adding a new dimension of play to social interaction for Web3 communities."
            isComingSoon
          />
        </Bentotilt>

        {/* Third Grid Item */}
        <Bentotilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
          <BentoCard
            src="videos/feature-4.mp4" // Video source
            title={
              <>
                az<b>u</b>l {/* Dynamic title with bolded "u" */}
              </>
            }
            description="A cross-world AI Agent - elevating your gameplay to be more fun and productive."
            isComingSoon
          />
        </Bentotilt>

        {/* Fourth Grid Item - More Coming Soon */}
        <Bentotilt className="bento-tilt_2">
          <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
            {/* Heading with styled bold characters */}
            <h1 className="bento-title special-font max-w-64 text-black">
              M<b>o</b>re co<b>m</b>ing s<b>o</b>on.
            </h1>

            {/* Large Icon positioned at the bottom-right */}
            <TiLocationArrow className="m-5 scale-[5] self-end" />
          </div>
        </Bentotilt>

        {/* Fifth Grid Item - Video */}
        <Bentotilt className="bento-tilt_2">
          {/* Full-size background video */}
          <video
            src="videos/feature-5.mp4" // Video source
            loop
            muted
            autoPlay
            className="size-full object-cover object-center"
          />
        </Bentotilt>
      </div>
    </div>
  </section>
);

// Export the Features component for use in other parts of the app
export default Features;
