import React, { useState, useEffect } from 'react';

const DisplayForTenSeconds = ({ component }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 10000);

        return () => clearTimeout(timer);
    }, []); // Empty dependency array ensures that this effect runs only once, like componentDidMount

    return (
        <div>
            {isVisible && component}
        </div>
    );
};

export default DisplayForTenSeconds;