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
    labels: ['12-25 ans', '+62 ans', '-12 ans', '26-61 ans'],
    datasets: [
      {
        data: Object.values(tarifCounts),
        backgroundColor: ['#FF0000', '#E58038', '#FF6384', '#4E2929'],
        hoverBackgroundColor: ['#FF0000', '#E58038', '#FF6384', '#4E2929']
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div style={{ width: '50%', margin: 'auto' }}>
      <Pie data={data} options={options} />
    </div>
  );
};