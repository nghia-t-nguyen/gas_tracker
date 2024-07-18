import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

//props.data format is
/*
[{tickerSymbol, }, {tickerSymbol}]
*/

export default function MultiGraph(props) {
    const data = {
        labels: props.labels,
        /*datasets: [
            {
                label: 'Fee',
                data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                fill: false,
                borderColor: '#ECE4FF',
                backgroundColor: '#ECE4FF',
                tension: 0.3,
                pointRadius: 2,
                pointHoverRadius: 6,
            },
        ]
        */
        datasets: props.datasets
    };

    const options = {
        responsiveness: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    // Custom callback to display dataset label and data value
                    label: function (context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        label += context.parsed.y;
                        return label;
                    }
                }
            }

        },
        scales: {
            y: {
                ticks: {
                    color: '#688FD4'
                },
                grid: {
                    color: 'rgba(43,71,120,0.2)'
                },
                min: undefined
            },
            x: {
                ticks: {
                    color: '#688FD4'
                },
                grid: {
                    color: 'rgba(43,71,120,0.2)'
                }
            }
        }
    };

    return (
        <Line data={data} options={options} />
    )

};