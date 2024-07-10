import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Graph(props) {
    const data = {
        labels: props.labels,
        datasets: [
            {
                label: 'Fee',
                data: props.vals,
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
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        // Customize tooltip label here
                        let label = tooltipItem.dataset.label || '';
                        if (label) {
                            label += ' (daily avg): ';
                        }
                        label += tooltipItem.raw.toFixed(6); // Displaying more decimal places
                        return label;
                    },
                },
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

    return (
        <Line data={data} options={options} />
    )

};