import React, { useEffect, useState } from 'react';
import './MentorshipPlan.scss';

const MentorShipPlan = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const header = document.querySelector('.header-mentor-profile');
            const footer = document.querySelector('footer-container');

            if (header && footer) {
                const headerHeight = header.offsetHeight;
                const footerTop = footer.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;

                if (window.scrollY < headerHeight || footerTop < windowHeight) {
                    setIsVisible(false);
                } else {
                    setIsVisible(true);
                }
            }
        };

        const checkElementsAndAddListener = () => {
            const header = document.querySelector('.header-mentor-profile');
            const footer = document.querySelector('footer');

            if (header && footer) {
                window.addEventListener('scroll', handleScroll);
                // Initial check to set visibility based on the initial scroll position
                handleScroll();
            } else {
                // Retry after a short delay if elements are not found
                setTimeout(checkElementsAndAddListener, 100);
            }
        };

        checkElementsAndAddListener();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`mentor-ship-plan ${isVisible ? '' : 'hidden'}`}>
            {/* Your content here */}
            <p>Mentorship Plan</p>
        </div>
    );
};

export default MentorShipPlan;
