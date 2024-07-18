import './CardLinearView.css'
import { coins } from '../../data/data'
import { useState, useEffect } from 'react';
import Minigraph from './Minigraph';

export default function CardLinearViewOther(props) {
    return (
        <div className='card-linear-view'>
            {Object.keys(coins).filter(x => !props.watchlist.includes(x)).map(key => coins[key])
                .map(x => <CardLinearStateOther addCard={props.addCard} key={x.tickerSymbol} symbol={x.tickerSymbol} data={x} />)}
        </div>
    )
}

function CardLinearStateOther(props) {
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

    const cryptoLabels = cryptoData.map(x => x.date.date).slice(-7)
    const vals = cryptoData.map(x => x[props.data.labelName]).slice(-7)
    const percentChange = (((vals[vals.length - 1] - vals[0]) / vals[0]) * 100).toFixed(2)


    return (
        <div className='card--linear-state'>
            <div>
                <h2 className='card--name'>{`${props.data.name} (${props.data.tickerSymbol})`}</h2>
                <div className='card--linear-current-fee--container'>
                    <span title='most recent daily average fee' className='card--linear-current-fee'>fee: {!loading ? vals[vals.length - 1].toFixed(5) : ''}</span>
                </div>
            </div>
            <div className='card--linear-end-container'>
                <span className='graph-time'>1W</span>
                <div className='card--graph-linear'><Minigraph labels={cryptoLabels} vals={vals} /></div>
                <span style={{ color: percentChange >= 0 ? '#51FF0D' : '#FF3131' }} className='graph-ticker--span'>
                    {percentChange}%
                </span>
                <a className='card-linear--more-details' href=''>more details</a>
                <div
                    onClick={() => props.addCard(props.symbol)}
                    title='add to watchlist'
                    className='card--plus'>
                    <span className='card--minus--span'>+</span>
                </div>
            </div>
        </div>
    )
}