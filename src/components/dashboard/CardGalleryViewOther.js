import './CardGalleryView.css'
import { coins } from '../../data/data'
import Graph from './Graph'
import { useState, useEffect } from 'react'

export default function CardGalleryViewOther(props) {
    return (
        <div className='card-gallery-view'>
            {Object.keys(coins).filter(x => !props.watchlist.includes(x)).map(key => coins[key])
                .map(x => <CardGalleryStateOther addCard={props.addCard} key={x.tickerSymbol} symbol={x.tickerSymbol} data={x} />)}
        </div>
    )
}

function CardGalleryStateOther(props) {
    const [cryptoData, setCryptoData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [date, setDate] = useState(new Date());


    useEffect(() => {
        // Function to calculate milliseconds until the next midnight UTC
        const calculateMillisecondsUntilMidnightUTC = () => {
            const now = new Date();
            const nextMidnightUTC = new Date(
                Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 1, 0)
            );
            return nextMidnightUTC - now;
        };

        // Function to update the date state variable
        const updateDate = () => {
            setDate(new Date());
            console.log('Date updated to:', new Date().toUTCString());
        };

        // Calculate the time until the next midnight UTC
        const timeUntilMidnightUTC = calculateMillisecondsUntilMidnightUTC();

        // Set a timeout to update the date at the next midnight UTC
        const timeoutId = setTimeout(() => {
            updateDate();

            // Set an interval to update the date at every subsequent midnight UTC
            const intervalId = setInterval(() => {
                updateDate();
            }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds

            // Clear the interval on component unmount
            return () => clearInterval(intervalId);
        }, timeUntilMidnightUTC);

        // Clear the timeout on component unmount
        return () => clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(props.data.feeURL, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': 'Bearer YOUR_TOKEN' // Add this line if authentication is required
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const jsonData = await response.json();
                setCryptoData(jsonData);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [date]);

    const cryptoLabels = cryptoData.map(x => x.date.date)
    const vals = cryptoData.map(x => x[props.data.labelName])


    return (
        <div className='card--gallery-state'>
            <div className='card--topline-container'>
                <h2 className='card--name'>{props.data.name}</h2>
                <div
                    onClick={() => props.addCard(props.symbol)}
                    title='add to watchlist' className='card--plus'>
                    <span className='card--plus--span'>+</span>
                </div>
            </div>
            <div className='card--graph-gallery'>
                <Graph labels={cryptoLabels} vals={vals} />
            </div>
            <div className='card--endline-container'>
                <div className='card--endline-current-fee--container'>
                    <span title='most recent daily average fee' className='card--endline-current-fee'>fee: {!loading ? vals[vals.length - 1].toFixed(5) : ''}</span>
                </div>
                <a className='card--more-details' href=''>more details</a>
            </div>
        </div>
    )
}