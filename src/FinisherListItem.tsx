import TextField from "@mui/material/TextField";
import { Stack } from "@mui/system";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs, { Dayjs } from "dayjs";

export type FinisherListItemProps = {
    timeStarted: Dayjs | null;
    data: FinisherData;
    editFinisher: (update: (old: FinisherData) => FinisherData) => void
}

export type FinisherData = {
    timeTaken: Dayjs,
    startNumber: String
}

export default function FinisherListItem({ timeStarted, data, editFinisher }: FinisherListItemProps) {

    return <Stack direction={{ xs: 'column', sm: 'row' }}>
        <TextField label="Startnummer" type="number" value={data.startNumber} onChange={event => {
            editFinisher(old => {
                return {
                    ...old,
                    startNumber: event.target.value ?? ""
                }
            })
        }} />
        <TimePicker
            value={dayjs(data.timeTaken?.diff(timeStarted, "millisecond"))}
            ampm={false}
            views={['minutes', 'seconds']}
            format="mm:ss"
            onChange={value => {
                editFinisher(old => {
                    return {
                        ...old,
                        timeTaken: timeStarted?.add(value?.valueOf() || 0, "millisecond") ?? dayjs()
                    }
                })
            }} />
    </Stack>
}