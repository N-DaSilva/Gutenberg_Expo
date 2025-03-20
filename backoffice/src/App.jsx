import { useEffect, useState } from 'react'
import { ReservationList } from './components/ReservationList'
import { PieChart } from './components/PieChart'
import { BarChartWeek } from './components/BarChartWeek'
import { BarChartDay } from './components/BarChartDay'
import { MainInfo } from './components/MainInfo'

import './App.css'

function App() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetch('https://da-silva.butmmi.o2switch.site/api-reservation/')
      .then((response) => {return response.json();})
      .then((data) => {setReservations(data);})
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Backoffice</h1>
      <ReservationList reservations={reservations} />
      <MainInfo reservations={reservations} />
      <PieChart reservations={reservations} />
      <BarChartWeek reservations={reservations} />
      <BarChartDay reservations={reservations} />
    </div>
  )
}

export default App
