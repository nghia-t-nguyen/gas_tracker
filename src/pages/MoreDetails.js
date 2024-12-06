import './MoreDetails.css'
import Navbar from '../components/navbars/NavbarMoreDetails'
import { coins } from '../data/data'
import { useEffect, useState } from 'react';
import Graph from '../components/dashboard/Graph';
import { linearRegression } from 'simple-statistics'

export default function MoreDetails(props) {
    const [cryptoData, setCryptoData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [date, setDate] = useState(new Date());
    const feeURL = coins[props.coinName].feeURL
    const labelName = coins[props.coinName].labelName

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
                const response = await fetch(feeURL, {
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
    const vals = cryptoData.map(x => x[labelName])
    const currentVal = Number.parseFloat(vals[vals.length - 1])
    const monthlyAvg = (vals.reduce((acc, curr) => acc + curr, 0) / vals.length).toFixed(8);
    const weeklyAvg = (vals.slice(-7).reduce((acc, curr) => acc + curr, 0) / 7).toFixed(8);
    const monthlyPercentChange = (((vals[vals.length - 1] - vals[0]) / vals[0]) * 100).toPrecision(6)
    const weeklyPercentChange = (((vals[vals.length - 1] - vals[vals.length - 8]) / vals[vals.length - 8]) * 100).toPrecision(6)
    const dataPoints = vals.map((value, index) => [index, value])
    const monthlyRegressionSlope = Number.parseFloat(linearRegression(dataPoints).m).toFixed(6)
    const weeklyRegressionSlope = Number.parseFloat(linearRegression(dataPoints.slice(-7)).m).toFixed(6)

    return <div className='more-details--max-width'>
        <Navbar coinName={props.coinName} />
        <div className='cont--more-details'>
            <div className='more-details--views-container'>
                <div className='cont--graph-more-details view--more-details'>
                    <h2 className='heading--more-details'>{coins[props.coinName].name} ({props.coinName}) - Fee Values</h2>
                    <div className='cont--graph'>
                        <Graph labels={cryptoLabels} vals={vals} />
                    </div>

                </div>
                <div className='cont--info-more-details'>
                    <div>
                        <h2 className='heading--more-details-numbers'>Current Value (daily avg)</h2>
                        <div className='cont--data-numbers-body'>
                            <span className='current-val pink-font'>{currentVal}</span>
                        </div>

                    </div>
                    <div>
                        <h2 className='heading--more-details-numbers'>Mean</h2>
                        <div className='cont--data-numbers-body'>
                            <div className='cont--data-numbers'>
                                <span>Month </span>
                                <span className='pink-font'>{monthlyAvg}</span>
                            </div>
                            <div className='cont--data-numbers'>
                                <span>Past Week </span>
                                <span className='pink-font'>{weeklyAvg}</span>
                            </div>
                        </div>

                    </div>
                    <div>
                        <h2 className='heading--more-details-numbers'>Percent Change</h2>
                        <div className='cont--data-numbers-body'>
                            <div className='cont--data-numbers'>
                                <span>Month </span>
                                <span className={monthlyPercentChange >= 0 ? 'green-font' : 'red-font'}>{monthlyPercentChange}% {monthlyPercentChange >= 0 ? '↗' : '↘'}</span>
                            </div>
                            <div className='cont--data-numbers'>
                                <span>Past Week </span>
                                <span className={weeklyPercentChange >= 0 ? 'green-font' : 'red-font'}>{weeklyPercentChange}% {weeklyPercentChange >= 0 ? '↗' : '↘'}</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className='heading--more-details-numbers'>Trend ($/day)</h2>
                        <div className='cont--data-numbers-body'>
                            <div className='cont--data-numbers'>
                                <span>Month </span>
                                <span className={monthlyRegressionSlope >= 0 ? 'green-font' : 'red-font'}>{monthlyRegressionSlope} {monthlyRegressionSlope >= 0 ? '↗' : '↘'}</span>
                            </div>
                            <div className='cont--data-numbers'>
                                <span>Past Week </span>
                                <span className={weeklyRegressionSlope >= 0 ? 'green-font' : 'red-font'}>{weeklyRegressionSlope} {weeklyRegressionSlope >= 0 ? '↗' : '↘'}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
}