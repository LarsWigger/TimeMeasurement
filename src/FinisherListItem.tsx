import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/system";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs, { Dayjs } from "dayjs";

export type FinisherListItemProps = {
    timeStarted: Dayjs | null;
    data: FinisherData;
    editFinisher: (update: (old: FinisherData) => FinisherData) => void;
    deleteSelf: () => void
}

export type FinisherData = {
    timeTaken: Dayjs,
    startNumber: String
}

export default function FinisherListItem({ timeStarted, data, editFinisher, deleteSelf }: FinisherListItemProps) {

    return <Card>
        <CardContent>
            <Stack direction={{ xs: 'column', sm: 'row' }}>
                <TextField label="Startnummer" type="number" value={data.startNumber} onChange={event => {
                    editFinisher(old => {
                        return {
                            ...old,
                            startNumber: event.target.value ?? ""
                        }
                    })
                }} />
                <TimePicker
                    value={dayjs(data.timeTaken?.diff(timeStarted, "millisecond")).utc()}
                    ampm={false}
                    views={['hours', 'minutes', 'seconds']}
                    onChange={value => {
                        editFinisher(old => {
                            return {
                                ...old,
                                timeTaken: (timeStarted?.add(value?.valueOf() || 0, "millisecond") ?? dayjs()).utc()
                            }
                        })
                    }} />
            </Stack>
            <CardActions>
                <Button size="small" color="error" onClick={deleteSelf}>Löschen</Button>
            </CardActions>
        </CardContent>
    </Card>
}