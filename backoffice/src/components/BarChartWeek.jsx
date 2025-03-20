import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export const BarChartWeek = ({ reservations }) => {
    const dayNames = ['L', 'Ma', 'Me', 'J', 'V', 'S','D'];

    const dayCounts = dayNames.reduce((accumulator, dayName) => {
        accumulator[dayName] = 0;
        return accumulator;
    }, {});

    reservations.forEach(reservation => {
        let day = new Date(reservation.dateheure).getDay();
        day = day === 0 ? 6 : day-1;
        dayCounts[dayNames[day]] += 1;
    });

    const data = {
        labels: Object.keys(dayCounts),
        datasets: [
            {
                label: 'Réservations par jour de la semaine',
                data: Object.values(dayCounts),
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
            },
            tooltip: {
                callbacks: {
                    title: (tooltipItem) => {
                        const fullDayNames = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
                        return fullDayNames[tooltipItem[0].dataIndex];
                    },
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
        <div>
            <Bar data={data} options={options} />
        </div>
    );
};