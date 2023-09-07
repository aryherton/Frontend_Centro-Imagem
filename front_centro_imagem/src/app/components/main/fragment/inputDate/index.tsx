import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import {
  LocalizationProvider,
  DatePicker as MuiDatePicker
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface IDatePickerValue {
  value: string;
  setValue: Function;
}


export default function DatePickerValue({ value, setValue }: IDatePickerValue) {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker", "DatePicker"]}>
        <MuiDatePicker
          label="Selecione uma data"
          value={value}
          onChange={(newValue) => setValue(newValue)}
          format="DD/MM/YYYY"
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
