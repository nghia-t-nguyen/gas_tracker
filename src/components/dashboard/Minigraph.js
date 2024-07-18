import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Minigraph(props) {
    const data = {
        labels: props.labels,
        datasets: [
            {
                label: 'Fee',
                data: props.vals,
                fill: false,
                borderColor: '#ECE4FF',
                borderWidth: 1,
                backgroundColor: '#ECE4FF',
                tension: 0,
                pointRadius: 0,
                pointHoverRadius: 0,
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
            tooltip: false,

        },
        scales: {
            y: {
                display: false
            },
            x: {
                display: false
            }
        }
    };

    return (
        <Line data={data} options={options} />
    )

};