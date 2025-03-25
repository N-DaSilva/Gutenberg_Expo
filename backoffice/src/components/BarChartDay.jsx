import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export const BarChartDay = ({ reservations }) => {
    const hourNames = ['9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h'];

    const hourCounts = hourNames.reduce((accumulator, hourName) => {
        accumulator[hourName] = 0;
        return accumulator;
    }, {});

    reservations.forEach(reservation => {
        const hour = new Date(reservation.dateheure).getHours()-9;
        hourCounts[hourNames[hour]] += 1;
    });

    const data = {
        labels: Object.keys(hourCounts),
        datasets: [
            {
                label: 'Réservations par heure de la journée',
                data: Object.values(hourCounts),
                backgroundColor: 'rgba(131, 44, 44, 0.75)',
                borderColor: 'rgba(131, 44, 44, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        return `${tooltipItem.formattedValue} réservation(s)`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className='bar-chart'>
            <h2>Répartition des réservations selon les heures dans la journée</h2>
            <Bar data={data} options={options} />
        </div>
    );
};