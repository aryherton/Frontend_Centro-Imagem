import * as React from 'react';
import Box from '@mui/material/Box';
import DateRangePicker, { DateRange } from '@mui/lab/DateRangePicker';

export default function CustomDateRangeInputs() {
  const [value, setValue] = React.useState<DateRange<Date>>([null, null]);

  return (
      <DateRangePicker
        label="Advanced keyboard"
        value={value}
        onChange={(newValue: any) => setValue(newValue)}
        renderInput={(startProps: any, endProps: any) => (
          <Box sx={{ width: '100px', height: '100px'}}>
            <input
              ref={startProps.inputRef as React.Ref<HTMLInputElement>}
              {...startProps.inputProps}
            />
            <Box sx={{ mx: 1 }}> to </Box>
            <input
              ref={endProps.inputRef as React.Ref<HTMLInputElement>}
              {...endProps.inputProps}
            />
          </Box>
        )}
      />
  );
}