import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './Graph.css'
import { useEffect, useState } from 'react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Graph = () => {
    const [cryptoData, setCryptoData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const url = 'http://ec2-3-15-168-58.us-east-2.compute.amazonaws.com:3000/api/bitcoin/average-gas-fee'

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://ec2-3-15-168-58.us-east-2.compute.amazonaws.com:3000/api/bitcoin/average-gas-fee', {
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
    }, []);

    const cryptoLabels = cryptoData.map(x => x.date.date)
    const vals = cryptoData.map(x => x.feeValue)


    const data = {
        labels: cryptoLabels,
        datasets: [
            {
                label: 'Fee',
                data: vals,
                fill: false,
                borderColor: '#ECE4FF',
                backgroundColor: '#ECE4FF',
                tension: 0.3,
                pointRadius: 2,
                pointHoverRadius: 6,
            }
        ]
    };

    const options = {
        responsiveness: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
                position: 'top',
            },
        },
        scales: {
            y: {
                ticks: {
                    color: '#688FD4'
                },
                grid: {
                    color: 'rgba(43,71,120,0.2)'
                }
            },
            x: {
                ticks: {
                    callback: function (value, index, ticks) {
                        // Return abbreviated label
                        const label = this.getLabelForValue(value);
                        return label.slice(5);
                    },
                    color: '#688FD4'
                },
                grid: {
                    color: 'rgba(43,71,120,0.2)'
                }
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    return (
        <div className='graph-gallery-container'>
            <Line data={data} options={options} />
        </div>
    )

};

export default Graph;
