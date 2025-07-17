import dayjs, { Dayjs } from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { IconButton, InputAdornment } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

export default function ResponsiveDatePickers({
  onSelect,
}: {
  onSelect: (value: Dayjs | null) => void;
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          "DatePicker",
          "MobileDatePicker",
          "DesktopDatePicker",
          "StaticDatePicker",
        ]}
      >
        <DemoItem label="seleziona una data per l`evento">
          <MobileDatePicker
            onChange={onSelect}
            defaultValue={dayjs("2022-04-17")}
            slotProps={{
              textField: {
                InputProps: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <CalendarTodayIcon sx={{ color: "#2E8B57" }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              },
            }}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
