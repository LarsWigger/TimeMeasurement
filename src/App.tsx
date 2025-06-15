import { useState } from 'react'
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Header from './Header';
import type { Dayjs } from 'dayjs';
import type { FinisherData } from './FinisherListItem';
import dayjs from 'dayjs';
import FinisherListItem from './FinisherListItem';

function App() {

  const [finisherData, setFinisherData] = useState<FinisherData[]>([])
  const [timeStarted, setTimeStarted] = useState<Dayjs | null>(null)

  const addFinisher = () => {
    setFinisherData(old => [...old, { timeTaken: dayjs(), startNumber: "" }])
  }

  const editFinisher = (index: number, update: (old: FinisherData) => FinisherData) => {
    setFinisherData(old => old.map((item, i) => index === i ? update(item) : item))
  }


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack direction={{ xs: 'column', sm: 'row' }} sx={{
        justifyContent: "center",
      }}>
        <Header timeStarted={timeStarted} setTimeStarted={setTimeStarted} addFinisher={addFinisher} />
        <Stack>
          {finisherData.map((data, i) => <FinisherListItem key={i} timeStarted={timeStarted} data={data} editFinisher={(it) => editFinisher(i, it)} />)}
        </Stack>
      </Stack>
    </LocalizationProvider>

  )
}

export default App