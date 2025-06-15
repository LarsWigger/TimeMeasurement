import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Stack } from "@mui/system";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

export type HeaderProps = {
    timeStarted: Dayjs | null;
    setTimeStarted: (date: Dayjs | null) => void;
    addFinisher: () => void;
    exportCsv: () => void;
}

export default function Header({ timeStarted, setTimeStarted, addFinisher, exportCsv }: HeaderProps) {
    const [_, setSecondsPassed] = useState(0)
    const secondsPassed = dayjs().diff(timeStarted, "second") || 0
    return <Stack sx={{
        alignItems: "center",
    }}>
        <TimePicker label="Uhrzeit beim Start"
            value={timeStarted}
            disabled={timeStarted === null}
            onChange={setTimeStarted}
            ampm={false}
            views={['hours', 'minutes', 'seconds']} />
        <p>{`${Math.floor(secondsPassed / 60)}:${('' + secondsPassed % 60).padStart(2, '0')}`}</p>
        <ButtonGroup>
            <Button variant="contained" disabled={timeStarted === null} onClick={addFinisher}>Ankunft</Button>
            <Button variant="contained" onClick={() => {
                setTimeStarted(dayjs())
                setInterval(() => {
                    setSecondsPassed(old => old + 1)
                }, 500)
            }} disabled={timeStarted !== null}>Start</Button>
            <Button variant="contained" disabled={timeStarted === null} onClick={exportCsv}>Export</Button>
        </ButtonGroup>

    </Stack>
}