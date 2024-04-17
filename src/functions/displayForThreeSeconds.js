import React, { useState, useEffect } from 'react';

const DisplayForThreeSeconds = ({ component }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []); // Empty dependency array ensures that this effect runs only once, like componentDidMount

    return (
        <div>
            {isVisible && component}
        </div>
    );
};

export default DisplayForThreeSeconds;