import { Fragment, useState } from 'react'
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Header from './Header';
import type { Dayjs } from 'dayjs';
import type { FinisherData } from './FinisherListItem';
import dayjs from 'dayjs';
import FinisherListItem from './FinisherListItem';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { createTheme, ThemeProvider } from '@mui/material';
import { deDE } from '@mui/x-date-pickers/locales';

function App() {

  const [finisherData, setFinisherData] = useState<FinisherData[]>([])
  const [timeStarted, setTimeStarted] = useState<Dayjs | null>(null)

  const addFinisher = () => {
    setFinisherData(old => [...old, { timeTaken: dayjs(), startNumber: "" }])
  }

  const editFinisher = (index: number, update: (old: FinisherData) => FinisherData) => {
    setFinisherData(old => old.map((item, i) => index === i ? update(item) : item))
  }

  const convertToCSV = (data: FinisherData[]) => {
    let str = '';
    for (let i = 0; i < data.length; i++) {
      const item = data[i]
      const time = dayjs(item.timeTaken?.diff(timeStarted, "millisecond")).utc()
      let line = `${item.startNumber},${time.hour()}:${('' + time.minute()).padStart(2, '0')}:${('' + time.second()).padStart(2, '0')}`;
      str += line + '\r\n';
    }
    return str;
  };

  const exportCsv = () => {
    const csvData = new Blob([convertToCSV(finisherData)], { type: 'text/csv' });
    const csvURL = URL.createObjectURL(csvData);
    const link = document.createElement('a');
    link.href = csvURL;
    link.download = "results.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const theme = createTheme(
    {},
    deDE,
  );


  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack direction={{ xs: 'column', sm: 'row' }}
          sx={{
            justifyContent: 'center',
          }}
          spacing={2}>
          <Header
            timeStarted={timeStarted}
            setTimeStarted={setTimeStarted}
            addFinisher={addFinisher}
            exportCsv={exportCsv} />
          <Stack spacing={2}>
            {finisherData.map((data, i) =>
              <Fragment key={i}>
                <IconButton
                  aria-label='Hinzufügen'
                  onClick={() => {
                    setFinisherData(old => [...old.slice(0, i), { timeTaken: data.timeTaken, startNumber: "" }, ...old.slice(i)])
                  }}>
                  <AddCircleOutlineOutlinedIcon />
                </IconButton>
                <FinisherListItem
                  timeStarted={timeStarted} data={data}
                  editFinisher={(it) => editFinisher(i, it)}
                  deleteSelf={() => { setFinisherData(finisherData.filter((_, index) => i != index)) }} />
              </Fragment>
            )}
          </Stack>
        </Stack>
      </LocalizationProvider>
    </ThemeProvider>
  )
}

export default App