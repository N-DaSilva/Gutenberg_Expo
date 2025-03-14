import { useEffect, useState } from 'react'
import { ReservationList } from './components/ReservationList'
import { PieChart } from './components/PieChart'
import { BarChart } from './components/BarChart'
import { MainInfo } from './components/MainInfo'

import './App.css'

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch('https://da-silva.butmmi.o2switch.site/api-reservation/api.php')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(err => console.error(err))
  }
    , [])

  return (
    <div>
      <MainInfo data={data} />
      <ReservationList data={data} />
      <PieChart data={data} />
      <BarChart data={data} />
    </div>
  )
}

export default App
