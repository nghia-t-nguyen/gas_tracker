import { useState, useEffect } from "react";

// const useMousePosition = () => {
//     const [position, setPosition] = useState({
//         clientX: 0,
//         clientY: 0,
//     });
//     const updatePosition = event => {
//         const { pageX, pageY, clientX, clientY } = event;

//         setPosition({
//             clientX,
//             clientY,
//         });
//     };

//     useEffect(() => {
//         document.addEventListener("mousemove", updatePosition, false);
//         document.addEventListener("mouseenter", updatePosition, false);

//         return () => {
//             document.removeEventListener("mousemove", updatePosition);
//             document.removeEventListener("mouseenter", updatePosition);
//         };
//     }, []);

//     return position;
// };

const useMousePosition = (ref) => {
    const [position, setPosition] = useState({
        clientX: 0,
        clientY: 0,
    });
    const updatePosition = event => {
        const rect = ref.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        setPosition({
            x,
            y,
        });
    };

    useEffect(() => {
        document.addEventListener("mousemove", updatePosition, false);
        document.addEventListener("mouseenter", updatePosition, false);

        return () => {
            document.removeEventListener("mousemove", updatePosition);
            document.removeEventListener("mouseenter", updatePosition);
        };
    }, []);

    return position;
};

export default useMousePosition;