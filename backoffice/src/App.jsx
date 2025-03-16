import { useEffect, useState } from 'react'
import { ReservationList } from './components/ReservationList'
import { PieChart } from './components/PieChart'
import { BarChart } from './components/BarChart'
import { MainInfo } from './components/MainInfo'

import './App.css'

function App() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetch('http://localhost/github/Gutenberg_Expo/api-reservation/')
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
      <BarChart reservations={reservations} />
    </div>
  )
}

export default App
