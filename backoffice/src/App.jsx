import { useEffect, useState } from 'react'
import { ReservationList } from './components/ReservationList'
import { PieChart } from './components/PieChart'
import { BarChartWeek } from './components/BarChartWeek'
import { BarChartDay } from './components/BarChartDay'
import { MainInfo } from './components/MainInfo'
import { LogoutButton } from './components/Logout'

import './App.css'

function App() {
  useEffect(() => {
    fetch('https://rgbagency.fr/backoffice/checkSession.php', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (!data.authenticated) {
          window.location.href = 'https://rgbagency.fr/backoffice/connect.php'
        }
      })
      .catch(() => {
        window.location.href = 'https://rgbagency.fr/backoffice/connect.php'
      })
  }, [])
  

  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetch('https://rgbagency.fr/api-reservation/api.php')
      .then((response) => {return response.json();})
      .then((data) => {setReservations(data);})
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Backoffice</h1>
      <LogoutButton />
      <ReservationList reservations={reservations} />
      <div className='wrapper-row'>
        <MainInfo reservations={reservations} />
        <PieChart reservations={reservations} />
      </div>
      <div className='wrapper-row'>
        <BarChartWeek reservations={reservations} />
        <BarChartDay reservations={reservations} />
      </div>
    </div>
  )
}

export default App
