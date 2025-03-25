import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChart = ({ reservations }) => {
  const tarifCounts = reservations.reduce((accumulator, reservation) => {
    const tarif = reservation.tarif;
    accumulator[tarif] = (accumulator[tarif] || 0) + 1;
    return accumulator;
  }, {});

  const data = {
    labels: Object.keys(tarifCounts),
    datasets: [
      {
        data: Object.values(tarifCounts),
        backgroundColor: ['#FF0000', '#E58038', '#FF6384', '#4E2929'],
        hoverBackgroundColor: ['#FF0000', '#E58038', '#FF6384', '#4E2929']
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'left',
      },
    },
  };

  return (
    <div className='pie-chart'>
      <h2>Répartition des réservations selon le tarif (tranche d'âge)</h2>
        <Pie data={data} options={options} />
    </div>
  );
};