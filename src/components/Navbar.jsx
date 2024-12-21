// A utility for conditionally joining class names.
import clsx from 'clsx';
import gsap from "gsap";
// hook from react-use current scroll position
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import Button from "./Button";

const Navbar = () => {
    // array of navigation items
    const navItems = ['Nexus', 'Vault', 'Prologue', 'About', 'Contact'];

    // state for toggling audio and visual indicator
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [isIndicatorActive, setIsIndicatorActive] = useState(false);

    // refs for audio and navigation container
    const audioElementRef = useRef(null);
    const navContainerRef = useRef(null);

    // y axis scroll position
    const { y: currentScrollY } = useWindowScroll();

    // set state to navbar is visible or not
    const [isNavVisible, setIsNavVisible] = useState(true);
    // set scroll position
    const [lastScrollY, setLastScrollY] = useState(0);

    // toggle audio and visual indicator function
    const toggleAudioIndicator = () => {
        setIsAudioPlaying((prev) => !prev);
        setIsIndicatorActive((prev) => !prev);
    };

    // manage audio playback play or pause action
    useEffect(() => {
        if (isAudioPlaying) {
            // access audio element reference in dom
            audioElementRef.current.play();
        } else {
            audioElementRef.current.pause();
        }
        // add the dependency array 
    }, [isAudioPlaying]);

    // scroll and use sideEffect to navigation bar
    useEffect(() => {
        if (currentScrollY === 0) {
            // the navigation bar on the top 
            setIsNavVisible(true);
            // remove floating-nav class
            navContainerRef.current.classList.remove('floating-nav');
        } else if (currentScrollY > lastScrollY) {
            // scroll down hide the navigation bar, add floating nav
            setIsNavVisible(false);
            navContainerRef.current.classList.add('floating-nav');
        } else if (currentScrollY < lastScrollY) {
            // scroll up show the navigation bar, remove floating nav
            setIsNavVisible(true);
            navContainerRef.current.classList.add('floating-nav');
        }   
        
        setLastScrollY(currentScrollY);
    }, [currentScrollY, lastScrollY]);

    // gsap animation for navigation bar visible
    useEffect(() => {
        gsap.to(navContainerRef.current, {
            // if nav visible then y-axis 0 else -100
            y: isNavVisible ? 0 : -100,
            // if nav visible then opacity 1 else 0
            opacity: isNavVisible ? 1 : 0,
            duration: 0.2,
            ease: 'power3.out',
        });
        // useEffect will run depend of isNavVisible state change
    }, [isNavVisible]);

    return (
        //----navigation bar fixed to top----//
        <div 
            ref={navContainerRef}
            className="fixed rounded-lg inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
        >
            {/*----> shifts the element vertically upward by half its own height.<----*/}
            <header className="absolute top-1/2 w-full -translate-y-1/2">
                {/* nav items center and space between elements */}
                <nav className="flex size-full items-center justify-between p-4">
                    {/* logo img and product button under */}
                    <div className="flex items-center gap-7">
                        <img src="/img/logo.png" alt="logo" className="w-10" />
                        
                        <Button 
                            id='product-button'
                            title='products'
                            rightIcon={<TiLocationArrow />}
                            containerClass='bg-blue-300 text-white md:flex hidden items-center justify-center gap-1'
                        />
                    </div>

                    {/* Navigation links and audio items */}
                    <div className="flex h-full items-center">
                        {/* map through navItems array and create a link for each item */}
                        <div className="hidden md:block">
                            {navItems.map((item, index) => (    
                                <a 
                                    key={index}    
                                    //add link to each item     
                                    href={`#${item.toLowerCase()}`}
                                    className="nav-hover-btn "
                                > 
                                    {item}
                                </a>
                            ))}
                        </div>
                        {/* audio indicator and button */}
                        {/* The onClick event handler is attached to the button */}
                        <button
                            onClick={toggleAudioIndicator}
                            className="ml-10 flex items-center space-x-0.5"
                        >   
                            {/* to access and control the audio programmatically */}
                            <audio 
                                ref={audioElementRef}
                                className="hidden"
                                src="/audio/dramamineFull.mp3"
                                loop
                            />
                            {/* dynamically creates four <div> elements, representing bars in an audio indicator */}
                            {[1, 2, 3, 4].map((bar) => (
                                <div
                                    key={bar}
                                    // Uses clsx to toggle classes dynamically
                                    className={clsx("indicator-line", {
                                        // conditionally adds the active class when isIndicatorActive is true
                                        "active": isIndicatorActive,
                                    })}
                                    style={{
                                        animationDelay: `${bar * 0.1}s`,
                                    }}
                                />
                            ))}
                        </button>
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default Navbar;